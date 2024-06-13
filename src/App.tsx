import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Diagram } from "./pages/Diagram";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="diagram/:diagramId" element={<Diagram />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
