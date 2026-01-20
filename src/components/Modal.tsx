interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  zIndex?: number;
}

const Modal: React.FC<Props> = ({ isVisible, children, zIndex = 1000 }) => {
  return (
    <div className={isVisible ? "open modal" : "modal"}>
      {children}
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: ${zIndex};
        }
        .open {
          display: flex;
          align-items: center;
          animation: modal-bg-show 0.3s;
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

export default Modal;
