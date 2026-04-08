import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Link href="/">手ぶら観光</Link>
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
              <Link href="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
