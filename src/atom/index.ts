import { ColorScheme } from "@mantine/core";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DeepRequired } from "../meteo";
import { SearchResult, MeteoApiResponse } from "../meteo_types";

export const colorSchemeAtom = atomWithStorage<ColorScheme>(
  "colorScheme",
  "dark"
);

type SelectedCity = SearchResult &
  MeteoApiResponse &
  DeepRequired<Pick<MeteoApiResponse, "current_weather">>;
export const selectedCityAtom = atom<SelectedCity | undefined>(undefined);
export const loadingSelectedCityAtom = atom(false);
