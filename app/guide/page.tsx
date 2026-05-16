import styles from "./page.module.css";
import PageNav from "@/components/PageNav/PageNav";
import PageTitle from "@/components/PageTitle/PageTitle";
import SectTitle from "@/components/SectTitle/SectTitle";
import LinkButton from "@/components/LinkButton/LinkButton";
import Image from "next/image";
import type { links } from "@/types/pageLink";
import BeforeFooter from "@/components/BeforeFooter/BeforeFooter";

export const metadata = {
  title: "利用方法",
};

const linkAry: links = [
  {
    href: "HowToUse",
    name: "利用手順",
  },
  {
    href: "Price",
    name: "サービスの種類と参考料金",
  },
];

export default function Guide() {
  return (
    <>
      <PageTitle
        titleEn="How to Use"
        titleJa={
          <span>
            手ぶら観光カウンター
            <span style={{ color: "var(--font)" }}>の利用方法</span>
          </span>
        }
      />
      <div className="container">
        <div className={styles.HowFlex}>
          <PageNav linkAry={linkAry} />

          <div className={styles.HowInner}>
            <section id="HowToUse">
              <SectTitle titleEn="How to Use" titleJa={<span>利用手順</span>} />

              <div className={styles.HowCard}>
                <div className={styles.bag}>
                  <Image src="/images/img_bag.svg" alt="" fill />
                </div>
                <div className={styles.HowLeft}>
                  <div className={styles.HowNumberTitle}>
                    <p className={styles.HowNumberTitleSub}>STEP</p>
                    <p className={styles.HowNumber}>01</p>
                  </div>
                  <Image
                    className={styles.HowIcon}
                    src="/images/icon_how1.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>

                <div className={styles.HowCardDivider}></div>

                <div className={styles.HowRight}>
                  <h3 className={styles.HowCardTitle}>
                    手ぶら観光カウンターを探す
                  </h3>
                  <p className={styles.HowCardP}>
                    営業時間や対応サービスはカウンターごとに異なるので、事前に調べることをおすすめします。
                  </p>

                  <div className={styles.linkButtonWrapper}>
                    <LinkButton
                      path="/counters"
                      msg="手ぶら観光カウンターを探す"
                    />
                  </div>

                  <p className={styles.HowCardP}>
                    また、以下のページではあなたの旅程にぴったりの手ぶら観光カウンターをAIが教えてくれます。
                  </p>

                  <div className={styles.linkButtonWrapper}>
                    <LinkButton
                      path="/ai-planner"
                      msg="AI手ぶら観光プランナーへ"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.HowCard}>
                <div className={styles.HowLeft}>
                  <div className={styles.HowNumberTitle}>
                    <p className={styles.HowNumberTitleSub}>STEP</p>
                    <p className={styles.HowNumber}>02</p>
                  </div>
                  <Image
                    className={styles.HowIcon}
                    src="/images/icon_how2.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>

                <div className={styles.HowCardDivider}></div>

                <div className={styles.HowRight}>
                  <h3 className={styles.HowCardTitle}>
                    カウンターに荷物を持っていき、申し込む
                  </h3>
                  <p className={styles.HowCardP}>
                    カウンターで必要事項を記入して料金を支払い、荷物を引き渡します。
                    手ぶら観光カウンターに認定されているカウンターは全て英語での対応が可能であるため、海外からの観光客の方々でも安心して利用できます。
                  </p>
                  <p className={styles.HowCardNote}>
                    ※事前に申し込みが必要なカウンターもあります。
                  </p>
                </div>
              </div>

              <div className={styles.HowCard}>
                <div className={styles.HowLeft}>
                  <div className={styles.HowNumberTitle}>
                    <p className={styles.HowNumberTitleSub}>STEP</p>
                    <p className={styles.HowNumber}>03</p>
                  </div>
                  <Image
                    className={styles.HowIcon}
                    src="/images/icon_how3.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>

                <div className={styles.HowCardDivider}></div>

                <div className={styles.HowRight}>
                  <h3 className={styles.HowCardTitle}>手ぶらで観光を楽しむ</h3>
                  <p className={styles.HowCardP}>
                    駅の階段や坂道の多い観光地、人気スポットの人混みも、荷物が減るだけでより快適に移動できます。
                    観光地での買い物もより楽しめます。
                    <br />
                    また、大きな荷物を持たずに観光することで観光地の混雑が緩和されるため、観光地側にも貢献できます。
                  </p>
                </div>
              </div>

              <div className={styles.HowCard_last}>
                <div className={styles.HowLeft}>
                  <div className={styles.HowNumberTitle}>
                    <p className={styles.HowNumberTitleSub}>STEP</p>
                    <p className={styles.HowNumber}>04</p>
                  </div>
                  <Image
                    className={styles.HowIcon}
                    src="/images/icon_how4.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>

                <div className={styles.HowCardDivider}></div>

                <div className={styles.HowRight}>
                  <h3 className={styles.HowCardTitle}>
                    カウンターに荷物を持っていき、申し込む
                  </h3>
                  <p className={styles.HowCardP}>
                    手ぶらで観光を楽しんだ後、預け先、または配送先で荷物を受け取ります。
                  </p>
                </div>
              </div>

              <p className={styles.PriceAnnotation}>
                ※上記の利用方法は一例です。カウンターにより詳細が異なる場合がありますので、ご利用前に公式サイト等でご確認ください。{" "}
              </p>
            </section>

            <section id="Price">
              <SectTitle
                titleEn="Service & Price"
                titleJa={<span>サービスの種類と参考料金</span>}
              />

              <div className={styles.PriceGrid}>
                <div className={styles.PriceCard}>
                  <h3 className={styles.PriceCardTitle}>一時預かり</h3>
                  <p className={styles.PriceCardP}>
                    荷物をカウンターに預け、同じ場所で受け取ります。
                  </p>
                  <p className={styles.PriceCardPrice}>
                    <span className={styles.PriceCardNote}>約</span> ¥500〜1,000{" "}
                    <span className={styles.PriceCardNote}>(参考)</span>
                  </p>
                </div>

                <div className={styles.PriceCard}>
                  <h3 className={styles.PriceCardTitle}>当日配送</h3>
                  <p className={styles.PriceCardP}>
                    預けた荷物を当日中にホテルや空港などで受け取ります。
                  </p>
                  <p className={styles.PriceCardPrice}>
                    <span className={styles.PriceCardNote}>約</span>{" "}
                    ¥2,000〜3,000{" "}
                    <span className={styles.PriceCardNote}>(参考)</span>
                  </p>
                </div>

                <div className={styles.PriceCard}>
                  <h3 className={styles.PriceCardTitle}>一般配送</h3>
                  <p className={styles.PriceCardP}>
                    預けた荷物を翌日以降に自宅や次の宿泊先などで受け取ります。
                  </p>
                  <p className={styles.PriceCardPrice}>
                    <span className={styles.PriceCardNote}>約</span>{" "}
                    ¥2,000〜5,000{" "}
                    <span className={styles.PriceCardNote}>(参考)</span>
                  </p>
                </div>

                <div className={styles.PriceCard}>
                  <h3 className={styles.PriceCardTitle}>海外配送</h3>
                  <p className={styles.PriceCardP}>
                    預けた荷物を海外の自宅へ直接送ります。
                  </p>
                  <p className={styles.PriceCardPrice}>
                    <span className={styles.PriceCardNote}>約</span>{" "}
                    ¥1,400〜40,000{" "}
                    <span className={styles.PriceCardNote}>(参考)</span>
                  </p>
                </div>
              </div>

              <p className={styles.PriceAnnotation}>
                ※上記の料金は目安です。利用カウンターや荷物の大きさ、配送距離などによって変動します。
              </p>
            </section>
          </div>
        </div>
      </div>
      <BeforeFooter />
    </>
  );
}
