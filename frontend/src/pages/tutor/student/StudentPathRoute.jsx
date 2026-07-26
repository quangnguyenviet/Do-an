import { useOutletContext } from "react-router-dom";
import StudentPath from "./StudentPath";

export default function StudentPathRoute() {
  const { student, pathItems, setPathItems, exercisesList, setExercisesList, materialsList, setMaterialsList } =
    useOutletContext();

  return (
    <StudentPath
      pathItems={pathItems}
      setPathItems={setPathItems}
      exercisesList={exercisesList}
      setExercisesList={setExercisesList}
      materialsList={materialsList}
      setMaterialsList={setMaterialsList}
    />
  );
}