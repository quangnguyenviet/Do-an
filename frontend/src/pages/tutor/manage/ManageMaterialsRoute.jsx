import { useOutletContext } from "react-router-dom";
import ManageMaterials from "./ManageMaterials";

export default function ManageMaterialsRoute() {
  const { pathItems, materialsList, setMaterialsList } = useOutletContext();

  return (
    <ManageMaterials
      materialsList={materialsList}
      setMaterialsList={setMaterialsList}
      pathItems={pathItems}
    />
  );
}