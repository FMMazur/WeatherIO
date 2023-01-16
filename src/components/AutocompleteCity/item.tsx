import { Flex, Image, SelectItemProps, Text } from "@mantine/core";
import { forwardRef } from "react";
import { SearchResult } from "../../meteo_types";

interface ItemProps extends Omit<SearchResult, "id">, SelectItemProps {}

const AutocompleteCityItemRef = forwardRef<HTMLDivElement, ItemProps>(
  function AutocompleteCityItem(
    { name, country_code, country, admin1, ...props },
    ref
  ) {
    return (
      <Flex style={{ cursor: "pointer" }} align="center" ref={ref} {...props}>
        <Image
          src={`https://hatscripts.github.io/circle-flags/flags/${country_code.toLowerCase()}.svg`}
          mr={8}
          maw={24}
          mah={24}
          fit="scale-down"
        />
        <Text mr={8} size="md">
          {name}
        </Text>
        <Text color="dimmed" size="sm" mr={8}>
          {admin1}
        </Text>
        <Text color="dimmed" size="xs">
          {country}
        </Text>
      </Flex>
    );
  }
);

export const AutocompleteCityItem = AutocompleteCityItemRef;
