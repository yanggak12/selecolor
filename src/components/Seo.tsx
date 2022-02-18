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
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/46489446/154629430-eb2a85b1-d54c-4ecb-923d-d8934523ddc3.png"
        />
        <meta
          name="google-site-verification"
          content="Bd5ZNg7If_uzggm0neoD-rgWovmO6rGC_j9qYSFjKd4"
        />
      </Head>
    </>
  );
};

export default Seo;
