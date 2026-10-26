"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import "dotenv/config";
import type { counter } from "@prisma/client";
import CounterMap from "@/components/CounterMap/CounterMap";
import PageTitle from "@/components/PageTitle/PageTitle";
import Image from "next/image";
import TagList from "@/components/counter/TagList/TagList";
import DetailItem from "@/components/counter/DetailItem/DetailItem";
import LinkButton from "@/components/LinkButton/LinkButton";
import Button from "@/components/Button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  MAX_HISTORY,
  loadCurrentId,
  loadHistory,
  saveCurrentId,
  saveHistory,
  toExcerpt,
  type HistoryEntry,
} from "./history";
gsap.registerPlugin(ScrollToPlugin);

export default function ClientAiPlanner() {
  //トップレベルに書く
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>();
  const [countersId, setCountersId] = useState<number[]>([]);
  const [countersData, setCountersData] = useState<Array<counter>>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  // 今画面に表示している回答の履歴ID
  const [currentId, setCurrentId] = useState<string | null>(null);

  // 回答位置へのスクロール要求の回数（新しい回答・履歴選択のときだけ増やす。リロード後の復元では動かさない）
  // responseの変化では判定しない：同じ回答の履歴をもう一度選んでもスクロールさせたいため
  const [scrollRequest, setScrollRequest] = useState(0);

  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    if (scrollRequest > 0 && response) {
      const tween = gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: "#response", offsetY: 100 },
      });
      // アニメーション中にユーザーが自分でスクロールしたら中断する
      // （ScrollToPluginのautoKillは、カウンター表示によるレイアウト変化でスクロール位置が
      //   ずれたときも「ユーザー操作」と誤認して中断してしまうため、実際の操作で判定する）
      const events = ["wheel", "touchstart", "keydown"];
      const cleanup = () =>
        events.forEach((e) => window.removeEventListener(e, stop));
      function stop() {
        tween.kill();
        cleanup();
      }
      events.forEach((e) =>
        window.addEventListener(e, stop, { passive: true }),
      );
      tween.eventCallback("onComplete", cleanup);
      return cleanup;
    }
  }, [scrollRequest]);

  // 履歴の1件を画面に表示する
  function showEntry(entry: HistoryEntry) {
    setPrompt(entry.prompt);
    setResponse(entry.response);
    setCountersData([]);
    // 同じ履歴をもう一度選んでもカウンターを取得し直せるよう、毎回新しい配列にする
    setCountersId([...entry.countersId]);
    setCurrentId(entry.id);
    setErrorMsg(null);
  }

  // 初回表示時：履歴を読み込み、直前まで見ていた回答があれば復元する
  // （localStorageはサーバーに無いので、ハイドレーション後に読む）
  useEffect(() => {
    const saved = loadHistory();
    setHistory(saved);
    const entry = saved.find((e) => e.id === loadCurrentId());
    if (entry) showEntry(entry);
  }, []);

  function handleSelectHistory(entry: HistoryEntry) {
    showEntry(entry);
    setScrollRequest((n) => n + 1);
    saveCurrentId(entry.id);
  }

  function handleClearHistory() {
    if (!window.confirm("回答の履歴をすべて削除しますか？")) return;
    saveHistory([]);
    saveCurrentId(null);
    setHistory([]);
    setCurrentId(null);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (prompt === "") {
      setErrorMsg("旅程を入力してください。");
      return;
    } else {
      setErrorMsg(null);
      setResponse(null);
      setCountersData([]);
      setIsThinking(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ai`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await res.json();
      setScrollRequest((n) => n + 1);
      setResponse(data.res);
      setIsThinking(false);
      if (data.counters) {
        setCountersId(data.counters);
      }

      // 成功した回答だけを履歴に残す（新しい順・最大件数まで）
      if (data.success && typeof data.res === "string") {
        const entry: HistoryEntry = {
          id: String(Date.now()),
          createdAt: Date.now(),
          prompt,
          response: data.res,
          countersId: Array.isArray(data.counters) ? data.counters : [],
        };
        const nextHistory = [entry, ...loadHistory()].slice(0, MAX_HISTORY);
        saveHistory(nextHistory);
        saveCurrentId(entry.id);
        setHistory(nextHistory);
        setCurrentId(entry.id);
      } else {
        saveCurrentId(null);
        setCurrentId(null);
      }
    }
  }

  //counterIdが更新されたら
  useEffect(() => {
    if (countersId.length === 0) {
      setCountersData([]);
      return;
    }
    let ignore = false;
    async function fetchCounter(countersId: number[]) {
      const countersRes = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/prisma/search-counter-data`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ where: { id: { in: countersId } } }),
        },
      );
      const counters = await countersRes.json();
      if (!ignore && counters.res) {
        setCountersData(counters.res);
      }
    }
    fetchCounter(countersId);
    return () => {
      ignore = true;
    };
  }, [countersId]);

  return (
    <>
      <PageTitle titleEn="AI Planner" titleJa="AI手ぶら観光プランナー" />
      <div className="container">
        <section className={isThinking ? styles.isThinking : ""}>
          <div className={styles.intro}>
            <h3> AI手ぶら観光プランナーとは？</h3>
            <p>
              あなたの旅行のスケジュール（いつ、どこに行くか）を入力すると、AIが最適な手ぶら観光カウンターの利用計画を提案してくれます。
            </p>
          </div>
          <span className={styles.formDeco}>Let's!</span>
          <form onSubmit={handleSubmit} className={styles.formArea} id="form">
            <label className={styles.promptLabel} htmlFor="prompt">
              ここにあなたの旅行のスケジュールを入力
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={styles.promptInput}
              placeholder={`○/○ 9時に△△空港に到着\n 観光後、15時に××ホテルにチェックイン\n ...のような感じで自由に記述してください！`}
            ></textarea>
            <button type="submit" className={styles.submitButton}>
              <p className={styles.submitText}>AIプランナーに送信</p>
              <p className={styles.loadingText}>AIが考え中…</p>
              <div className={styles.submitIcon}>
                <Image src="/images/icon_submit_white.svg" fill alt="" />
              </div>
              <div className={styles.loadingIcon}>
                <Image
                  src="/images/anime_truck.gif"
                  width={77}
                  height={43}
                  alt=""
                  unoptimized
                />
              </div>
            </button>
            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
            {isThinking && (
              <p className={styles.loadingNote}>
                返答までに数十秒かかります。少々お待ちください。
              </p>
            )}
          </form>

          {response && (
            <div className={`${styles.response} inner`} id="response">
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
                                explain={<p>{c.x_full_address_ja}</p>}
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

          {history.length > 0 && (
            <div className={`${styles.history}`}>
              <div className={styles.historyHead}>
                <h3 className={styles.historyTitle}>
                  これまでの回答
                  <span className={styles.historyNote}>
                    （最新{MAX_HISTORY}件・このブラウザに保存）
                  </span>
                </h3>
                <Button
                  className={styles.historyClear}
                  onClick={handleClearHistory}
                >
                  履歴をすべて削除
                </Button>
              </div>
              <ul className={styles.historyList}>
                {history.map((entry) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      className={
                        entry.id === currentId
                          ? `${styles.historyItem} ${styles.historyItemActive}`
                          : styles.historyItem
                      }
                      onClick={() => handleSelectHistory(entry)}
                    >
                      <span className={styles.historyMain}>
                        <span className={styles.historyDate}>
                          {new Date(entry.createdAt).toLocaleString("ja-JP", {
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className={styles.historyPrompt}>
                          {entry.prompt}
                        </span>
                      </span>
                      <span className={styles.historyExcerpt}>
                        {toExcerpt(entry.response)}
                      </span>
                      <span className={styles.historyArrow}>
                        <Image
                          src="/images/icon_arrow_black.svg"
                          width={18}
                          height={6}
                          alt=""
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
