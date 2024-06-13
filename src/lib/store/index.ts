import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AppState, SelectionState } from "./types";
import { genUUID } from "../genUUID";
import { xor } from "lodash";

export const useAppState = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        diagrams: [],
        assignments: [],
        people: [],

        selectDiagram: (diagramId) => {
          const diagram = get().diagrams.find(({ id }) => id === diagramId);
          const allPeople = get().people;
          const people = (diagram?.peopleIds || []).map((id) => {
            return {
              id,
              name: allPeople.find((p) => p.id === id)?.name
            };
          });
          return {
            name: diagram?.name,
            tasks: diagram?.tasks || [],
            people
          };
        },

        selectAssignment: ({ diagramId, personId, taskId }) => {
          const assignment = get().assignments.find((a) => {
            return (
              a.diagramId === diagramId &&
              a.personId === personId &&
              a.taskId === taskId
            );
          });
          return assignment ? assignment.value : [];
        },

        addDiagram: (name) =>
          set((state) => {
            state.diagrams.push({
              name,
              peopleIds: [],
              tasks: [],
              id: genUUID()
            });
          }),

        addPerson: (name, id) =>
          set((state) => {
            state.people.push({
              id,
              name
            });
          }),

        setAssignment: (payload) =>
          set((state) => {
            const { diagramId, personId, taskId, value } = payload;
            const matchIndex = state.assignments.findIndex((m) => {
              return (
                m.diagramId === diagramId &&
                m.personId === personId &&
                m.taskId === taskId
              );
            });

            if (matchIndex > -1) {
              state.assignments[matchIndex].value = xor(
                state.assignments[matchIndex].value,
                [value]
              );
            } else {
              state.assignments.push({
                diagramId,
                personId,
                taskId,
                value: [value]
              });
            }
          }),

        addDiagramPerson: (payload) =>
          set((state) => {
            state.diagrams.forEach((diagram) => {
              if (diagram.id === payload.diagramId) {
                diagram.peopleIds.push(payload.personId);
              }
            });
          }),

        addDiagramTask: (diagramId) =>
          set((state) => {
            state.diagrams.forEach((diagram) => {
              if (diagram.id === diagramId) {
                diagram.tasks.push({
                  id: genUUID()
                });
              }
            });
          }),

        updateDiagramTaskName: (payload) =>
          set((state) => {
            state.diagrams.forEach((diagram) => {
              if (diagram.id === payload.diagramId) {
                diagram.tasks.forEach((task) => {
                  if (task.id === payload.taskId) {
                    task.name = payload.name;
                  }
                });
              }
            });
          }),

        deleteDiagram: (payload) =>
          set((state) => {
            return state.diagrams.filter(({ id }) => {
              return id !== payload;
            });
          })
      })),
      {
        name: "diagram-storage", // unique name
        getStorage: () => sessionStorage // (optional) by default, 'localStorage' is used
      }
    )
  )
);

export const useSelectionState = create<SelectionState>()(
  devtools(
    immer((set, get) => ({
      selectStart: (start) => set((state) => {
        state.start = start;
        state.end = undefined;
      }),
      selectEnd: (end) => set((state) => {
        state.end = end
      }),
      resetSelect: () => set((state) => {
        state.start = undefined;
        state.end = undefined;
      }),
      setDrag: (payload) => set((state) => {
        state.dragging = payload;
      })
    }))
  )
);
