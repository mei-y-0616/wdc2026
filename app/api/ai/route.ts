import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import fs from "fs";
import path from "path";
import { z } from "zod";

  console.log(process.env.GEMINI_API_KEY)

//データベースのスキーマを取得
const pnt = /model counter \{([^*]+)\}/;
let schema = fs.readFileSync(
  path.join(process.cwd(), "prisma/schema.prisma"),
  "utf-8",
);
const execSchema = pnt.exec(schema);

//responseSchema用
const aiResSchema = z.object({
  answer: z
    .string()
    .describe("ユーザーへの回答。Markdown形式で書いてください。"),
  counters: z
    .array(z.number())
    .describe(
      "ユーザーへの回答に関連するカウンターのカウンターIDの配列（関連しないカウンターは含まない）",
    ),
});

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    //1.ユーザーの質問に適したSQL文をAIに考えてもらう
    if (!execSchema) {
      throw new Error("データベースのスキーマが取得できませんでした。");
    }

    const { prompt } = await request.json();
    const aiSqlRes = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: [
          "あなたはSQLエンジニアです。後に示す日本の手ぶら観光カウンター一覧のデータベースを扱っています。ユーザーの質問に関連するカウンターを取得するために、適切なSQL文の一部分を生成してください。",
          "出力はSQL文の「SELECT * FROM counter」以降だけを考えてください。また、解説はいりません。",
          `データベースはsqlite。prismaを使用しています。テーブル名はcounterです。スキーマは以下の通りです。
            ${execSchema[1]}
            `,
          "カラム名は英数字の方ではなく、絶対に@map内で使用されている日本語のカラム名を使用してください。",
          "廃止フラグ(is_closed)は0のレコードしか残していません。そのため廃止フラグについてwhere句で処理をする必要はありません。",
          "都道府県を検索するときは「カウンター住所_都道府県コード」のカラムで日本の都道府県コードの数字を使って検索してください。",
        ],
      },
    });

    //2.AIが考えてくれたSQL文を元にデータベースを検索
    console.log(aiSqlRes.text);
    const dbResult = await prisma.$queryRaw(
      Prisma.raw(`SELECT * FROM counter ${aiSqlRes.text}`),
    );

    //3.検索結果とユーザーの質問をAIに渡して、最終的な回答をAIに出してもらう
    console.log(dbResult);
    let aiRes;
    if (!Array.isArray(dbResult) || dbResult.length === 0) {
      return NextResponse.json({
        success: false,
        message: "AIのAPI呼び出し成功（検索結果0件）",
        res: "あなたにぴったりの手ぶら観光カウンターが見つかりませんでした。質問を変えて再度検索してみてください。",
      });
    } else {
      aiRes = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: [
            `あなたは日本の手ぶら観光カウンターについて詳しい人です。手ぶら観光カウンター一覧のデータベースから、ユーザーの質問に関連しそうな手ぶら観光カウンターを既にいくつかピックアップしてあります。ピックアップしたデータは以下に示します。このデータを元に、このユーザーの質問に答えてください。
          
          JSONデータ（文字に変換済み）:
          ${JSON.stringify(dbResult)}
          `,
          ],
          responseMimeType: "application/json",
          responseJsonSchema: z.toJSONSchema(aiResSchema),
        },
      });
    }

    if (aiRes.text) {
      const parsedAiRes = aiResSchema.parse(JSON.parse(aiRes.text));

      return NextResponse.json({
        success: true,
        message: "AIのAPI呼び出し成功",
        res: parsedAiRes.answer,
        counters: parsedAiRes.counters,
      });
    }
  } catch (e) {
    console.log("エラー" + e);
    return NextResponse.json({
      success:false,
      message: "AIのAPI呼び出し失敗",
      res: "エラーが発生しました。再度お試しください。：" + e,
    });
  }
}
