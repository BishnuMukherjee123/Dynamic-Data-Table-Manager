import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { MUIThemeProvider } from "./MUIThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dynamic Data Table Manager",
  description: "Manage and manipulate data tables dynamically",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <MUIThemeProvider>{children}</MUIThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
