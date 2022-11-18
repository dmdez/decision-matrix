import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Diagram } from "./pages/Diagram";
import { NewDiagram } from "./pages/NewDiagram";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="new" element={<NewDiagram />} />
          <Route path="diagram/:diagramId" element={<Diagram />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
