import PageLink from "./PageLink";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="container">
        <PageLink />
        <div>{children}</div>
      </div>
      <style jsx global>{`
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: #fff;
        }
        .center-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
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
    </>
  );
};

export default Layout;
