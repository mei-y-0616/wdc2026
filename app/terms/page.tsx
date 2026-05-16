import PageTitle from "@/components/PageTitle/PageTitle";
import styles from "./page.module.css";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <PageTitle titleEn="Terms of Service" titleJa="利用規約" />
      <section>
        <div className={`${styles.terms}`}>
          <div>
            <p>
              この利用規約（以下、「本規約」といいます。）は、LuggGo!開発チーム（以下、「運営者」といいます。）が提供する「LuggGo!」（以下、「本サービス」といいます。）の利用条件を定めるものです。
            </p>
            <p>
              本サービスを利用するユーザーは、本規約に同意したものとみなします。
            </p>
          </div>

          <div>
            <h3>第1条（適用）</h3>
            <p>本規約は、本サービスの利用に関する一切の関係に適用されます。</p>
          </div>

          <div>
            <h3>
              第2条（サービス内容）
            </h3>
            <p>
              本サービスは、日本国内の手ぶら観光カウンター情報の提供、およびAIによる利用計画提案機能を提供します。
            </p>
            <p>
              掲載情報の一部には、政府が公開するオープンデータを利用しています。
            </p>
          </div>

          <div>
            <h3>第3条（禁止事項）</h3>
            <p>
              ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
            </p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>不正アクセスまたはこれを試みる行為</li>
              <li>他のユーザーまたは第三者に不利益・損害を与える行為</li>
              <li>虚偽の情報を入力する行為</li>
              <li>AI機能を不正利用する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </div>

          <div>
            <h3>第4条（免責事項）</h3>
            <ul>
              <li>
                本サービスに掲載される情報について、可能な限り正確な情報を掲載するよう努めますが、その正確性・完全性・最新性を保証するものではありません。
              </li>
              <li>
                AIによる提案内容は参考情報であり、その内容の正確性・有用性を保証するものではありません。
              </li>
              <li>
                本サービスの利用によって生じた損害について、運営者は一切の責任を負いません。
              </li>
              <li>
                本サービスは予告なく内容の変更または停止を行う場合があります。
              </li>
            </ul>
          </div>

            <div>
                <h3>第5条（知的財産権）</h3>
                <p>本サービス内の文章・画像・デザイン・プログラム等に関する権利は、運営者または正当な権利者に帰属します。</p>
            </div>

            <div>
                <h3>第6条（外部サービス）</h3>
                <p>本サービスでは、以下の外部サービスを利用する場合があります。</p>
                <ul>
                    <li>Gemini API</li>
                    <li>Google Maps Platform（Maps JavaScript API）</li>
                    <li>Resend</li>
                    <li>Railway</li>
                </ul>
                <p>これら外部サービスの利用においては、各提供事業者の規約およびポリシーが適用されます。</p>
            </div>

            <div>
                <h3>第7条（規約の変更）</h3>
                <p>運営者は、必要と判断した場合、本規約を変更できるものとします。</p>
                <p>変更後の規約は、本サービス上に掲載した時点で効力を生じます。</p>
            </div>

            <div>
                <h3>第8条（お問い合わせ）</h3>
                <p>本サービスに関するお問い合わせは、以下よりお願いいたします。</p>
                <div>
                    <span>お問い合わせフォーム：</span>
                    <Link href="https://lugggo.up.railway.app/contact">https://lugggo.up.railway.app/contact</Link>
                </div>
            </div>

        </div>
      </section>
    </>
  );
}
