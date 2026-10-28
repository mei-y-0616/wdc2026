import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

export const metadata = {
  title: {
    template: "%s | LuggGo!",
    default: "LuggGo!",
  },
  description:
    "日本の「手ぶら観光」と「手ぶら観光カウンター」について掲載しています。カウンター検索機能の他、AIがあなたの旅程にぴったりの手ぶら観光カウンターをご提案する「AI手ぶら観光プランナー」を搭載。",

  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/images/thumbnail.png`,
        width: 1200,
        height: 630,
      },
    ],
    url: `${process.env.NEXT_PUBLIC_URL}`,
    type: "website",
    siteName: "LuggGo!",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    images: [`${process.env.NEXT_PUBLIC_URL}/images/thumbnail.png`],
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ja">
      {/* next/font/google だと日本語フォントの全スライスをビルド時に取得してタイムアウトするため、ブラウザ側で読み込む */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap"
        />
      </head>
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
