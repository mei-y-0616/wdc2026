import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
    template:"%s | AIのAPIアプリ",
    default:"AIのAPIアプリ",
  },
  description: "AIのAPIを呼び出すアプリです。",
};

export default function RootLayout({ children }:{children:any}) {
  return (
    <html lang="ja">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={zenKakuGothicNew.className}>
        <Header></Header>
        <main className="main">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}