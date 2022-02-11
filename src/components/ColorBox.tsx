interface Props {
  color: string;
  isTarget: boolean;
  onClickHandler: () => void;
}

const ColorBox: React.FC<Props> = ({ color, isTarget, onClickHandler }) => {
  return (
    <>
      <div>
        <button className="btn" onClick={onClickHandler}></button>
      </div>
      <style jsx>{`
        .btn {
          width: 100px;
          height: 100px;
          margin: 10px;
          background-color: ${isTarget ? color : "#900"};
          align-items: center;
          border-radius: 24px;
        }
      `}</style>
    </>
  );
};

export default ColorBox;
