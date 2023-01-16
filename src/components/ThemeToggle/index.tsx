import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

export const ThemeToggle = function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      color={colorScheme === "dark" ? "yellow" : "violet"}
      variant="filled"
    >
      {colorScheme === "dark" ? (
        <IconSun size={18} />
      ) : (
        <IconMoonStars size={18} />
      )}
    </ActionIcon>
  );
};
