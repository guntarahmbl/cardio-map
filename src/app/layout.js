import { Inter } from "next/font/google";
import "./globals.css";
import { DeviceSelection } from "./components/device-selection";
const inter = Inter({
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: "variable",
});

export const metadata = {
  title: "Cardio Disease Map",
  description: "",
  icons: {
    icon: "..//favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <DeviceSelection>
            {children}
        </DeviceSelection>
      </body>
    </html>
    
  );
}
