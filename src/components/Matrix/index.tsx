import {
  Box,
  Button,
  BoxProps,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useOutsideClick,
} from "@chakra-ui/react";
import { RACIGroup } from "../RACIGroup";
import { PersonMenu } from "../PersonMenu";
import { ManageTask } from "../ManageTask";
import { useDiagram } from "../../lib/useDiagram";
import { useAppState, useSelectionState } from "../../lib/store";
import { Fragment, useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { RACIAssignMenu } from "../RACIAssignMenu";

const MatrixItem = (props: BoxProps) => {
  return (
    <Box
      borderBottom={`1px solid`}
      borderRight={`1px solid`}
      borderColor="chakra-border-color"
      bg="chakra-body-bg"
      flex="0 0 100px"
      position="relative"
      {...props}
    />
  );
};

function checkSelectedIndex(
  currentIndex: number,
  start?: number,
  end?: number
) {
  return (
    start !== undefined &&
    end !== undefined &&
    (start < end
      ? currentIndex >= start && currentIndex <= end
      : currentIndex <= start && currentIndex >= end)
  );
}

const MatrixGridItem = ({
  roleIndex,
  taskIndex,
  ...props
}: BoxProps & {
  taskIndex: number;
  roleIndex: number;
}) => {
  const { start, end, dragging, selectStart, selectEnd } = useSelectionState(
    (state) => ({
      start: state.start,
      end: state.end,
      dragging: state.dragging,
      selectStart: state.selectStart,
      selectEnd: state.selectEnd,
    })
  );

  const isXSelected = checkSelectedIndex(roleIndex, start?.[0], end?.[0]);
  const isYSelected = checkSelectedIndex(taskIndex, start?.[1], end?.[1]);
  const isSelected = isXSelected && isYSelected;

  return (
    <MatrixItem
      onMouseOver={() => {
        if (dragging) {
          selectEnd([roleIndex, taskIndex]);
        }
      }}
      onMouseDown={() => {
        selectStart([roleIndex, taskIndex]);
      }}
      background={isSelected ? "red" : "inherit"}
      {...props}
    />
  );
};

export function Matrix() {
  const { people, tasks, name, diagramId } = useDiagram();
  const matrixRef = useRef<HTMLDivElement | null>(null);
  const { setDrag, resetSelect } = useSelectionState((state) => ({
    setDrag: state.setDrag,
    resetSelect: state.resetSelect,
  }));
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const { addDiagramTask } = useAppState(({ addDiagramTask }) => ({
    addDiagramTask,
  }));

  function handleAddTask() {
    if (diagramId) {
      addDiagramTask(diagramId);
    }
  }

  useOutsideClick({
    ref: matrixRef,
    handler: () => resetSelect(),
  });

  return (
    <>
      <Box bg="chakra-subtle-bg" px={4} position="relative" zIndex={3}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-apart"}>
          <Box flex={1}>{name}</Box>
          <Button
            mr={4}
            leftIcon={<AddIcon />}
            size="sm"
            onClick={handleAddTask}
          >
            Add Task
          </Button>
          <PersonMenu />
        </Flex>
      </Box>
      <Box
        display="inline-grid"
        gridTemplateColumns={`repeat(${people.length + 1}, 1fr)`}
        gap={0}
        borderTop={`1px solid`}
        borderColor="chakra-border-color"
        userSelect="none"
        ref={matrixRef}
        onTouchMove={() => setDrag(true)}
        onTouchEnd={() => setDrag(false)}
        onMouseMove={(event) => {
          if (event.buttons === 1) {
            setDrag(true);
          } else {
            setDrag(false);
          }
        }}
      >
        <MatrixItem sx={{ position: "sticky", left: 0, zIndex: 2 }} />
        {people.map(({ name }, p) => (
          <MatrixItem key={p} sx={{ position: "sticky", top: 0, zIndex: 1 }}>
            {name}
          </MatrixItem>
        ))}

        {tasks.map(({ name, id }, taskIndex) => (
          <Fragment key={id}>
            <MatrixItem
              width="200px"
              p={3}
              sx={{ position: "sticky", left: 0, zIndex: 1 }}
            >
              <ManageTask
                defaultValue={name}
                taskId={id}
                diagramId={diagramId}
              />
            </MatrixItem>
            {people.map(({ id: personId }, roleIndex) => {
              return (
                <MatrixGridItem
                  key={`${personId}${id}`}
                  boxShadow={
                    activeKey === `${personId}${id}`
                      ? "inset 0px 0 1px black"
                      : "none"
                  }
                  tabIndex={0}
                  taskIndex={taskIndex}
                  roleIndex={roleIndex}
                >
                  <Popover
                    placement="right-end"
                    gutter={0}
                    isOpen={activeKey === `${personId}${id}`}
                    onOpen={() => {
                      setActiveKey(
                        activeKey === `${personId}${id}`
                          ? undefined
                          : `${personId}${id}`
                      );
                    }}
                  >
                    <PopoverTrigger>
                      <Box
                        tabIndex={0}
                        role="button"
                        aria-label="Some box"
                        height="100%"
                        children={
                          <RACIGroup
                            taskId={id}
                            personId={personId}
                            diagramId={diagramId}
                          />
                        }
                      />
                    </PopoverTrigger>
                    <PopoverContent maxWidth="unset" width="unset">
                      <RACIAssignMenu
                        taskId={id}
                        personId={personId}
                        diagramId={diagramId}
                      />
                    </PopoverContent>
                  </Popover>
                </MatrixGridItem>
              );
            })}
          </Fragment>
        ))}
      </Box>
    </>
  );
}
