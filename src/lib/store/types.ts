interface Assignment {
  diagramId: string;
  personId: string;
  taskId: string;
  value: string[];
}

interface Task {
  name?: string;
  id: string;
}

interface Diagram {
  name: string;
  id: string;
  peopleIds: string[];
  tasks: Task[];
}

interface Person {
  name?: string;
  id: string;
}

export interface AppState {
  assignments: Assignment[];
  diagrams: Diagram[];
  people: Person[];

  selectDiagram: (
    diagramId: string
  ) => {
    name?: string;
    tasks: Task[];
    people: Person[];
  };

  selectAssignment: (payload: {
    diagramId?: string;
    taskId: string;
    personId: string;
  }) => string[];

  addDiagram: (name: string) => void;
  deleteDiagram: (diagramId: string) => void;
  addPerson: (name: string, id: string) => void;
  setAssignment: (payload: {
    diagramId: string;
    personId: string;
    taskId: string;
    value: string;
  }) => void;
  addDiagramPerson: (payload: { diagramId: string; personId: string }) => void;
  addDiagramTask: (diagramId: string) => void;
  updateDiagramTaskName: (payload: {
    diagramId: string;
    taskId: string;
    name?: string;
  }) => void;
}
