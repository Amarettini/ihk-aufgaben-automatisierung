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
    <div>
      <div className="container-fluid mt-4 px-5">
        <div className="row g-5">
          {
            exercises.map((exercise) => {
              return <ExercisePreview exercise={exercise} />
            })
          }
        </div>
        <hr className="my-5" />
      </div>
      <ExerciseFormContainer onAdd={addExercise} />
    </div>
  );
}

export default App;
