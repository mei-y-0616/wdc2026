"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import "dotenv/config";
import type { counter } from "@/app/generated/prisma/client";
import CounterMap from "@/components/CounterMap/CounterMap";
import PageTitle from "@/components/PageTitle/PageTitle";
import Image from "next/image";
import TagList from "@/components/counter/TagList/TagList";
import DetailItem from "@/components/counter/DetailItem/DetailItem";
import LinkButton from "@/components/LinkButton/LinkButton";


export default function ClientAiPlanner() {

  //トップレベルに書く
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>();
  const [countersId, setCountersId] = useState<number[]>([]);
  const [countersData, setCountersData] = useState<Array<counter>>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    setResponse(null);
    setCountersData([]);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await res.json();
    setResponse(data.res);
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
          Accept: "application/json",
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

  // useEffect(() => {
  //   const form = document.querySelector("#form");
  //   const rect = form?.getBoundingClientRect();
  //   if (rect) {
  //     window.moveTo(0, rect.top + rect.height);
  //   }
  // }, [prompt]);

  return (
    <>
      <PageTitle titleEn="AI Planner" titleJa="AI手ぶら観光プランナー" />
      <div className="container">
        <section>
          <form onSubmit={handleSubmit} className={styles.formArea} id="form">
            <label className={styles.promptLabel} htmlFor="prompt">
              ここにあなたの旅程を入力
            </label>
            <textarea
              id="prompt"
              name="prompt"
              onChange={(e) => setPrompt(e.target.value)}
              className={styles.promptInput}
              placeholder="例）○/○の9時に△△空港に到着して、その後□□通りを観光したあと、15時に××ホテルにチェックインします。"
            ></textarea>
            <button type="submit" className={styles.submitButton}>
              AIプランナーに送信
              <div className={styles.submitIcon}>
                <Image src="/images/icon_submit_white.svg" fill alt="" />
              </div>
            </button>
          </form>

          {response && (
            <div className={`${styles.response} inner`}>
              <h3 className={styles.responseTitle}>
                <div className={styles.responseTitleIcon}>
                  <Image src="/images/icon_checkbox_green.svg" fill alt="" />
                </div>
                AIからの回答
              </h3>
              <div className={styles.responseTextAndCounters}>
                <div className={styles.responseText}>
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
                {countersData.length > 0 && (
                  <div className={styles.counterListArea}>
                    <h4 className={styles.counterListAreaTitle}>
                      カウンター提案
                    </h4>
                    <ul className={styles.counterList}>
                      {countersData.map((c, i) => {
                        return (
                          <li key={i}>
                            <div className={styles.counterHead}>
                              <h4 className={styles.counterName}>
                                {c.counter_name_ja}
                              </h4>
                              <div className={styles.counterTagList}>
                                <TagList counter={c} />
                              </div>
                            </div>
                            <div className={styles.counterBottom}>
                              <DetailItem
                                imageSrc="/images/icon_map_gray.svg"
                                explain={
                                  <p>
                                    {c.x_full_address_ja}
                                  </p>
                                }
                              />
                              <LinkButton
                                path={`/counters/${c.id}`}
                                msg="カウンターの詳細へ"
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {countersData.length > 0 && (
                <div className={styles.counterMap}>
                  <CounterMap counters={countersData} link={true} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
