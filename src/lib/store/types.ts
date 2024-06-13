export interface Assignment {
  diagramId: string;
  personId: string;
  taskId: string;
  value: string[];
}

export interface Task {
  name?: string;
  id: string;
}

export interface Diagram {
  name: string;
  id: string;
  peopleIds: string[];
  tasks: Task[];
}

export interface Person {
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


type SelectionPoint = [number, number];

export type SelectionState = {
  start?: SelectionPoint;
  end?: SelectionPoint;
  dragging?: boolean;
  selectStart: (start: SelectionPoint) => void;
  selectEnd: (end: SelectionPoint) => void;
  setDrag: (payload: boolean) => void;
  resetSelect: () => void;
};
