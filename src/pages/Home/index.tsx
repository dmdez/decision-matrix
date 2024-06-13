import { Text } from "@chakra-ui/react";

export function Home() {
  return (
    <div>
      <Text
        fontSize="50px"
        color="ButtonFace"
        align="center"
        textShadow="1px 1px 1px ButtonShadow"
      >
        Select a diagram or create a new diagram
      </Text>
    </div>
  );
}
