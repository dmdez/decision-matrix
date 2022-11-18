import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider
} from "@chakra-ui/react";
import { NewPerson } from "../NewPerson";
import { useDiagram } from "../../lib/useDiagram";
import { useAppState } from "../../lib/store";

export function PersonMenu() {
  const { people: diagramPeople, diagramId } = useDiagram();
  const { addDiagramPerson, people } = useAppState((state) => ({
    addDiagramPerson: state.addDiagramPerson,
    people: state.people.filter(({ id }) => {
      return !diagramPeople.find((p) => {
        return p.id === id;
      });
    })
  }));

  function handleAddPeron(personId: string) {
    if (diagramId) {
      addDiagramPerson({ diagramId, personId });
    }
  }

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton transition="all 0.2s">
            Add
            <ChevronDownIcon />
          </MenuButton>
          <MenuList width="10">
            {people.map(({ name, id }) => (
              <MenuItem onClick={() => handleAddPeron(id)}>{name}</MenuItem>
            ))}
            <MenuDivider />
            <Box px="3" mt="1">
              <NewPerson onCreate={onClose} />
            </Box>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
