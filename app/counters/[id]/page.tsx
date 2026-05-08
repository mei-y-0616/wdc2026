
import { notFound } from "next/navigation";
import CounterClient from "./CounterClient";

type Prop = {
 params:{ id: string };
};

export default async function Counter({ params }: Prop) {

  const {id} = await  params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/prisma/find-unique`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ where: { id: Number(id) } }),
    },
  );
  const data = await res.json();
  const counter = data.res;
  if (counter === null) {
    notFound();
  }else{
    return <CounterClient id={id} counter={counter}/>
  }
}
