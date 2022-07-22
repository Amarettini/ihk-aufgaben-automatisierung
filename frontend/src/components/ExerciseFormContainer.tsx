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

  const [username, setUsername] = useState("");

  const section1TextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setSection1Text(event.target.value);
  };

  const section2TextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setSection2Text(event.target.value);
  }

  const section3TextHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setSection3Text(event.target.value);
  }

  async function toDataUrl(url: string, outputFormat: string): Promise<string> {
    const dataUrl = new Promise<string>((resolve) => {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = (function(this: HTMLImageElement) {
        // todo maybe we need to remove the element again?
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d')!;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        resolve(canvas.toDataURL(outputFormat));
      }).bind(img);
      img.src = url;
    });
    return dataUrl;
  }

  const buildExercise = async (): Promise<ExerciseData | null> => {

    let section1: ExerciseData["section1"];
    if (!!section1selectedImage) {
      const tempImageUrl = URL.createObjectURL(section1selectedImage);
      section1 = { type: "image_question", imagePath: await toDataUrl(tempImageUrl, "image/png") };

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
      section3,
      userReference: username
    };
  }

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  }

  const submitHandler = async () => {
    const data = await buildExercise();
    if (!data) {
      console.error("Failed to submit exercise data!");
      return;
    }
    console.log(data);
    onAdd(data);
  }

  return (
    <div className="container bg-light border border border-2 rounded mb-4 p-3">
      <div className="row">
        <h3 className="h2 mb-5">Aufgabe hinzufügen</h3>
      </div>

      <div className="row">
        <div className="col mb-3">
          <h4>Wähle ein Bild aus ...</h4>
          <ImageUpload selectedImage={section1selectedImage} setSelectedImage={setSection1SelectedImage} label={"Bild"} blocked={!!section1Text} />
        </div>

        <div className="col">
          <h4>... oder erläuter die Aufgabe</h4>
          <TextareaInput onChange={section1TextHandler} label={"Text"} blocked={!!section1selectedImage}>{section1Text}</TextareaInput>
        </div>
      </div>

      <hr className="row" />
      <div className="mb-4">
        <h4>Aufgabentext</h4>
        <TextareaInput onChange={section2TextHandler} label={"Aufgabentext"}>{section2Text}</TextareaInput>
      </div>
      <hr className="row" />

      <div className="row mb-4">
        <div className="col">
          <h4>Gib eine Musterlösung an...</h4>
          <TextareaInput onChange={section3TextHandler} label={"Freitext Antwort"} blocked={!!(section3MultipleChoice[0].text)}>{section3Text}</TextareaInput>
        </div>

        <div className="col">
          <h4>... oder erstelle Mehrfachauswahl Aufgabe</h4>
          <MultipleChoiceCreator choices={section3MultipleChoice} setChoices={setSection3MultipleChoice} blocked={!!section3Text} />
        </div>
      </div>

      <hr className="row" />
      <form className="row justify-content-end align-items-end g-3">
        <div className="col-auto">
          <label htmlFor="username" className="form-label">Benutzername Referenz</label>
          <input type="text" className="form-control" id="username" placeholder="" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-primary" onClick={submitHandler}>Aufgabe Hinzufügen</button>
        </div>
      </form>

    </div>
  )
}
