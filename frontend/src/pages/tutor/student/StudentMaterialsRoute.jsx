import { useOutletContext } from "react-router-dom";
import StudentMaterials from "./StudentMaterials";

export default function StudentMaterialsRoute() {
  const { pathItems, materialsList, setMaterialsList } = useOutletContext();

  return (
    <StudentMaterials
      materialsList={materialsList}
      setMaterialsList={setMaterialsList}
      pathItems={pathItems}
    />
  );
}