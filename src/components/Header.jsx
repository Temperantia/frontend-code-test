import arrowLeft from "../assets/icons/ic-arrow-left-green.svg";

const Header = ({ onPreviousQuestion }) => {
  return (
    <div
      className={
        "flex w-full font-bold text-text " +
        (onPreviousQuestion ? "justify-between" : "justify-center")
      }
    >
      {onPreviousQuestion && (
        <img
          id="previous"
          className="cursor-pointer"
          onClick={onPreviousQuestion}
          src={arrowLeft}
          alt="previous"
        />
      )}
      Heartburn Checker
      <div></div>
    </div>
  );
};

export default Header;
