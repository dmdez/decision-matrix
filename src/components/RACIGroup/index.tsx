import { Badge, Box, HStack } from "@chakra-ui/react";
import { useAppState } from "../../lib/store";

interface Props {
  taskId: string;
  personId: string;
  diagramId?: string;
}

export function RACIGroup({ taskId, personId, diagramId }: Props) {
  const { values } = useAppState((state) => ({
    setAssignment: state.setAssignment,
    values: state.selectAssignment({ taskId, personId, diagramId }),
  }));
  const raciItems = ["R", "A", "C", "I"];
  const raciMap: {
    [key: string]: {
      color: string;
      name: string;
    };
  } = {
    R: {
      color: "red",
      name: "Responsible",
    },
    A: {
      color: "purple",
      name: "Responsible",
    },
    C: {
      color: "green",
      name: "Responsible",
    },
    I: {
      color: "blue",
      name: "Responsible",
    },
  };

  return (
    <Box height="100%">
      <HStack
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        {raciItems.map(
          (value) =>
            values.indexOf(value) > -1 && (
              <Badge colorScheme={raciMap[value].color}>{value}</Badge>
            )
        )}
      </HStack>
    </Box>
  );
}
