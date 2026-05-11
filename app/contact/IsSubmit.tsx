import PageTitle from "@/components/PageTitle/PageTitle";
import styles from "./IsSubmit.module.css";
import Image from "next/image";
import LinkButton from "@/components/LinkButton/LinkButton";

export default function IsSubmit() {
  return (
    <>
      <PageTitle titleEn="Contact" titleJa="お問い合わせ" />;
      <div className="container">
        <section className={styles.submit}>
          <div className={styles.head}>
            <div className={styles.headIcon}>
              <Image src="/images/icon_check_green.svg" fill alt="" />
            </div>
            <h3>お問い合わせ完了</h3>
          </div>
          <div className={styles.body}>
            <div className={styles.explain}>
              <p>
                <strong>
                  この度はお問い合わせありがとうございます。
                  <br />
                  担当者よりご連絡させていただきます。
                </strong>
              </p>
              <br />
              <p>
                お問い合わせには、原則として以下の受付時間内に対応させていただきます。
              </p>
              <p>（サポート営業時間：平日9時～17時 土日祝日）</p>
              <br />
              <p>
                お問い合わせの混雑状況や内容により回答まで3営業日ほどお時間をいただく場合がございます。
                <br />
                あらかじめご了承ください。
              </p>
            </div>
            <div className={styles.btnWrapper}>
              <LinkButton path="/" msg="TOPに戻る" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
