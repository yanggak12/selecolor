import { useRouter } from "next/router";
import React, { HTMLInputTypeAttribute, useState } from "react";
import getRank from "../container/getRank";
import storeRank from "../container/storeRank";
import ImgButton from "./ImgButton";
import Modal from "./Modal";

interface Props {
  isVisible: boolean;
  setVisible: (arg: boolean) => void;
  score: number;
}

const RankModal: React.FC<Props> = ({ isVisible, score, setVisible }) => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  return (
    <Modal isVisible={isVisible}>
      <div className="modalBody">
        <header>
          <h2>Store Rank</h2>
        </header>
        <section>
          <div>Input your nickname.</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              maxLength={10}
              placeholder="Nickname"
              value={nickname}
              onChange={handleNickName}
            />
            <ImgButton
              text="Rank"
              img="/medal.svg"
              onClickHandler={() => {
                if (nickname) {
                  storeRank({ score, nickname });
                  router.replace("/rank");
                } else {
                  alert("Please Input your nickname.");
                }
              }}
            />
            <ImgButton
              text="Close"
              img="/exit.svg"
              onClickHandler={() => {
                setNickname("");
                setVisible(false);
              }}
            />
          </form>
        </section>
      </div>
      <style jsx>{`
        .modalBody {
          width: 90%;
          max-width: 350px;
          padding: 0 0 20px 0px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 1rem;
          overflow: hidden;
          animation: modal-show 0.3s;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        form input {
          padding: 10px;
          margin: 10px;
          font-size: 18px;
        }
      `}</style>
    </Modal>
  );
};

export default RankModal;
