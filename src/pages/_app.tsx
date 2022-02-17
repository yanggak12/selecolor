import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/firebaseConfig";

function MyApp({ Component, pageProps }: AppProps) {
  initializeApp(firebaseConfig);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
