"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BreadCrumb.module.css";

const pathAltName: Record<string, string> = {
  about: "手ぶら観光について",
  guide: "利用方法",
  counters: "カウンターを探す",
  contact: "お問い合わせ",
  "ai-planner": "AIプランナー",
  "terms":"利用規約",
  "privacy":"プライバシーポリシー",
};

export default function BreadCrumb({ pageName }: { pageName?: string }) {
  const pathname = usePathname();
  // pathを「/」で分解
  const paths = pathname.substring(1).split("/");

  // リンク先アドレスの取得
  const roots = [""];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);

  return (
    <div className={styles.breadCrumb}>
      <ul className={styles.breadCrumbList}>
        <li>
          <Link href="/">TOP</Link>
        </li>

        {paths.map((child, index) => (
          <li key={index}>
            <Link
              href={roots[index + 1]}
              className={
                index === paths.length - 1 ? `${styles.currentPage}` : ""
              }
            >
              { pathAltName[child]??pageName ?? child}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
