import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { where } = await request.json();

    const counters = await prisma.counter.findUnique({
      where: where,
    });

    return NextResponse.json({
      success: true,
      message: "API呼び出し成功",
      res: counters,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "API呼び出し失敗",
      res: "エラーが発生しました。再度お試しください。",
    });
  }
}
