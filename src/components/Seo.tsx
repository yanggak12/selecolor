import Head from "next/head";

interface Props {
  title: string;
}

const Seo: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title} | Selecolor</title>
        <meta property="og:title" content={"Selecolor | " + title} />
        <meta
          property="og:description"
          content="Select a diffrent color box.\nVery simple game!"
        />
        <meta property="og:image" content="/logo.png" />
      </Head>
    </>
  );
};

export default Seo;
