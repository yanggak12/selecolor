import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
}

const Seo: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title} | Selecolor</title>
      </Head>
      <div className="my">
        <Link href={"https://github.com/yanggak12/selecolor"}>
          <a>
            <Image src={"/github.svg"} width={20} height={20} alt={"github"} />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Seo;
