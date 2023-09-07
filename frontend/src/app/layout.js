import { Providers } from "./providers";
import "./styles/global.css";

export const metadata = {
  title: "King Kat",
  description: "Portfolio project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
