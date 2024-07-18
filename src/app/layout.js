import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "센싱 모듈",
  description: "센싱 모듈에 대한 그래프 및 디바이스 등록을 해줍니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center w-full min-h-screen p-4">
          <header className="w-full py-4 text-center border-b">
            <h1 className="text-xl font-bold">실내 모니터링</h1>
          </header>
          {children}
        </div></body>
    </html>
  );
}
<<<<<<< HEAD

=======
>>>>>>> main
