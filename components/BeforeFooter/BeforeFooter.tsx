import styles from "./BeforeFooter.module.css";
import Link from "next/link";
import Image from "next/image";

export default function BeforeFooter() {
  return (
    <>
      <div className={styles.beforeFooter}>
        <div className={styles.surfing}>
          <Image src="/images/img_surfing.png" sizes="300px 189px" fill alt="" />
        </div>
        <div className={styles.wave}></div>
        <div className={styles.main}>
          <div className="container">
            <div className={styles.titleArea}>
              <span className={styles.titleDeco}>Let's</span>
              <h2 className={styles.title}>
                <span>手ぶら観光</span>をはじめよう！
              </h2>
            </div>
            <div className={styles.linkArea}>
              <div className={styles.bigLink}>
                <h3>AI手ぶら観光プランナー</h3>
                <div className={styles.bigLinkFlex}>
                  <p>
                    さっそくAI手ぶら観光プランナーを使って、最適な手ぶら観光カウンターを探してみましょう。
                  </p>
                  <Link href="/ai-planner" className={styles.link}>
                    →
                  </Link>
                </div>
              </div>
              <div className={styles.smallLink}>
                <span className={styles.smallLinkDeco}>もしくは</span>
                <div className={styles.smallLinkFlex}>
                  <h3>手ぶら観光カウンターを探す</h3>
                  <Link href="/counters" className={styles.link}>
                    →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
