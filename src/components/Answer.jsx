import checkmark from "../assets/icons/ic-checkmark.svg";

const Answer = ({ answerId, value, selected, onSelected }) => {
  return (
    <button
      id={answerId}
      className={
        "relative flex items-center mr-2 px-2 py-2 border font-black rounded-3xl w-1/2 justify-center " +
        (selected ? "bg-primary text-white" : "border-secondary text-primary")
      }
      onClick={onSelected}
    >
      {value}
      {selected && (
        <img
          className="absolute p-2 bg-white rounded-full right-2"
          src={checkmark}
          alt="selected"
        ></img>
      )}
    </button>
  );
};

export default Answer;
