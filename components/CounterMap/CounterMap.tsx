"use client";
import styles from "./CounterMap.module.css";
import Link from "next/link";
import { useState, useCallback, memo } from "react";
import type { counter } from "@/app/generated/prisma/client";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const CounterMap = memo(function CounterMap({
  counters,
}: {
  counters: Array<counter>;
}) {
  const Markers = (props: { pois: Array<counter> }) => {
    return (
      <>
        {props.pois.map((poi) => {
          if (!poi.latitude || !poi.longitude) return null;
          const location = {
            lat: Number(poi.latitude),
            lng: Number(poi.longitude),
          };

          const [markerRef, marker] = useAdvancedMarkerRef();
          const [infoWindowShown, setInfoWindowShown] = useState(false);
          const handleMarkerClick = useCallback(
            () => setInfoWindowShown((isShown) => !isShown),
            [],
          );
          const handleClose = useCallback(() => setInfoWindowShown(false), []);

          return (
            <AdvancedMarker
              ref={markerRef}
              onClick={handleMarkerClick}
              key={poi.id}
              position={location}
            >
              <Pin
                background={"#ff4c34ff"}
                glyphColor={"#000"}
                borderColor={"#000"}
              />

              {infoWindowShown && (
                <InfoWindow
                  anchor={marker}
                  position={location}
                  headerContent={<p>{poi.counter_name_ja}</p>}
                  onClose={handleClose}
                >
                  <Link href={`/counters/${poi.id}`}>詳しく見る</Link>
                </InfoWindow>
              )}
            </AdvancedMarker>
          );
        })}
      </>
    );
  };

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GCP_API_KEY || ""}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div className={styles.map}>
        <Map
          defaultZoom={4.5}
          // defaultCenter={{ lat: counter.latitude, lng: counter.longitude }}
          defaultCenter={{
            lat: 36,
            lng: 138,
          }}
          mapId="aedb8120b0aa062b539f703f"
        >
          <Markers pois={counters} />
        </Map>
      </div>
    </APIProvider>
  );
});

export default CounterMap;
