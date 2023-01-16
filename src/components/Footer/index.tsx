import {
  ActionIcon,
  Container,
  createStyles,
  Group,
  Text,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Text color="dimmed" size="sm">
        Thanks to <a href="https://open-meteo.com/">Open Meteo</a>.
      </Text>

      <Group spacing={0} className={classes.social} position="right" noWrap>
        <ActionIcon
          size="lg"
          component="a"
          href="https://github.com/FMMazur/WeatherIO"
          target="_blank"
          title="Github link"
        >
          <IconBrandGithub size={18} stroke={1.5} />
        </ActionIcon>
      </Group>
    </footer>
  );
};
