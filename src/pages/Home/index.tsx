import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppState } from "../../lib/store";

export function Home() {
  const diagrams = useAppState(({ diagrams }) => diagrams);
  return (
    <div>
      <Link to="/new">Create Diagram</Link>
      {diagrams.map(({ name, id }) => (
        <Box p="1">
          <Button width="100%" as={Link} to={`/diagram/${id}`}>
            {name}
          </Button>
        </Box>
      ))}
    </div>
  );
}
