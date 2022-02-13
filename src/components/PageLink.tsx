import Image from "next/image";
import Link from "next/link";

const PageLink: React.VFC = ({}) => {
  return (
    <div className="my">
      <Link href={"https://github.com/yanggak12/selecolor"}>
        <a>
          <Image src={"/github.svg"} width={20} height={20} alt={"github"} />
        </a>
      </Link>
      <style jsx>{`
        .my {
          position: fixed;
          top: 30px;
          right: 30px;
        }
      `}</style>
    </div>
  );
};

export default PageLink;
