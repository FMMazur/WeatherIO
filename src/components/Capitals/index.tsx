import { Flex, Text, Title } from "@mantine/core";
import { memo } from "react";

export type Temperature = {
  name: string;
  min: number;
  max: number;
};

export const Capitals = memo(function Capitals({
  capitals,
}: {
  capitals: Temperature[];
}) {
  return (
    <Flex direction="column" style={{ height: "100%" }} miw="100%">
      <Title order={2}>Capitais</Title>

      <Flex>
        <Flex direction="column">
          <Text size="sm" color="gray" mx={4}>
            Min.
          </Text>

          {capitals.map((capital) => (
            <Text key={capital.name} ta="center" fw={700} mx={4}>
              {Math.round(capital.min)}°
            </Text>
          ))}
        </Flex>
        <Flex direction="column">
          <Text size="sm" color="gray" mx={4}>
            Max.
          </Text>

          {capitals.map((capital) => (
            <Text key={capital.name} ta="center" fw={700} mx={4}>
              {Math.round(capital.min)}°
            </Text>
          ))}
        </Flex>

        {/* HACK: order is reversed so we don't need to create a empty space
         ** and order is calculated based on the length of the array
         */}
        <Flex direction="column-reverse">
          {capitals.map((capital, i) => (
            <Text
              key={capital.name}
              ta="left"
              fw={700}
              mx={4}
              sx={{ order: capitals.length - i }}
            >
              {capital.name}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
});
