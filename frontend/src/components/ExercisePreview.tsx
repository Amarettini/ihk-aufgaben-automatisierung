import React from "react";

export type ImageQuestioning = {
  type: "image_question";
  imagePath: string;

};

export type TextQuestioning = {
  type: "text_question";
  question: string;
};

export type Choice = {
  correct: boolean;
  text: string;
}

export type MultipleChoiceAnwser = {
  type: "multiple_choice_anwser";
  choices: Choice[];
};

export type TextAnwser = {
  type: "text_anwser";
  anwser: string
};

export type ExerciseData = {
  section1: ImageQuestioning | TextQuestioning;
  section2: TextQuestioning;
  section3: TextAnwser | MultipleChoiceAnwser;
};

type ExerciseProps = {
  exercise: ExerciseData;
};

function createTextQuestion({ question }: TextQuestioning) {
  return <p>{question}</p>;
}

function createImageQuestion({ imagePath }: ImageQuestioning) {
  return <img src={imagePath} />;
}

function createTextAnwserEl({ anwser }: TextAnwser) {
  return <p>{anwser}</p>
}

function createMultipleChoiceAnwser({ choices }: MultipleChoiceAnwser) {
  return <fieldset>
    <legend>name</legend>
    <div>
      {choices.map((choice, i) => <label>
        <input type="radio" name="section3" id={i.toString()} checked={choice.correct} />
        {choice.text}
      </label>)}
    </div>
  </fieldset>
}

export const ExercisePreview: React.FC<ExerciseProps> = ({ exercise }) => {
  const section1El = (exercise.section1.type === "image_question") ?
    createImageQuestion(exercise.section1) :
    createTextQuestion(exercise.section1);

  const section2El = createTextQuestion(exercise.section2);

  const section3El = (exercise.section3.type === "text_anwser") ?
    createTextAnwserEl(exercise.section3) :
    createMultipleChoiceAnwser(exercise.section3);

  return <div>
    {section1El}
    {section2El}
    {section3El}
  </div>
}
