import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { where } = await request.json();

    // 件数取得
    const count = await prisma.counter.count({
      where:where
    });

    return NextResponse.json({
      success: true,
      message: "API呼び出し成功",
      count: count,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "API呼び出し失敗",
      res: "エラーが発生しました。再度お試しください。",
    });
  }
}
