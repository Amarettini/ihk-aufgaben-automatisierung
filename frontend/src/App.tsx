import { useEffect, useState } from 'react';
import { ExerciseFormContainer } from './components/ExerciseFormContainer';
import { ExercisePreview, ExerciseData } from './components/ExercisePreview';


function App() {
  const [exercises, setExercises] = useState<ExerciseData[]>([
  ]);

  const username = (new URLSearchParams(document.location.search)).get("ref");
  console.log("Found reference:", username);
  useEffect(() => {
    fetch(`/api/return_all?ref=${username}`).then((response) => { response.json().then((result) => { setExercises(result) }) })
  }, []);

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

  const exercisesList = exercises.map((exercise) => {
    return <ExercisePreview exercise={exercise} />
  })

  return (
    <div>
      <div className="container-fluid mt-4 px-5">
        <div className="row g-5">
          {
            exercisesList.length >= 1 ? exercisesList : <h3>Noch keine Aufgaben hinzugefügt</h3>
          }
        </div>
        <hr className="my-5" />
      </div>
      <ExerciseFormContainer onAdd={addExercise} />
    </div>
  );
}

export default App;
