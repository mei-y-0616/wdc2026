import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    template:"%s | LuggGo!",
    default:"LuggGo!",
  },
  description: "日本の「手ぶら観光」と「手ぶら観光カウンター」について掲載しています。カウンター検索機能の他、AIがあなたの旅程にぴったりの手ぶら観光カウンターをご提案する「AI手ぶら観光プランナー」を搭載。",
};

export default function RootLayout({ children }:{children:any}) {
  return (
    <html lang="ja">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={zenKakuGothicNew.className}>
        <Header></Header>
        <main>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}