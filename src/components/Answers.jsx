import Answer from "./Answer";

const Answers = ({ value, selected, onSelected }) => {
  return (
    <div className="flex justify-evenly">
      {value.map(({ id, label, score }) => (
        <Answer
          key={id}
          answerId={id}
          value={label}
          selected={selected?.id === id}
          onSelected={onSelected({ id, score })}
        ></Answer>
      ))}
    </div>
  );
};

export default Answers;
