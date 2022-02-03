import type { NextPage } from "next";
import { useEffect } from "react";
import Seo from "../components/Seo";

const Home: NextPage = () => {
  // useEffect(() => {
  //   fetch()
  // }, []);

  return (
    <div>
      <Seo title="Home" />
      <h1>Hello World</h1>
    </div>
  );
};

export default Home;
