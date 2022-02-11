const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="container">
        <div>{children}</div>
      </div>
      <style jsx global>{`
        body {
          background-color: aquamarine;
        }
      `}</style>
    </>
  );
};

export default Layout;
