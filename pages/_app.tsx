import { Navbar } from "../components";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { UserContextProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </div>
  );
}

export default MyApp;
