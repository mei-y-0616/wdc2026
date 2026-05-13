"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import BeforeFooter from "@/components/BeforeFooter/BeforeFooter";

export default function Home() {
  return (
    <>
      <div className="container" style={{paddingBottom:"300px"}}>
        <p>TOPページです。</p>
      </div>
      <BeforeFooter/>
    </>
  );
}
