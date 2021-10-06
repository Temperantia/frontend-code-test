import arrowRight from "../../assets/icons/ic-arrow-right-white.svg";

const Button = ({ buttonId, disabled, label, onClick }) => {
  return (
    <button
      id={buttonId}
      disabled={disabled}
      onClick={onClick}
      className={
        "flex items-center justify-between w-full p-2 font-black rounded" +
        (disabled ? " bg-secondary text-text" : " bg-background text-white ")
      }
    >
      <div></div>
      {label}
      <img src={arrowRight} alt={label}></img>
    </button>
  );
};

export default Button;
