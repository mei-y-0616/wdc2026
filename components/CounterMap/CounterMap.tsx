"use client";
import styles from "./CounterMap.module.css";
import Link from "next/link";
import { useState, useCallback, memo } from "react";
import type { counter } from "@prisma/client";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import LinkButton from "../LinkButton/LinkButton";

const CounterMap = memo(function CounterMap({
  counters,
  link=true,
  centerLat,
  centerLon
}: {
  counters: Array<counter>;
  link:boolean;
  centerLat?:number
  centerLon?:number
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
                  headerContent={<p className={styles.counterName}>{poi.counter_name_ja}</p>}
                  onClose={handleClose}
                >
                  {link&&<LinkButton path={`/counters/${poi.id}`} msg="カウンターの詳細へ"/>}
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
            lat: centerLat??36,
            lng: centerLon??138,
          }}
          mapId="aedb8120b0aa062b539f703f"
          mapTypeControl={false}
        >
          <Markers pois={counters} />
        </Map>
      </div>
    </APIProvider>
  );
});

export default CounterMap;
