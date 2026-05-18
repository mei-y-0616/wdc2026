import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <h1 className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/logo_white.svg"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
                alt="ロゴ"
              ></Image>
            </Link>
          </h1>

          <div className={styles.footerLinks}>
            <ul>
              <li>
                <Link href="about">手ぶら観光とは</Link>
              </li>
              <li>
                <Link href="/guide">手ぶら観光カウンターの利用方法</Link>
              </li>
              <li>
                <Link href="ai-planner">AI手ぶら観光プランナー</Link>
              </li>
              <li>
                <Link href="counters">手ぶら観光カウンターを探す</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href="/contact#faq">よくある質問</Link>
              </li>
              <li>
                <Link href="/contact#contact">お問い合わせ</Link>
              </li>
              <li>
                <Link href="/terms">利用規約</Link>
              </li>
              <li>
                <Link href="/privacy">プライバシーポリシー</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copy}>© 2026 LuggGo!</p>
          <p className={styles.footerBottomNote}>
            当Webサイトは「手ぶら観光カウンター情報オープンデータ」(国土交通省)(https://www.mlit.go.jp/seisakutokatsu/freight/seisakutokatsu_freight_tk1_000141.html)を元に作成しました。
          </p>
        </div>
      </div>
    </footer>
  );
}
