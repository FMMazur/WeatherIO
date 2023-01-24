import { Box, Center, Container, Divider, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { memo, useEffect } from "react";
import { AutocompleteCity } from "./components/AutocompleteCity";
import { Capitals, CapitalsSkeleton, Temperature } from "./components/Capitals";
import { MeteoApi, MeteoApiQuery } from "./meteo";

import { SelectedCity } from "./components/SelectedCity";
import { ThemeToggle } from "./components/ThemeToggle";
import { Footer } from "./components/Footer";

const CAPITALS = [
  { name: "São Paulo", latitude: -23.5, longitude: -46.625 },
  { name: "Rio de Janeiro", latitude: -22.91, longitude: -43.18 },
  { name: "Belo Horizonte", latitude: -19.92, longitude: -43.94 },
  { name: "Brasília", latitude: -15.78, longitude: -47.93 },
  { name: "Belém", latitude: -1.46, longitude: -48.5 },
  { name: "Salvador", latitude: -12.97, longitude: -38.51 },
  { name: "Curitiba", latitude: -25.43, longitude: -49.27 },
  { name: "Fortaleza", latitude: -3.72, longitude: -38.54 },
  { name: "Manaus", latitude: -3.1, longitude: -60.02 },
  { name: "João Pessoa", latitude: -7.12, longitude: -34.86 },
];

const ForecastTitle = memo(function ForecastTitle() {
  return (
    <Center>
      <Title mb={10}>Previsão do Tempo</Title>
    </Center>
  );
});

function App() {
  const [lastUpdate, setLastUpdate] = useLocalStorage({
    key: "lastUpdated",
    defaultValue: new Date().toISOString(),
    getInitialValueInEffect: false,
  });
  const [capitals, setCapitals] = useLocalStorage<Temperature[]>({
    key: "capitals",
    defaultValue: [],
    getInitialValueInEffect: false,
  });
  const loadingCapitals =
    capitals.length === 0 ||
    new Date(lastUpdate).toLocaleDateString() !==
      new Date().toLocaleDateString();

  useEffect(() => {
    if (!lastUpdate) {
      return;
    }

    // check if last update is older than today
    const lastUpdateDate = new Date(lastUpdate);
    const now = new Date();

    if (
      capitals.length > 0 &&
      lastUpdateDate.toLocaleDateString() === now.toLocaleDateString()
    ) {
      return;
    }

    // fetch data from API
    const query = new MeteoApiQuery()
      .daily([
        "weathercode",
        "apparent_temperature_max",
        "apparent_temperature_min",
      ])
      .timezone("auto")
      .timeformat("iso8601");
    Promise.all(
      CAPITALS.map((capital) =>
        MeteoApi.get(
          query.latitude(capital.latitude).longitude(capital.longitude)
        )
      )
    ).then((data) => {
      setCapitals(
        data.map((capital, index) => ({
          name: CAPITALS[index].name,
          min: capital?.daily?.apparent_temperature_min?.[0] ?? 0,
          max: capital?.daily?.apparent_temperature_max?.[0] ?? 0,
        }))
      );
      setLastUpdate(new Date().toISOString());
    });
  }, [lastUpdate, setLastUpdate, setCapitals, capitals.length]);

  return (
    <Container pos={{ xl: "relative" }}>
      <Box
        pos="absolute"
        top="0px"
        right="0px"
        mt={10}
        mr={10}
        sx={{ zIndex: 9999 }}
      >
        <ThemeToggle />
      </Box>

      <ForecastTitle />

      <SelectedCity />

      <AutocompleteCity />

      <Divider />

      {loadingCapitals && <CapitalsSkeleton size={CAPITALS.length} />}
      {!loadingCapitals && <Capitals capitals={capitals} />}

      <Footer />
    </Container>
  );
}

export default App;
