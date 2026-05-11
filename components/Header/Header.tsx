"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <header className={`${styles.header} ${isActive ? styles.isActive : ""}`}>
      <div className="wrapper">
        <div className={styles.headerPc}>
          <h1 className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/logo.svg"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
                alt="ロゴ"
              ></Image>
            </Link>
          </h1>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link href="/">TOP</Link>
              </li>
              <li>
                <Link href="/about">手ぶら観光とは</Link>
              </li>
              <li>
                <Link href="/guide">利用方法</Link>
              </li>
              <li>
                <Link href="/ai-planner">AIプランナー</Link>
              </li>
              <li>
                <Link href="/counters">カウンターを探す</Link>
              </li>
              <li>
                <Link href="/contact" className={styles.navListContact}>
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.headerSp}>
          <h1 className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/logo.svg"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
                alt="ロゴ"
              ></Image>
            </Link>
          </h1>

          <div className={styles.hbButtonWrapper}>
            <button
              className={styles.hbButton}
              onClick={() => {
                setIsActive((isActive) => !isActive);
              }}
            ></button>
          </div>
        </div>

        <nav className={styles.drawerSp}>
          <ul className={styles.drawerListSp}>
            <li>
              <Link
                href="/"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                TOP
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                手ぶら観光とは
              </Link>
            </li>
            <li>
              <Link
                href="/guide"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                利用方法
              </Link>
            </li>
            <li>
              <Link
                href="/ai-planner"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                AIプランナー
              </Link>
            </li>
            <li>
              <Link
                href="/counters"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                カウンターを探す
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => {
                  setIsActive(false);
                }}
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
