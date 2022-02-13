import Image from "next/image";
import { useRouter } from "next/router";

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
    <div className={time === 0 ? "open modal" : "modal"}>
      <div className="modalBody">
        <header>
          <h1>{title}</h1>
        </header>
        <section>
          <h3>Score : {score.toLocaleString()}</h3>
          <div className="buttonContainer">
            <button onClick={newGameHandler}>
              <Image src={"/retry.svg"} width={20} height={20} alt="retry" />
              <b>Retry</b>
            </button>
            <button
              onClick={() => {
                router.replace("/");
              }}
            >
              <Image src={"/exit.svg"} width={20} height={20} alt="retry" />
              <b>Exit</b>
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .buttonContainer {
          display: flex;
          flex-direction: column;
          width: 80%;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;
        }
        .modal button {
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
        .open {
          display: flex;
          align-items: center;
          animation: modal-bg-show 0.3s;
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
        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -20px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }
        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AlertModal;
