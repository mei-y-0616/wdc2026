"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import "dotenv/config";
import type { counter } from "@/app/generated/prisma/client";
import CounterMap from "@/components/CounterMap/CounterMap";


export default function AiPlanner() {
  //トップレベルに書く
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string|null>();
  const [countersId, setCountersId] = useState<number[]>([]);
  const [countersData, setCountersData] = useState<Array<counter>>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    setResponse(null);
    setCountersData([])

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await res.json();
    setResponse(data.res); //文章の回答
    if (data.counters) {
      setCountersId(data.counters);
    }
  }

  //counterIdが更新されたら
  useEffect(() => {
    if (countersId.length === 0) return;
    async function fetchCounter(countersId: number[]) {
      const countersRes = await fetch("/api/prisma/search-counter-data", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ where: { id: { in: countersId } } }),
      });
      const counters = await countersRes.json();
      if (counters.res) {
        setCountersData(counters.res);
      }
    }
    fetchCounter(countersId);
  }, [countersId]);


  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            name="prompt"
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.promptInput}
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            AIに質問する
          </button>
        </form>
        {response&&<div className={styles.response}>
          <h3>AIからの回答</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>}
        {countersData.length>0&&<ul>
          {countersData.map((counter) => {
            return <li key={counter.id}>{counter.counter_name_ja}</li>;
          })}
        </ul>}

          {countersData.length>0&&<CounterMap counters={countersData}></CounterMap>}
      </div>
    </>
  );
}
