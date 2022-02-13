import { useRouter } from "next/router";
import ImgButton from "./ImgButton";
import Modal from "./Modal";

interface Props {
  title: string;
  score: number;
  isVisible: boolean;
  time: number;
  setVisible: (arg: boolean) => void;
  newGameHandler: () => void;
}

const AlertModal: React.FC<Props> = ({
  title,
  score,
  newGameHandler,
  time,
}) => {
  const router = useRouter();
  return (
    <Modal isVisible={time === 0}>
      <div className="modalBody">
        <header>
          <h1>{title}</h1>
        </header>
        <section>
          <h3>Score : {score.toLocaleString()}</h3>
          <div className="buttonContainer">
            <ImgButton
              img="/retry.svg"
              text="Retry"
              onClickHandler={newGameHandler}
            />
            <ImgButton
              img="/exit.svg"
              text="Exit"
              onClickHandler={() => router.replace("/")}
            />
          </div>
        </section>
      </div>

      <style jsx>{`
        .buttonContainer {
          display: flex;
          flex-direction: column;
          width: 80%;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;
        }
        .modalBody {
          width: 90%;
          max-width: 300px;
          padding: 0 0 20px 0px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 1rem;
          overflow: hidden;
          animation: modal-show 0.3s;
        }
      `}</style>
    </Modal>
  );
};

export default AlertModal;
