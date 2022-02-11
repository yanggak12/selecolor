interface Props {
  color: string;
  isTarget: boolean;
}

const ColorBox: React.FC<Props> = ({ color, isTarget }) => {
  return (
    <div className="container">
      {isTarget && <div>target</div>}
      <style jsx>{`
        .container {
          width: 100px;
          height: 100px;
          background-color: ${color};
          border: 1px solid #000;
        }
      `}</style>
    </div>
  );
};

export default ColorBox;
