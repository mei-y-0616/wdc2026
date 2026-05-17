"use client";
import styles from "./PageNav.module.css";
import Link from "next/link";
import type { links } from "@/types/pageLink";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

export default function PageNav({ linkAry }: { linkAry: links }) {
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });

  const handleClick = contextSafe((e: any) => {
    e.preventDefault();
    if (!e.currentTarget) {
      return;
    }
    const target = e.currentTarget as HTMLElement;
    const name = target.getAttribute("href")??"";
    gsap.to(window, {
      duration: 0.6,
      ease: "power2.out",
      scrollTo: {
        y: name,
      },
    });
  });

  return (
    <nav className={styles.PageNav} ref={container}>
      <div className={styles.PageNavEN}>
        <div className={styles.flower}>
          <Image src="/images/img_flower.svg" alt="" fill sizes="16px" />
        </div>
        navigation
      </div>
      <ul>
        {linkAry.map((child, i) => {
          return (
            <li key={i}>
              <Link
                href={`#${child.href}`}
                className="pageNavLink"
                onClick={handleClick}
              >
                {child.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
