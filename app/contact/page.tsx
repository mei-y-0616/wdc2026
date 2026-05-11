"use client";
import PageTitle from "@/components/PageTitle/PageTitle";
import styles from "./page.module.css";
import SectTitle from "@/components/SectTitle/SectTitle";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import IsSubmit from "./IsSubmit"

type FormValues = {
  name: string;
  kana: string;
  mail: string;
  content: string;
};

function FormItem({
  nameJa,
  nameEn,
  placeholder,
  type,
  register,
  errors,
}: {
  nameJa: string;
  nameEn: "name" | "kana" | "mail" | "content";
  placeholder: string;
  type: string;
  register: any;
  errors: any;
}) {
  return (
    <div className={styles.formItem}>
      <div className={styles.formItemHead}>
        <label htmlFor={nameEn}>{nameJa}</label>
        <span className={styles.formItemTag}>必須</span>
      </div>

      <div className={styles.formItemBody}>
        <input
          type={type}
          // name={nameEn}
          placeholder={placeholder}
          id={nameEn}
          {...register(nameEn, { required: nameJa + "は必須です。" })}
        />
        {errors[nameEn] && (
          <p className={styles.formErrorMsg} style={{ color: "red" }}>
            {errors[nameEn].message}
          </p>
        )}
      </div>
    </div>
  );
}

function Form({
  setIsSubmit,
}: {
  setIsSubmit: (isSubmit: boolean) => void;
}) {
  const {
    register, // input とフォームロジックを紐づける
    handleSubmit, // 送信時に呼ぶ
    formState: { errors }, // バリデーション結果など
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // バリデーション OK のときだけ呼ばれる
    window.scrollTo(0, 0)
    setIsSubmit(true)
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        nameJa="お名前"
        nameEn="name"
        placeholder="山田　太郎"
        type="text"
        register={register}
        errors={errors}
      />
      <FormItem
        nameJa="フリガナ"
        nameEn="kana"
        placeholder="ヤマダ　タロウ"
        type="text"
        register={register}
        errors={errors}
      />
      <FormItem
        nameJa="メールアドレス"
        nameEn="mail"
        placeholder="yamada@example.com"
        type="email"
        register={register}
        errors={errors}
      />
      <div className={`${styles.formItem} ${styles.formItemTextarea}`}>
        <div className={styles.formItemHead}>
          <label htmlFor="content">お問い合わせ内容</label>
          <span className={styles.formItemTag}>必須</span>
        </div>

        <div className={styles.formTextareaBlock}>
          <div className={styles.formItemBody}>
            <textarea
              placeholder="ここにお問い合わせ内容をお書きください。"
              id="content"
              {...register("content", {
                required: "お問い合わせ内容は必須です。",
              })}
            ></textarea>
            {errors.content && (
              <p className={styles.formErrorMsg}>{errors.content.message}</p>
            )}
          </div>

          <div className={styles.formNote}>
            <p>
              お問い合わせの前に <strong>よくある質問</strong>{" "}
              もご確認ください。
            </p>
            <br />

            <p>【お問合せされる際の注意点】</p>
            <ul>
              <li>
                お問い合わせには、原則として以下の受付時間内に対応させていただきます。
                <br />
                （サポート営業時間：平日9時～17時 土日祝日）
              </li>
              <li>
                お問い合わせの混雑状況や内容により回答まで3営業日ほどお時間をいただく場合がございます。
                <br />
                あらかじめご了承ください。
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button className={styles.formBtn}>
        <p>送信する</p>
        <div className={styles.formBtnIcon}>
          <Image src="/images/icon_form_white.svg" alt="" fill />
        </div>
      </button>
    </form>
  );
}

function FAQ({ q, a }: { q: string; a: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={isOpen ? `${styles.faq} ${styles.isOpen}` : styles.faq}>
      <div
        className={styles.faqHead}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <dt>{q}</dt>
        <div className={styles.faqHeadIcon}>
          <Image src="images/icon_accArrow_green.svg" fill alt="" />
        </div>
      </div>
      <dd>
        <div>{a}</div>
      </dd>
    </div>
  );
}

export default function Contact() {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  if (isSubmit) {
    return<IsSubmit/>
  }
  return (
    <>
      <PageTitle titleEn="Contact" titleJa="お問い合わせ" />
      <div className="container">
        <section id="faq">
          <SectTitle titleEn="Q ＆ A" titleJa={<span>よくある質問</span>} />
          <dl className={styles.faqList}>
            <FAQ
              q="預けることができない荷物はありますか？"
              a={
                <>
                  <p>
                    はい、以下の物品は預けたり配送することができないのでご注意ください。
                  </p>
                  <ul>
                    <li>貴重品</li>
                    <li>壊れやすい物</li>
                    <li>生鮮食品、液体類</li>
                    <li>危険物、有害物質</li>
                  </ul>
                  <p>
                    その他、スーツケースやクール品などの対応状況は各カウンターにより異なります。
                  </p>
                </>
              }
            />
            <FAQ
              q="どのような支払い方法がありますか？"
              a={
                <>
                  <p>
                    各カウンターにより異なります。現金のみの場所もあれば、クレジットカード、電子マネー、QRコード決済をご利用できる場所もあります。詳細については、各カウンターの公式ページをご確認いただくか、各カウンターに直接お問い合わせください。
                  </p>
                </>
              }
            />
            <FAQ
              q="事前の予約は必要ですか？"
              a={
                <>
                  <p>
                    多くのカウンターは予約なしで当日そのままご利用いただけます。ただし、一部のカウンターや団体でのご利用などは事前予約が必要な場合もございます。事前に各カウンターのWebサイトをご確認いただくことをおすすめします。
                  </p>
                </>
              }
            />
            <FAQ
              q="他の信頼できる公式の情報源はありますか？"
              a={
                <>
                  <p>
                    以下の国の機関の公式サイトにて、手ぶら観光や手ぶら観光カウンターの情報をご覧いただけます。
                  </p>
                  <ul>
                    <li>
                      <Link
                        href="https://www.mlit.go.jp/seisakutokatsu/freight/seisakutokatsu_freight_tk1_000141.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        国土交通省
                      </Link>
                      ：全国の手ぶら観光カウンターがリスト形式（CSV/PDF）で掲載されています。
                    </li>

                    <li>
                      <Link
                        href="https://www.japan.travel/en/plan/getting-around/luggage-storage/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        日本政府観光局 (JNTO)
                      </Link>
                      ：訪日外国人向けに、多言語で手ぶら観光カウンターの利用方法について掲載されています。
                    </li>
                  </ul>
                </>
              }
            />
          </dl>
        </section>

        <section id="contact">
          <SectTitle
            titleEn="Contact"
            titleJa={<span>お問い合わせフォーム</span>}
          />
          <p className={styles.sectExplain}>
            本ページ、サービスについてのご意見・ご感想・ご質問は以下のフォームで受け付けております。
            <br />
            お気軽にお問い合わせください。
          </p>
          <Form setIsSubmit={setIsSubmit} />
        </section>
      </div>
    </>
  );
}
