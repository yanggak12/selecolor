import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import Seo from "../components/Seo";

const Home: NextPage = () => {
  return (
    <div>
      <Seo title="Home" />
      <Link href={{ pathname: "/game", query: { prev: "/" } }} as="game">
        <a>
          <h1>Game</h1>
        </a>
      </Link>
      <h1>Hello World</h1>
    </div>
  );
};

export default Home;
