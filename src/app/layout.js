import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "SAYA",
  description: "Saya is a creative agency specializing in web design, branding, and digital marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link href="https://api.fontshare.com/v2/css?f[]=rosaline@400&display=swap" rel="stylesheet"></link>
        <link href="https://api.fontshare.com/v2/css?f[]=bebas-neue@400&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={poppins.variable}
      >
        {children}   
      </body>
    </html>
  );
}
