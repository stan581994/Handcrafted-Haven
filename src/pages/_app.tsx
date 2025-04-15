import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/modal.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

// Bootstrap JS is required for some components like dropdowns, modals, etc.
const useBootstrap = () => {
  useEffect(() => {
    // Import Bootstrap JS only on client side
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useBootstrap();

  return (
    <SessionProvider session={session}>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
