import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import Seo from "../components/Seo";
import getRandomColor from "../container/getRandomColor";

const Home: NextPage = () => {
  const [titleColor, setTitleColor] = useState("#000");
  useInterval(() => {
    setTitleColor(getRandomColor() + "0.8)");
  }, 2000);
  return (
    <div>
      <Seo title="Home" />
      <section>
        <h1 className="title">
          <Image src={"/logo.png"} width={100} height={100} alt={"logo"} />
          Selecolor
        </h1>
        <Link href={{ pathname: "/game", query: { prev: "/" } }} as="game">
          <a className="start">
            <h1>START</h1>
          </a>
        </Link>
      </section>
      <style jsx>{`
        .title {
          margin-top: 10vh;
          font-size: 48px;
          color: #fff;
          width: 7em;
          height: 7em;
          background-color: ${titleColor};
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .start {
          text-decoration: none;
          color: #000;
        }
        .start > h1 {
          border: 3px solid #000;
          border-radius: 12px;
          font-size: 24px;
          padding: 5px;
        }
        .start > h1:hover {
          opacity: 0.7;
          transform: translateY(0.05em);
        }
      `}</style>
    </div>
  );
};

export default Home;
