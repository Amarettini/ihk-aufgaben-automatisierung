import './App.css';
import { ExerciseFormContainer } from './components/ExerciseFormContainer';
import { ExercisePreview, ExerciseData } from './components/ExercisePreview';

const exercises: ExerciseData[] = [
  {
    section1: { type: "text_question", question: "Frage NR. 1" },
    section2: { type: "text_question", question: "Fragen appendix" },
    section3: { type: "text_anwser", anwser: "Antwort ist 42" }
  }
];

const addExercise = (exercise: ExerciseData) => {
  exercises.push(exercise);
}

function App() {
  return (
    <div>
      {
        exercises.map((exercise) => {
          return <ExercisePreview exercise={exercise} />
        })
      }
      <ExerciseFormContainer onAdd={addExercise} />
    </div>
  );
}

export default App;
