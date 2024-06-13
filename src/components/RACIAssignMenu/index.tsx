import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAppState } from "../../lib/store";
import { HamburgerIcon } from "@chakra-ui/icons";

interface Props {
  taskId: string;
  personId: string;
  diagramId?: string;
  active?: boolean;
}

export function RACIAssignMenu({ taskId, personId, diagramId }: Props) {
  const { setAssignment, values } = useAppState((state) => ({
    setAssignment: state.setAssignment,
    values: state.selectAssignment({ taskId, personId, diagramId }),
  }));
  const raciItems = ["R", "A", "C", "I"];

  function handleSetAssignment(value: string) {
    if (diagramId) {
      setAssignment({
        diagramId,
        personId,
        taskId,
        value,
      });
    }
  }
  return (
    <Menu closeOnSelect={false} gutter={0}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={(e) => e.stopPropagation()}
        size="xs"
        rounded={0}
      />
      <MenuList>
        {raciItems.map((value) => (
          <MenuItem
            command={value}
            onClick={(e) => {
              e.stopPropagation();
              handleSetAssignment(value);
            }}
          >
            {value}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
