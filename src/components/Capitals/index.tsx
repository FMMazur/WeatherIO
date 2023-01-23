import { Flex, Skeleton, Text, Title } from "@mantine/core";
import { memo } from "react";

export type Temperature = {
  name: string;
  min: number;
  max: number;
};

interface CapitalsSkeletonProps {
  size: number;
}

export const CapitalsSkeleton = ({ size }: CapitalsSkeletonProps) => (
  <Flex direction="column" style={{ height: "100%" }} miw="100%">
    <Title order={2}>Capitais</Title>

    <Flex>
      <Flex direction="column">
        <Text size="sm" color="gray" mx={4}>
          Min.
        </Text>

        {[...Array(size).keys()].map((i) => (
          <Skeleton
            key={`min-${i}`}
            ta="center"
            fw={700}
            mx={4}
            mb={10}
            width={40}
            height={24}
          />
        ))}
      </Flex>
      <Flex direction="column">
        <Text size="sm" color="gray" mx={4}>
          Max.
        </Text>

        {[...Array(size).keys()].map((i) => (
          <Skeleton
            key={`max-${i}`}
            ta="center"
            fw={700}
            mx={4}
            mb={10}
            width={40}
            height={24}
          />
        ))}
      </Flex>
      <Flex direction="column-reverse">
        {[...Array(size).keys()].map((i) => (
          <Skeleton
            key={`name-${i}`}
            width={100}
            height={24}
            mx={4}
            sx={{ order: size - i }}
            mb={10}
          />
        ))}
      </Flex>
    </Flex>
  </Flex>
);

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
