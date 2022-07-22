import { Choice } from "./ExercisePreview";

type MultipleChoiceCreatorProps = {
  choices: Choice[];
  setChoices: (newChoices: Choice[]) => void;
  blocked?: boolean
}

export const MultipleChoiceCreator: React.FC<MultipleChoiceCreatorProps> = ({ choices, setChoices, blocked = false }) => {
  // const [correctChoice, setCorrectChoice] = useState("");

  const handleCorrectChoiceChnage = (choiceIndex: number) => {
    const newChoices: Choice[] = [...choices];
    newChoices.forEach((value, i) => value.correct = (i === choiceIndex));
    setChoices(newChoices);
  }

  const handleChoiceTextChange = (choiceIndex: number, newText: string) => {
    const newChoices = [...choices];
    newChoices[choiceIndex] = { ...newChoices[choiceIndex], text: newText }
    setChoices(newChoices);
  }


  return <div className="border p-2 rounded">
    {/* <label className="form-label">Multiple Choice</label> */}
    {choices.map((choice, i) => {
      return <div className="form-check">
        <input
          type="radio"
          name="section3"
          value={i.toString()}
          checked={choice.correct}
          onChange={() => handleCorrectChoiceChnage(i)}
          className="form-check-input"
          disabled={blocked}
        />
        {/* <label className="form-check-label"> */}
        <input
          className="form-control form-control-sm"
          type={"text"}
          onChange={(event) => handleChoiceTextChange(i, event.target.value)}
          value={choice.text}
          disabled={blocked}
        />
        {/* </label> */}
      </div>
    })
    }</div>

}
