import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ThemeProvider } from "styled-components";
import { ThorinGlobalStyles, lightTheme, darkTheme } from "@ensdomains/thorin";
import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { chains, wagmiConfig } from "@/providers";
import { DefaultSeo } from "next-seo";
import { useIsMounted } from "@/hooks/useIsMounted";
import SEO from "../next-seo.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Header } from "@/components/Header";
import Web3Modal from "../components/context/Web3Modal";

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();
  const [theme, setTheme] = useState<string>("light");

  const changeTheme = (newTheme: string) => {
    if (newTheme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Web3Modal>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <ThorinGlobalStyles />
            <ToastContainer />
            <Header theme={theme} setTheme={(t) => changeTheme(t)} />
            <DefaultSeo {...SEO} />
            {isMounted && <Component {...pageProps} />}
          </ThemeProvider>
        </Web3Modal>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
