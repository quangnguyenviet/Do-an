import { useOutletContext } from "react-router-dom";
import ManageAssignments from "./ManageAssignments";

export default function ManageAssignmentsRoute() {
  const { student, pathItems, exercisesList, setExercisesList } = useOutletContext();

  return (
    <ManageAssignments
      exercisesList={exercisesList}
      setExercisesList={setExercisesList}
      pathItems={pathItems}
    />
  );
}