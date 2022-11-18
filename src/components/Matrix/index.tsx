import { Box, Button, HStack, BoxProps } from "@chakra-ui/react";
import { RACIGroup } from "../RACIGroup";
import { PersonMenu } from "../PersonMenu";
import { ManageTask } from "../ManageTask";
import { useDiagram } from "../../lib/useDiagram";
import { useAppState } from "../../lib/store";

const Foo = (props: BoxProps) => (
  <Box flex="0 0 100px" border="1px solid red" overflow="hidden" {...props} />
);

export function Matrix() {
  const { people, tasks, diagramId } = useDiagram();
  const addDiagramTask = useAppState(({ addDiagramTask }) => addDiagramTask);

  function handleAddTask() {
    if (diagramId) {
      addDiagramTask(diagramId);
    }
  }

  return (
    <>
      <>
        <HStack>
          <Foo
            height="100"
            sx={{ position: "sticky", left: 0, backgroundColor: "white" }}
          />
          {tasks.map(({ name, id }, i) => (
            <Foo key={i}>
              <ManageTask
                defaultValue={name}
                taskId={id}
                diagramId={diagramId}
              />
            </Foo>
          ))}
          <Box>
            <Button onClick={handleAddTask}>+</Button>
          </Box>
        </HStack>
        <Box>
          {people.map(({ name, id: personId }, p) => (
            <HStack key={p}>
              <Foo
                sx={{ position: "sticky", left: 0, backgroundColor: "white" }}
              >
                {name}
              </Foo>
              {tasks.map((_, i) => (
                <Foo key={`${p}${i}`}>
                  <RACIGroup
                    taskId={_.id}
                    personId={personId}
                    diagramId={diagramId}
                  />
                </Foo>
              ))}
            </HStack>
          ))}
        </Box>
        <Box>
          <PersonMenu />
        </Box>
      </>
    </>
  );
}
