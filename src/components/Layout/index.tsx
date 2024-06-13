import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  Link,
  Grid,
  GridItem,
  VStack,
  LightMode,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useAppState } from "../../lib/store";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { MdPerson, MdGridView } from "react-icons/md";
import { useState } from "react";
import { NewDiagram } from "../NewDiagram";

export enum SidebarStatus {
  DIAGRAMS = "diagrams",
  ROLES = "roles",
  NONE = "none",
}

export const Layout = () => {
  const diagrams = useAppState(({ diagrams }) => diagrams);
  const [menuStatus, setMenuStatus] = useState<SidebarStatus>(
    SidebarStatus.DIAGRAMS
  );
  const showMenu = menuStatus !== SidebarStatus.NONE;

  const handleShow = (status: SidebarStatus) => () => {
    if (menuStatus === status) {
      setMenuStatus(SidebarStatus.NONE);
    } else {
      setMenuStatus(status);
    }
  };

  return (
    <Grid
      h="100%"
      templateColumns={`0fr ${showMenu ? "240px" : "0"} 1fr`}
      gap={0}
    >
      <LightMode>
        <GridItem
          bg="white"
          data-theme="light"
          color="var(--chakra-colors-chakra-body-text)"
          alignItems="center"
          p={1}
          borderRightColor="lightgrey"
          borderRightWidth={1}
        >
          <VStack spacing={1}>
            <IconButton
              variant={
                menuStatus === SidebarStatus.DIAGRAMS ? "outline" : "ghost"
              }
              aria-label="Show Diagrams"
              icon={<Icon as={MdGridView} />}
              onClick={handleShow(SidebarStatus.DIAGRAMS)}
            />
            <IconButton
              variant={menuStatus === SidebarStatus.ROLES ? "outline" : "ghost"}
              aria-label="Show People"
              icon={<Icon as={MdPerson} />}
              onClick={handleShow(SidebarStatus.ROLES)}
            />
          </VStack>
        </GridItem>
        <GridItem
          bg="lightgrey"
          data-theme="light"
          color="var(--chakra-colors-chakra-body-text)"
        >
          {menuStatus === SidebarStatus.DIAGRAMS && (
            <VStack m={3} spacing={3} align="flex-start">
              {diagrams.map(({ name, id }) => (
                <Link key={id} to={`/diagram/${id}`} as={RouterLink}>
                  {name}
                </Link>
              ))}
              <NewDiagram />
            </VStack>
          )}
          {menuStatus === SidebarStatus.ROLES && <div>Users..</div>}
        </GridItem>
      </LightMode>

      <GridItem overflow="auto">
        <Outlet />
      </GridItem>
    </Grid>
  );
};
