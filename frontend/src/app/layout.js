import { Providers } from "./providers";
import { sora } from "./fonts";
import "@/app/styles/global.css";

export const metadata = {
  title: "King Kat",
  description: "Portfolio project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sora.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
