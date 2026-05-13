import PageNav from "@/components/PageNav/PageNav";
import styles from "./page.module.css";
import PageTitle from "@/components/PageTitle/PageTitle";
import Image from "next/image";
import SectTitle from "@/components/SectTitle/SectTitle";
import LinkButton from "@/components/LinkButton/LinkButton";
import type {links} from "@/types/pageLink"
import BeforeFooter from "@/components/BeforeFooter/BeforeFooter";

export const metadata = {
  title: "手ぶら観光について",
};
const links:links = [
  { href: "About", name: "手ぶら観光とは" },
  { href: "Counter", name: "手ぶら観光カウンター" },
  { href: "Merit", name: "利用するメリット" },
  { href: "Manner", name: "荷物マナー" },
];

export default function About() {
  return (
    <>
      <PageTitle
        titleEn="About"
        titleJa={
          <span>
            手ぶら観光<span style={{ color: "var(--font)" }}>について</span>
          </span>
        }
      />
      <div className="container">
        <div className={styles.AboutFlex}>
          <PageNav linkAry={links} />
          <div className={styles.AboutInner}>
            <section id="About">
              <div className={styles.AboutInnerFlex}>
                <div className={styles.SectionText}>
                  <SectTitle
                    titleEn="About"
                    titleJa={
                      <span>
                        <span style={{ color: "var(--main)" }}>手ぶら観光</span>
                        とは
                      </span>
                    }
                  />
                  <p className={styles.SectionP}>
                    「 手ぶら観光
                    」とは、重い荷物を空港や駅、商業施設などに預けたり、ホテルや海外の自宅等へ配送したりして、身軽に旅を楽しむスタイルのことです。
                    国土交通省は手ぶら観光のできる環境づくりを2013年度より進めています。
                    旅行者は手ぶら観光を取り入れることで、重い荷物から解放され、より自由に移動できたり、もっと買い物しやすくなります。
                    さらに、旅行者が手ぶら観光を取り入れ、持ち運ぶ荷物が少なくなることで、観光地や公共交通機関の混雑解消も期待されます。
                  </p>
                </div>
                <div className={styles.AboutInnerImg}>
                  <Image src="/images/img_about.png" fill alt="" />
                </div>
              </div>
            </section>

            <section id="Counter">
              <div className={styles.CounterInnerFlex}>
                <div className={styles.SectionText}>
                  <SectTitle
                    titleEn="Counter"
                    titleJa={
                      <span>
                        <span style={{ color: "var(--main)" }}>
                          手ぶら観光カウンター
                        </span>
                        について
                      </span>
                    }
                  />
                  <p className={styles.CounterInnerP}>
                    「手ぶら観光カウンター」とは、スーツケースやお土産を預けたり、配送できるカウンターです。英語での案内が可能である、補償内容を掲示しているなど、いくつかの基準をクリアし国土交通省の認定を受けています。
                    このロゴは手ぶら観光カウンターとして認定された場所を表す共通ロゴマークです。
                    手ぶら観光カウンターの詳しい利用手順は以下からご覧いただけます。
                  </p>
                  <LinkButton path="/guide" msg="利用方法へ" />
                </div>
                <div className={styles.CounterInnerImgWrapper}>
                  <div className={styles.CounterInnerImg}>
                    <Image src="/images/img_about_mark.png" fill alt="" />
                  </div>
                  <p className={styles.CounterInnerImgNote}>
                    出展：国土交通省ウェブサイト（https://www.mlit.go.jp/seisakutokatsu/freight/seisakutokatsu_freight_tk1_000069.html）
                  </p>
                </div>
              </div>
            </section>

            <section id="Merit">
              <div className={styles.SectionText}>
                <SectTitle
                  titleEn="Merit"
                  titleJa={
                    <span>
                      <span style={{ color: "var(--main)" }}>
                        手ぶら観光カウンター
                      </span>
                      を利用する
                      <span style={{ color: "var(--main)" }}>メリット</span>
                    </span>
                  }
                />
              </div>

              <div className={styles.AboutMeritInner}>
                <div className={styles.AboutCard}>
                  <div className={styles.AboutCardImg}>
                    <Image
                      src="/images/icon_about_merit1.svg"
                      fill
                      decoding="async"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.AboutCardTitle}>空きがない！を回避</h3>
                  <p className={styles.AboutCardP}>
                    ロッカーと違い、荷物をラックや倉庫で保管するので、空きがなく預けられない！といったことが起きづらいです。
                  </p>
                </div>

                <div className={styles.AboutCard}>
                  <div className={styles.AboutCardImg}>
                    <Image
                      src="/images/icon_about_merit2.svg"
                      fill
                      decoding="async"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.AboutCardTitle}>
                    どんな形の荷物でもOK
                  </h3>
                  <p className={styles.AboutCardP}>
                    形状に制限がないことが多いので、スーツケースからスキー板など様々な形状の荷物を預けることができます。（※一部制限あり）
                  </p>
                </div>

                <div className={styles.AboutCard}>
                  <div className={styles.AboutCardImg}>
                    <Image
                      src="/images/icon_about_merit3.svg"
                      fill
                      decoding="async"
                      alt=""
                    />
                  </div>
                  <h3 className={styles.AboutCardTitle}>
                    配送でより旅行を楽しく
                  </h3>
                  <p className={styles.AboutCardP}>
                    荷物配送サービスを使えば、空港で預けてホテルで受け取る、ということが可能になるので、預け先に荷物を取りに行く必要もなくなり、より楽に観光を楽しむことができます。
                  </p>
                </div>
              </div>
            </section>

            <section id="Manner">
              <div className={styles.SectionText}>
                <SectTitle
                  titleEn="Manner"
                  titleJa={
                    <span>
                      <span style={{ color: "var(--main)" }}>
                        日本の公共交通機関
                      </span>
                      での荷物マナー
                    </span>
                  }
                />
              </div>

              <div className={styles.AboutMannerInner}>
                <div className={styles.AboutContents}>
                  <div className={styles.AboutSubTitle}>
                    <div className={styles.AboutSubTitleFlex}>
                      <Image
                        src="/images/icon_crossmark_blue.svg"
                        width={18}
                        height={18}
                        alt=""
                      />
                      <p>避けたいポイント</p>
                    </div>
                  </div>
                  <div className={styles.AboutFlexSub}>
                    <p className={styles.AboutP}>
                      ラッシュの時間帯に大きな荷物を持ち込まない
                    </p>
                  </div>
                  <div className={styles.AboutFlexSub}>
                    <p className={styles.AboutP}>
                      ほかの座席にスーツケースなどの荷物を置かない
                    </p>
                  </div>
                  <div className={styles.AboutFlexSub}>
                    <p className={styles.AboutP}>
                      荷物で通路やドア付近をふさがない
                    </p>
                  </div>
                </div>

                <div className={styles.AboutContents}>
                  <div className={styles.AboutSubTitle}>
                    <div className={styles.AboutSubTitleFlex}>
                      <Image
                        src="/images/icon_check_green.svg"
                        width={18}
                        height={18}
                        alt=""
                      />
                      <p>より快適な旅にするポイント</p>
                    </div>
                  </div>

                  <div className={styles.AboutFlexSub}>
                    <p className={styles.AboutP}>
                      できるだけ手ぶら観光カウンターやロッカーを使用して持ち運ぶ荷物を減らす
                    </p>
                  </div>
                  <div className={styles.AboutFlexSub}>
                    <p className={styles.AboutP}>
                      荷物を持ち込む場合は車両内の荷物置き場や特大荷物スペース付き座席を利用する
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <BeforeFooter/>
    </>
  );
}
