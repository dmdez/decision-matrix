import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack
} from "@chakra-ui/react";
import { useAppState } from "../../lib/store";

interface Props {
  taskId: string;
  personId: string;
  diagramId?: string;
}

export function RACIGroup({ taskId, personId, diagramId }: Props) {
  const { setAssignment, values } = useAppState((state) => ({
    setAssignment: state.setAssignment,
    values: state.selectAssignment({ taskId, personId, diagramId })
  }));

  function handleSetAssignment(value: string) {
    if (diagramId) {
      setAssignment({
        diagramId,
        personId,
        taskId,
        value
      });
    }
  }
  return (
    <Menu closeOnSelect={false}>
      <MenuButton transition="all 0.2s">
        <Stack direction="row" spacing={0}>
          {values.indexOf("R") > -1 && <Badge colorScheme="blue">R</Badge>}
          {values.indexOf("A") > -1 && <Badge colorScheme="green">A</Badge>}
          {values.indexOf("C") > -1 && <Badge colorScheme="red">C</Badge>}
          {values.indexOf("I") > -1 && <Badge colorScheme="purple">I</Badge>}
          <ChevronDownIcon />
        </Stack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleSetAssignment("R")}>
          <Badge colorScheme="blue">Responsible</Badge>
        </MenuItem>
        <MenuItem onClick={() => handleSetAssignment("A")}>
          <Badge colorScheme="green">Accountable</Badge>
        </MenuItem>
        <MenuItem onClick={() => handleSetAssignment("C")}>
          <Badge colorScheme="red">Consulted</Badge>
        </MenuItem>
        <MenuItem onClick={() => handleSetAssignment("I")}>
          <Badge colorScheme="purple">Informed</Badge>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
