import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import counterSchema from "@/data/counterSchema";
import { shorteningCounterData } from "@/utils/counter/counterDbFuns";



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

    const { prompt } = await request.json();
    const aiSqlRes = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: [
          "あなたはSQLエンジニアです。後に示す日本の手ぶら観光カウンター一覧のデータベースを扱っています。プロンプトでユーザーの旅程を送るのでその旅程内で利用できそうなカウンターを取得するために、適切なSQL文の一部分を生成してください。",
          "出力はSQL文の「SELECT * FROM counter」以降だけを考えてください。また、解説はいりません。",
          `データベースはsqlite。prismaを使用しています。テーブル名はcounterです。スキーマは以下の通りです。
            ${counterSchema}
            `,
          "カウンターの住所を絞るときは、「カウンター住所_都道府県コード」で絞ってください。取得したデータを元に後から再度処理するので、今回は広めに検索してください。",
          "廃止フラグ(is_closed)は0のレコードしか残していません。そのため廃止フラグについてwhere句で処理をする必要はありません。",
        ],
      },
    });

    //2.AIが考えてくれたSQL文を元にデータベースを検索
    // console.log(aiSqlRes.text);
    const dbResult = await prisma.$queryRaw(
      Prisma.raw(`SELECT カウンターID FROM counter ${aiSqlRes.text}`),
    );

    //3.検索結果とユーザーの質問をAIに渡して、最終的な回答をAIに出してもらう
    // console.log(Array.isArray(dbResult) ? dbResult.length : "0件");

    let aiRes;
    if (!Array.isArray(dbResult) || dbResult.length === 0) {
      return NextResponse.json({
        success: false,
        message: "AIのAPI呼び出し成功（検索結果0件）",
        res: "あなたにぴったりの手ぶら観光カウンターが見つかりませんでした。質問を変えて再度検索してみてください。",
      });
    } else {
      const idArray: Array<number> = [];
      dbResult.forEach((ele) => {
        idArray.push(ele["カウンターID"]);
      });
      const shortData = await shorteningCounterData(idArray);
      if(shortData===null){
        throw Error
      }
      const JSONdata = JSON.stringify(shortData);
      // console.log(shortData)
      aiRes = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: [
            `あなたは日本の手ぶら観光カウンターについて詳しい人です。手ぶら観光カウンター一覧のデータベースから、ユーザーの旅程に関連しそうな手ぶら観光カウンターを既にいくつかピックアップしてあります。以下のデータを元に、このユーザーの旅程に合った手ぶら観光カウンターの利用スケジュールを考えてください。
          
          JSONデータ（文字に変換済み）:
          ${JSONdata}
          `,
            `適切なスケジュールを組めるときは文中でスケジュールを書いてください。スケジュールは大体
          (日時)：(カウンター名)で(サービスの種類 一時預かり/当日配送/一般配送/海外配送)
          ↓
          (日時)：(カウンター名)で受け取り
          ...以下続く
          のように書いてください。多少変えてもいいです。
          `,
            "適切なスケジュールが組めないときは、利用できそうなカウンターにはこれらがあったということだけ示してください。無理にスケジュールを立てる必要はありません。",
            "カウンターを示すときはカウンター名だけでいいです。ID、住所などは指定されない限りその他の情報はanswerに書かないでください。",
            "詳細は…などは書かなくていいです。"
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
    // console.log("エラー" + e);
    return NextResponse.json({
      success: false,
      message: "AIのAPI呼び出し失敗",
      res: "エラーが発生しました。再度お試しください。：" + e,
    });
  }
}
