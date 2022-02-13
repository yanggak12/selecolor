const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="container">
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
        .my {
          position: fixed;
          top: 30px;
          right: 30px;
        }
        .center-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </>
  );
};

export default Layout;
