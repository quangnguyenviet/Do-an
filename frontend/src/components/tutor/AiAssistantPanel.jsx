import { useAiAssistant } from "../../context/AiAssistantContext";
import TutorAiAssistant from "./TutorAiAssistant";

export default function AiAssistantPanel() {
  const { target } = useAiAssistant();

  return (
    <TutorAiAssistant
      student={target?.student}
      nextSession={target?.nextSession ?? 1}
      pathItems={target?.pathItems ?? []}
      focusSession={target?.focusSession ?? null}
      onApplyPath={target?.onApplyPath}
      onApplyExercise={target?.onApplyExercise}
    />
  );
}
