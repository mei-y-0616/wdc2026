import FormValues from "@/types/formValues";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data: FormValues = await request.json();

    const text = `LuggGo!からのお問い合わせです。\n\nお名前：${data.name}\nフリガナ：${data.kana}\nメールアドレス：${data.mail}\n\n-----お問い合わせ内容-----\n${data.content}`;

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lugggo.wdc@gmail.com",
      subject: `【LuggGoからのお問い合わせ】 ${data.name}(${data.kana}) 様`,
      text: text,
    });

    return NextResponse.json({
      success: true,
      message: "API呼び出し成功",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "API呼び出し失敗",
    });
  }
}
