import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { colorSchemeAtom } from "./atom";

const Main = function Main() {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme,
          globalStyles: () => ({
            "#root": {
              width: "100vw",
              height: "100vh",
              padding: "20px",
              overflow: "auto",
            },
          }),
        }}
      >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
