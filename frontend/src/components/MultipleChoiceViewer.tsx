import { Choice } from "./ExercisePreview";

type MultipleChoiceViewerProps = {
  choices: Choice[];
}

export const MultipleChoiceViewer: React.FC<MultipleChoiceViewerProps> = ({ choices }) => {
  return <div className="border p-2 rounded">
    {choices.map((choice, i) => {
      return <div className="form-check" key={i}>
        <input
          type="radio"
          value={i.toString()}
          checked={choice.correct}
          className={choice.correct ? "form-check-input bg-success" : "form-check-input"}
          readOnly
        />
        <div className={choice.correct ? "alert-success border border-1 border-success rounded" : "alert-danger border border-danger rounded"}>
          <input
            className="form-control-sm form-control-plaintext px-2"
            type={"text"}
            value={choice.text}
            readOnly
          />
        </div>
      </div>
    })
    }
  </div>
}
