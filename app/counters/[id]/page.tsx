import { notFound } from "next/navigation";
import CounterClient from "./CounterClient";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: Prop) {
  const { id } = await params;
  const numberId = Number(id);
  if (!isNaN(numberId)) {
    const counter = await getCounter(Number(id));
    if (counter === null) {
      return {
        title: "お探しのページは見つかりませんでした。",
      };
    } else {
      return {
        title: counter.counter_name_ja ?? "カウンター詳細",
      };
    }
  } else {
    return {
      title: "お探しのページは見つかりませんでした。",
    };
  }
}

type Prop = {
  params: { id: string };
};

const getCounter = cache(async (id: number) => {
  try {
    const counter = await prisma.counter.findUnique({
      where: { id: id },
    });
    return counter;
  } catch {
    return null;
  }
});

export default async function Counter({ params }: Prop) {
  const { id } = await params;
  const numberId = Number(id);
  if (!isNaN(numberId)) {
    const counter = await getCounter(Number(id));
    if (counter === null) {
      notFound();
    } else {
      return <CounterClient id={id} counter={counter} />;
    }
  } else {
    notFound();
  }
}
