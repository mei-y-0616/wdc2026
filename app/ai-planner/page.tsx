"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import "dotenv/config";
import type { counter } from "@/app/generated/prisma/client";


export default function AiPlanner() {
  //トップレベルに書く
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [countersId, setCountersId] = useState<number[]>([]);
  const [countersData, setCountersData] = useState<Array<counter>>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();

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
  //   async function fetchCounters() {
  //     const counters = await counterFindMany({ id: { in: countersId } });
  //     if(counters!==null){
  //       setCountersData(counters);
  //     }
  //   }
  //   fetchCounters();
  }, [countersId]);

  //maps javascript api

  const Markers = (props: { pois: Array<counter> }) => {
    return (
      <>
        {props.pois.map((poi) => {
          if (!poi.latitude || !poi.longitude) return null;
          const location = {
            lat: Number(poi.latitude),
            lng: Number(poi.longitude),
          };
          console.log(location);
          return (
            <AdvancedMarker key={poi.id} position={location}>
              <Pin
                background={"#FBBC04"}
                glyphColor={"#000"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          );
        })}
      </>
    );
  };

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
        <div className={styles.response}>
          <h3>AIからの回答</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
        <ul>
          {countersData.map((counter) => {
            return <li key={counter.id}>{counter.counter_name_ja}</li>;
          })}
        </ul>

        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GCP_API_KEY || ""}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <div className={styles.map}>
            <Map
              defaultZoom={4.2}
              defaultCenter={{ lat: 36, lng: 138 }}
              mapId="aedb8120b0aa062b539f703f"
            >
              <Markers pois={countersData} />
            </Map>
          </div>
        </APIProvider>
      </div>
    </>
  );
}
