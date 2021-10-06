import { useCallback, useMemo, useState } from "react";

import Header from "./Header";
import Question from "./Question";
import Answers from "./Answers";
import Button from "./core/Button";
import Form from "../data/form.json";

// Extract questions to an object
const questions = Object.entries(Form.questions).reduce(
  (m, [index, { id, ...rest }]) => {
    m[id] = { index, ...rest };
    return m;
  },
  {}
);

// Extract outcomes to an object
const outcomes = Form.outcomes.reduce((m, { id, ...rest }) => {
  m[id] = { ...rest };
  return m;
}, {});

const Questionnaire = () => {
  const [history, setHistory] = useState(["is_heartburn_known"]);
  const [selected, setSelected] = useState(null);
  const [patientAnswers, setPatientAnswers] = useState([]);
  const { question_text, answers, next } = useMemo(
    () => questions[history[history.length - 1]],
    [history]
  );
  const [outcome, setOutcome] = useState(null);

  const onPreviousQuestion = useCallback(() => {
    const lastAnswer = patientAnswers[patientAnswers.length - 1];

    // use history to get the previous answer
    setSelected(lastAnswer);
    setPatientAnswers(
      patientAnswers.filter((item) => item.id !== lastAnswer.id)
    );
    setHistory(history.filter((item) => item !== history[history.length - 1]));
    setOutcome(null);
  }, [history, patientAnswers]);

  const nextQuestion = useCallback(
    (question) => {
      // save answers as it goes
      setPatientAnswers([...patientAnswers, selected]);
      setHistory([...history, question]);
      setSelected(null);
    },
    [history, patientAnswers, selected]
  );

  const onNext = useCallback(() => {
    // prepare score in case it is needed
    const score = patientAnswers.reduce(
      (sum, { score }) => sum + (score ?? 0),
      0
    );
    for (const option of next) {
      if (
        option.next_question &&
        (!option.answered || option.answered === selected.id)
      ) {
        nextQuestion(option.next_question);
        return;
      } else if (
        option.outcome &&
        (!option.max_score || option?.max_score > score)
      ) {
        setOutcome(option.outcome);
        return;
      }
    }
  }, [next, nextQuestion, patientAnswers, selected]);

  const onReset = useCallback(() => {
    setPatientAnswers([]);
    setHistory(["is_heartburn_known"]);
    setSelected(null);
    setOutcome(null);
  }, [setPatientAnswers, setHistory, setSelected]);

  const onSelected = useCallback(
    (answer) => () => {
      setSelected(answer);
    },
    [setSelected]
  );

  return (
    <div className="flex flex-col items-center justify-between w-1/2 p-4 bg-white rounded-lg h-3/4">
      <Header
        onPreviousQuestion={history.length > 1 ? onPreviousQuestion : undefined}
      ></Header>
      {outcome ? (
        <>
          <div>
            <h4 className="text-2xl font-black">
              Thank you for answering the questions!
            </h4>
            <p>{outcomes[outcome].text}</p>
            {outcome.show_booking_button && (
              <Button label="Book a meeting"></Button>
            )}
          </div>
          <div
            className="underline cursor-pointer text-primary"
            onClick={onReset}
          >
            Back to the start screen
          </div>
        </>
      ) : (
        <>
          <div>
            <Question value={question_text}></Question>
            <Answers
              value={answers}
              selected={selected}
              onSelected={onSelected}
            ></Answers>
          </div>
          <Button
            buttonId="next"
            disabled={!selected}
            label="Next"
            onClick={onNext}
          ></Button>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
