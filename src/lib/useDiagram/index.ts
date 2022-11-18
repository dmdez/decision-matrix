import { useParams } from "react-router-dom";
import { useAppState } from "../store";

export function useDiagram() {
  const { diagramId } = useParams<{ diagramId: string }>();
  const diagram = useAppState((state) => state.selectDiagram(diagramId || ""));
  const people = diagram?.people || [];
  const tasks = diagram?.tasks;
  const name = diagram?.name;

  return {
    diagramId,
    name,
    people,
    tasks
  };
}
