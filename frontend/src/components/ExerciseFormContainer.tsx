import { useState } from "react";
import { Choice, ExerciseData } from "./ExercisePreview";
import { ImageUpload } from "./ImageUpload";
import { MultipleChoiceCreator } from "./MultipleChoiceCreator";
import { TextareaInput } from "./TextareaInput";

type ExerciseFormContainerProps = {
  onAdd: (exercise: ExerciseData) => void;
}

export const ExerciseFormContainer: React.FC<ExerciseFormContainerProps> = ({ onAdd }) => {
  const [section1Text, setSection1Text] = useState("");
  const [section1selectedImage, setSection1SelectedImage] = useState<File | null>(null);

  const [section2Text, setSection2Text] = useState("");

  const [section3Text, setSection3Text] = useState("");
  const [section3MultipleChoice, setSection3MultipleChoice] = useState<Choice[]>([
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false }
  ]);

  const section1TextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setSection1Text(event.target.value);
  };

  const section2TextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setSection2Text(event.target.value);
  }

  const section3TextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setSection3Text(event.target.value);
  }

  const buildExercise = (): ExerciseData | null => {

    let section1: ExerciseData["section1"];
    if (!!section1selectedImage) {
      section1 = { type: "image_question", imagePath: section1selectedImage.name };
    } else if (!!section1Text) {
      section1 = { type: "text_question", question: section1Text };
    } else {
      console.log("Missing data in section 1");
      return null;
    }

    let section3: ExerciseData["section3"];
    if (!!section3Text) {
      section3 = { type: "text_anwser", anwser: section3Text };
    } else if (!!section3MultipleChoice) {
      section3 = { type: "multiple_choice_anwser", choices: section3MultipleChoice };
    } else {
      console.log("Missing data in section 3");
      return null;
    }

    return {
      section1,
      section2: { type: "text_question", question: section2Text, },
      section3
    };
  }

  const submitHandler = () => {
    const data = buildExercise();
    if (!data) {
      console.error("Failed to submit exercise data!");
      return;
    }
    onAdd(data);
  }

  return (
    <div>
      <div>
        <TextareaInput onChange={section1TextHandler} label={"Text"}>{section1Text}</TextareaInput>
        <ImageUpload selectedImage={section1selectedImage} setSelectedImage={setSection1SelectedImage} label={"Bild"} />
      </div>
      <div>
        <TextareaInput onChange={section2TextHandler} label={"Aufgabentext"}>{section2Text}</TextareaInput>
      </div>
      <div>
        <TextareaInput onChange={section3TextHandler} label={"Freitext Antwort"}>{section3Text}</TextareaInput>
        <MultipleChoiceCreator choices={section3MultipleChoice} setChoices={setSection3MultipleChoice} />
      </div>
      <button onClick={submitHandler}>+</button>
      <h4>Debug exercise object:</h4>
      <pre><code>
        {JSON.stringify(buildExercise(), undefined, 2)}
      </code></pre>
    </div>
  )
}
