import PageTitle from "@/components/PageTitle/PageTitle";
import styles from "./page.module.css";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <PageTitle titleEn="Privacy" titleJa="プライバシーポリシー" />
      <section>
        <div className={styles.privacy}>
          <div>
            <p>
              LuggGo!開発チーム（以下、「運営者」といいます。）は、「LuggGo!」（以下、「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>
          </div>

          <div>
            <h3>1. 取得する情報</h3>
            <h4>AI機能利用時</h4>
            <ul>
              <li>ユーザーが入力した旅行日程・条件等の情報</li>
            </ul>
            <h4>お問い合わせ時</h4>
            <ul>
              <li>お名前</li>
              <li>フリガナ</li>
              <li>メールアドレス</li>
              <li>お問い合わせ内容</li>
            </ul>
          </div>

          <div>
            <h3>2. 利用目的</h3>
            <p>取得した情報は、以下の目的で利用します。</p>
            <ul>
              <li>本サービスの提供</li>
              <li>AI機能による提案生成</li>
              <li>お問い合わせへの対応</li>
              <li>サービス改善</li>
              <li>不正利用防止</li>
            </ul>
          </div>

          <div>
            <h3>3. 外部サービスの利用</h3>
            <p>本サービスでは、以下の外部サービスを利用しています。</p>
            <ul>
              <li>Gemini API</li>
              <li>Google Maps Platform（Maps JavaScript API）</li>
              <li>Resend</li>
              <li>Railway</li>
              <p>
                ユーザー情報の一部が、各サービス提供事業者に送信される場合があります。
              </p>
            </ul>
          </div>

          <div>
            <h3>4. 個人情報の第三者提供</h3>
            <p>
              運営者は、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者へ提供しません。
            </p>
          </div>

          <div>
            <h3>5. 安全管理</h3>
            <p>
              運営者は、個人情報の漏えい・滅失・改ざん等を防止するため、適切な管理を行います。
            </p>
          </div>

          <div>
            <h3>6. 未成年の利用</h3>
            <p>
              18歳未満の方はGemini
              APIの利用規約により、「AI手ぶら観光プランナー」の機能はご利用いただけません。
            </p>
          </div>

          <div>
            <h3>7. プライバシーポリシーの変更</h3>
            <p>本ポリシーは、必要に応じて変更することがあります。</p>
            <p>変更後の内容は、本サービス上に掲載した時点で効力を生じます。</p>
          </div>

          <div>
            <h3>8. お問い合わせ</h3>
            <p>本ポリシーに関するお問い合わせは、以下よりお願いいたします。</p>
            <div>
              <span>お問い合わせフォーム：<Link href="https://lugggo.up.railway.app/contact">https://lugggo.up.railway.app/contact</Link></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
