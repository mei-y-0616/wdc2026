# [LuggGo!](https://lugggo.up.railway.app/)
LuggGo!は日本の手ぶら観光、及び手ぶら観光カウンターに関する情報サイトです。

## はじめに
本WebサイトはNext.jsで開発しました。
以下のURLから、実際にデプロイした本サイトをご覧いただけます。是非ご覧ください。
[https://lugggo.up.railway.app/](https://lugggo.up.railway.app/)

また、以下のURLから、「AI手ぶら観光プランナー」のデモンストレーション動画をご覧いただけます。（YouTube限定公開）
[https://youtu.be/Q_sWUrRBPXQ](https://youtu.be/Q_sWUrRBPXQ)

提出したソースコードは以下のフォルダを除外しています。
- node_modules/
- .next/

また、.envファイルのAPIキーも消去した状態で提出しています。

## AI活用箇所
- Gemini API（有料プラン）...「AI手ぶら観光プランナー」が呼び出すAPIとして活用。
- ChatGPT（無料枠）... 「利用規約」、「プライバシーポリシー」ページの内容の制作支援として活用。

## 外部サービス
本Webサイトの開発にあたって、以下の外部サービスを使用しています。
- Gemini API... 「AI手ぶら観光プランナー」に組み込むAIとして。
- Google Maps Platform (Maps JavaScript API)... Googleマップの埋め込みに使用。
- Resend... お問い合わせフォームに入力された内容をメールで送信させるために使用。
- Railway... 本サイトのデプロイに使用。

## その他 アピールポイントなど
- 本サイトはPWAに対応しています。
- 「お問い合わせ」ページのお問い合わせフォームは送信すると、実際に開発チームのメールアドレスに届きます。試しにお問い合わせしていただいても構いません。