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


  return (
    <div>
      <div>
        <TextareaInput onChange={section1TextHandler}>{section1Text}</TextareaInput>
        <ImageUpload selectedImage={section1selectedImage} setSelectedImage={setSection1SelectedImage} />
      </div>
      <div>
        <TextareaInput onChange={section2TextHandler}>{section2Text}</TextareaInput>
      </div>
      <div>
        <TextareaInput onChange={section3TextHandler}>{section3Text}</TextareaInput>
        <MultipleChoiceCreator choices={section3MultipleChoice} setChoices={setSection3MultipleChoice} />
      </div>
      <button>+</button>
    </div>
  )
}
