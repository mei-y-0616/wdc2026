"use client";
import styles from "./Loading.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

export default function Loading() {
  const ref = useRef(null);
  useGSAP(() => {
    function handleLoad() {
      gsap.to(ref.current, {
        y: "-100%",
        autoAlpha: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
    if (document.readyState === "complete") {
      // すでにloadが終わっていたら即実行
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div ref={ref} className={styles.loading}>
      <Image
        className={styles.logo}
        src="/images/Mainvisuallogo.svg"
        alt=""
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
