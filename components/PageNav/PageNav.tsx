import styles from "./PageNav.module.css";
import Link from "next/link";
import type { links } from "@/types/pageLink";

export default function PageNav({ linkAry }: { linkAry: links }) {
  return (
    <nav className={styles.PageNav}>
      <p className={styles.PageNavEN}>navigation</p>
      <ul>
        {linkAry.map((child,i) => {
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
