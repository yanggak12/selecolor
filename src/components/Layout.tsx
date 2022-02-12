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
          background-color: aquamarine;
        }
      `}</style>
    </>
  );
};

export default Layout;
