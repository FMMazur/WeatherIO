import { memo, useMemo } from "react";

import {
  CloseButton,
  Divider,
  Flex,
  MediaQuery,
  Paper,
  Skeleton,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { loadingSelectedCityAtom, selectedCityAtom } from "../../atom";
import { WeatherIcon } from "../WeatherIcon";
import { useAtomValue, useSetAtom } from "jotai";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";

const CloseSelectedCityButton = memo(function CloseSelectedCityButton() {
  const setSelectedCity = useSetAtom(selectedCityAtom);
  return (
    <CloseButton
      size="lg"
      title="Close forecast"
      aria-label="close forecast"
      onClick={() => setSelectedCity(undefined)}
    />
  );
});

const SelectedCitySkeleton = () => {
  const nextDays = useMemo(
    () =>
      [...Array(5).keys()].map((i) => {
        const data = (
          <Flex direction="column" mb={5}>
            <Skeleton height={30} width={110} animate mb={10} />

            <Flex>
              <Skeleton height={30} width={50} animate mr={10} />
              <Skeleton height={30} width={50} animate />
            </Flex>
          </Flex>
        );

        return (
          <>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              {data}
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Paper withBorder key={i} p={8} mb={5}>
                {data}
              </Paper>
            </MediaQuery>
          </>
        );
      }),
    []
  );

  return (
    <>
      <Flex justify="space-between" align="center" mb={20}>
        <Skeleton height={24} width={200} animate />

        <CloseSelectedCityButton />
      </Flex>

      <Flex align="center" mb={20}>
        <Skeleton height={36} width={110} mr={10} animate />
        <Skeleton height={36} width={36} circle animate />
      </Flex>

      <Flex mb={20}>
        <Skeleton height={30} width={50} animate mr={10} />
        <Skeleton height={30} width={50} animate mr={10} />
        <Skeleton height={30} width={100} animate />
      </Flex>

      <Flex mb={20}>
        <Skeleton height={30} width={110} animate mr={10} />
        <Skeleton height={30} width={100} animate />
      </Flex>

      <Divider mb={20} />

      <Flex justify="space-between" wrap="wrap">
        {nextDays}
      </Flex>
    </>
  );
};

const DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const SelectedCity = () => {
  const selectedCity = useAtomValue(selectedCityAtom);
  const loadingSelectedCity = useAtomValue(loadingSelectedCityAtom);

  const today = new Date();
  const currentTime = today.getHours();
  const currentHourlyWeather = Math.round(
    selectedCity?.hourly?.apparent_temperature?.[currentTime] || 0
  );
  const currentHourlyHumidity = Math.round(
    selectedCity?.hourly?.relativehumidity_2m?.[currentTime] || 0
  );

  const nextDays = [...Array(5).keys()].map((i) => {
    const currentDay = (today.getUTCDay() + i + 1) % 7;

    const data = (
      <Flex direction="column">
        <Title order={5} mb={10} w={110}>
          {DAYS[currentDay]}
        </Title>

        <Flex>
          <Title fw="normal" color="orange.5" order={4} mr={10} w={50}>
            {Math.round(
              selectedCity?.daily?.apparent_temperature_min?.[i] || 0
            )}
            °
          </Title>
          <Title fw="normal" color="orange.5" order={4} w={50}>
            {Math.round(
              selectedCity?.daily?.apparent_temperature_max?.[i] || 0
            )}
            °
          </Title>
        </Flex>
      </Flex>
    );

    return (
      <>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          {data}
        </MediaQuery>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Paper withBorder key={i} p={8} mb={5}>
            {data}
          </Paper>
        </MediaQuery>
      </>
    );
  });

  if (!selectedCity && !loadingSelectedCity) return null;

  return (
    <Paper
      shadow="xs"
      mih={300}
      radius="md"
      withBorder
      mb={20}
      p="md"
      pos="relative"
    >
      {loadingSelectedCity ? (
        <SelectedCitySkeleton />
      ) : (
        <>
          <Flex justify="space-between" align="center" mb={20}>
            <Title order={5}>
              {selectedCity?.name}, {selectedCity?.admin1} -{" "}
              {selectedCity?.country}
            </Title>

            <CloseSelectedCityButton />
          </Flex>

          <Flex align="center" mb={20}>
            <Title order={2} mr={10}>
              {selectedCity?.current_weather?.temperature}°C
            </Title>
            <WeatherIcon
              code={selectedCity?.current_weather?.weathercode || 1}
            />
          </Flex>

          <Flex mb={20} h={30}>
            <Flex w={110} mr={10} justify="space-between">
              <Flex align="center">
                <ThemeIcon
                  color="orange"
                  variant="outline"
                  sx={{ border: "unset" }}
                >
                  <IconArrowDown />
                </ThemeIcon>
                <Title order={4}>
                  {Math.round(
                    selectedCity?.daily?.apparent_temperature_min?.[0] || 0
                  )}
                  °
                </Title>
              </Flex>

              <Flex align="center">
                <ThemeIcon
                  color="orange"
                  variant="outline"
                  sx={{ border: "unset" }}
                >
                  <IconArrowUp />
                </ThemeIcon>
                <Title order={4}>
                  {Math.round(
                    selectedCity?.daily?.apparent_temperature_max?.[0] || 0
                  )}
                  °
                </Title>
              </Flex>
            </Flex>

            <Flex align="center">
              <Title order={4} fw="normal" mr={4}>
                Sensação
              </Title>
              <Title order={4}>{currentHourlyWeather}°C</Title>
            </Flex>
          </Flex>

          <Flex mb={20} h={30}>
            <Flex align="center" mr={10} w={110} justify="space-between">
              <Title order={4} fw="normal" mr={4}>
                Vento
              </Title>
              <Title order={4}>
                {Math.round(selectedCity?.current_weather?.windspeed || 0)}km/h
              </Title>
            </Flex>
            <Flex align="center" mr={10} w={110} justify="space-between">
              <Title order={4} fw="normal" mr={4}>
                Humidade
              </Title>
              <Title order={4}>{currentHourlyHumidity}km/h</Title>
            </Flex>
          </Flex>

          <Divider mb={20} />

          <Flex justify="space-between" wrap="wrap">
            {nextDays}
          </Flex>
        </>
      )}
    </Paper>
  );
};
