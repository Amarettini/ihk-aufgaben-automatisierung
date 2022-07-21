import React from "react";
import { AnwserInput } from "./AnwserInput";

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
  return <h2>{question}</h2>;
}

function createImageQuestion({ imagePath }: ImageQuestioning) {
  // return <div className="text-center">
  // return <img src={imagePath} className="img-fluid rounded" />
  // return <div className="text-center">
  // style={{ objectFit: 'contain', width: "100%" }}
  return <div className="d-flex justify-content-center">
    <div className="container-xl text-center">
      <img src={imagePath} className="rounded img-fluid" alt="..." />
    </div>
  </div>
  // </div>;
}

function createTextAnwserEl({ anwser }: TextAnwser) {
  return <AnwserInput >{anwser}</AnwserInput>
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

  return <article className="col-6 ">
    <div className="container border rounded shadow pt-4">
      <div className="row border rounded-top py-3">
        {section1El}
      </div>
      <div className="row border border-top-0 py-3">
        {section2El}
      </div>
      <div className="row border border-top-0 rounded-bottom p-4 mb-4 bg-light">
        {section3El}
      </div>
    </div></article>
}
