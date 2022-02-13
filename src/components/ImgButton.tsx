import Image from "next/image";

interface Props {
  text: string;
  onClickHandler: () => void;
  img: string;
}

const ImgButton: React.FC<Props> = ({ text, onClickHandler, img }) => {
  return (
    <button onClick={onClickHandler}>
      <Image src={img} width={20} height={20} alt="retry" />
      <b>{text}</b>
      <style jsx>{`
        button {
          outline: none;
          cursor: pointer;
          border: 0;
          font-size: 16px;
          width: 50%;
          border-radius: 16px;
          margin: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button b {
          margin-left: 10px;
        }
        button:hover {
          background-color: darkgray;
        }
      `}</style>
    </button>
  );
};

export default ImgButton;
