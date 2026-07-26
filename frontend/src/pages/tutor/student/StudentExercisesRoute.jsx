import { useOutletContext } from "react-router-dom";
import StudentExercises from "./StudentExercises";

export default function StudentExercisesRoute() {
  const { student, pathItems, exercisesList, setExercisesList } = useOutletContext();

  return (
    <StudentExercises
      exercisesList={exercisesList}
      setExercisesList={setExercisesList}
      pathItems={pathItems}
    />
  );
}