import styles from "./PageNav.module.css";
import Link from "next/link";
import type { links } from "@/types/pageLink";
import Image from "next/image";

export default function PageNav({ linkAry }: { linkAry: links }) {
  return (
    <nav className={styles.PageNav}>
      <div className={styles.PageNavEN}>
        <div className={styles.flower}>
          <Image src="/images/img_flower.svg" alt="" fill />
        </div>
        navigation
      </div>
      <ul>
        {linkAry.map((child, i) => {
          return (
            <li key={i}>
              <Link href={`#${child.href}`}>{child.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
