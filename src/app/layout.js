import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: "variable",
});

export const metadata = {
  title: "Cardio Disease Map",
  description: "",
  icons: {
    icon: "..//favicon.ico", // Path to your favicon in the public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
