import React from "react";
import Modal from "./Modal";
import ImgButton from "./ImgButton";

interface Props {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const ResultModal: React.FC<Props> = ({ isVisible, title, message, onClose }) => {
  return (
    <Modal isVisible={isVisible} zIndex={10000}>
      <div className="resultModal">
        <header>
          <h2>{title}</h2>
        </header>
        <section>
          <div className="message">{message}</div>
          <ImgButton
            text="OK"
            img="/medal.svg"
            onClickHandler={onClose}
          />
        </section>
      </div>
      <style jsx>{`
        .resultModal {
          width: 90%;
          max-width: 350px;
          padding: 0 0 20px 0px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 1rem;
          overflow: hidden;
          animation: modal-show 0.3s;
          position: relative;
          z-index: 1;
        }

        header {
          background-color: #f5f5f5;
          padding: 15px;
          border-bottom: 2px solid #e0e0e0;
        }

        header h2 {
          margin: 0;
          font-size: 22px;
          text-align: center;
        }

        section {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .message {
          font-size: 16px;
          line-height: 1.6;
          text-align: center;
          white-space: pre-line;
          color: #333;
        }

        @keyframes modal-show {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Modal>
  );
};

export default ResultModal;
