"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import type { counter } from "@/app/generated/prisma/client";

type Prop = {
  params: { id: number };
};

export default function Counter({ params }: Prop) {
  const [counter, setCounter] = useState<counter | null>();
  const [errorMsg, setErrorMsg] = useState<any>();
  const [id, setId] = useState<number>();
  useEffect(() => {
    async function fetchCounter() {
      const { id } = await params;
      setId(id);

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
      if (data.success && data.res !== null) {
        setErrorMsg(null);
        setCounter(data.res);
      } else if (data.res === null) {
        setErrorMsg("このカウンターは存在しません。");
      } else {
        setErrorMsg("エラーが発生しました。再度お試しください。");
      }
    }
    fetchCounter();
  }, []);
  // const counter=await counterFindUnique({id:Number(id)});

  if (errorMsg) {
    return (
      <div className="container">
        <p>{errorMsg}</p>
      </div>
    );
  } else {
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
                  background={"#ff4c34ff"}
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
          カウンターの詳細ページです
          <br />
          params：{id}
          {counter && (
            <>
              <p>カウンター名：{counter.counter_name_ja}</p>
              <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GCP_API_KEY || ""}
                onLoad={() => console.log("Maps API has loaded.")}
              >
                <div className={styles.map}>
                  <Map
                    defaultZoom={10}
                    // defaultCenter={{ lat: counter.latitude, lng: counter.longitude }}
                    center={{
                      lat: counter.latitude ?? 36,
                      lng: counter.longitude ?? 138,
                    }}
                    mapId="aedb8120b0aa062b539f703f"
                  >
                    <Markers pois={[counter]} />
                    
                  </Map>
                </div>
              </APIProvider>
            </>
          )}
        </div>
      </>
    );
  }
}
