import { useState } from 'react';
import { ExerciseFormContainer } from './components/ExerciseFormContainer';
import { ExercisePreview, ExerciseData } from './components/ExercisePreview';


function App() {
  const [exercises, setExercises] = useState<ExerciseData[]>([
    {
      section1: { type: "text_question", question: "Frage NR. 1" },
      section2: { type: "text_question", question: "Fragen appendix" },
      section3: { type: "text_anwser", anwser: "Antwort ist 42" }
    }
  ]);

  const addExercise = (exercise: ExerciseData) => {
    const newExercises = [...exercises];
    newExercises.push(exercise);
    setExercises(newExercises);

    fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exercise),
    })
  }

  return (
    <div className="container-sm">
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
