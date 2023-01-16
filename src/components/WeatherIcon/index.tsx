import { Box, Flex } from "@mantine/core";
import {
  IconCloud,
  IconCloudFog,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
  IconGrain,
  IconSnowflake,
  IconSun,
  IconSunHigh,
} from "@tabler/icons";
import { WEATHERCODE, WeatherCode } from "../../meteo_types";

interface WeatherIconProps {
  code: WeatherCode;
}

function _WeatherIcon({ code }: WeatherIconProps) {
  const icon: {
    [key in WeatherCode]: JSX.Element;
  } = {
    [WEATHERCODE.Clear]: <IconSunHigh />,
    [WEATHERCODE.MainlyClear]: <IconSun />,
    [WEATHERCODE.PartlyCloudy]: (
      <Flex pos="relative">
        <Box
          pos="absolute"
          sx={{
            transform: "translateY(-30%)",
          }}
        >
          <IconSun />
        </Box>
        <Box
          sx={(theme) => ({
            "&>svg": {
              fill:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[5]
                  : theme.colors.dark[8],
            },
          })}
        >
          <IconCloud />
        </Box>
      </Flex>
    ),
    [WEATHERCODE.Overcast]: <IconCloud />,
    [WEATHERCODE.Fog]: <IconCloudFog />,
    [WEATHERCODE.RimeFog]: <IconCloudFog />,
    [WEATHERCODE.DrizzleLight]: <IconCloudRain />,
    [WEATHERCODE.DrizzleModerate]: <IconCloudRain />,
    [WEATHERCODE.DrizzleDense]: <IconCloudRain />,
    [WEATHERCODE.FreezingDrizzleLight]: <IconCloudRain />,
    [WEATHERCODE.FreezingDrizzleDensity]: <IconCloudRain />,
    [WEATHERCODE.RainSlight]: <IconCloudRain />,
    [WEATHERCODE.RainModerate]: <IconCloudRain />,
    [WEATHERCODE.RainHeavy]: <IconCloudRain />,
    [WEATHERCODE.FreezingRainLight]: <IconCloudSnow />,
    [WEATHERCODE.FreezingRainHeavy]: <IconCloudSnow />,
    [WEATHERCODE.SnowfallSlight]: <IconSnowflake />,
    [WEATHERCODE.SnowfallModerate]: <IconSnowflake />,
    [WEATHERCODE.SnowfallHeavy]: <IconSnowflake />,
    [WEATHERCODE.SnowGrains]: <IconGrain />,
    [WEATHERCODE.RainShowersLight]: <IconCloudRain />,
    [WEATHERCODE.RainShowersModerate]: <IconCloudRain />,
    [WEATHERCODE.RainShowersHeavy]: <IconCloudRain />,
    [WEATHERCODE.SnowShowersLight]: <IconSnowflake />,
    [WEATHERCODE.SnowShowersHeavy]: <IconSnowflake />,
    [WEATHERCODE.Thunderstorm]: <IconCloudStorm />,
    [WEATHERCODE.ThunderstormHailSligh]: <IconCloudStorm />,
    [WEATHERCODE.ThunderstormHailHeavy]: <IconCloudStorm />,
  };

  return icon[code];
}

export const WeatherIcon = _WeatherIcon;
