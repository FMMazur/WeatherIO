import { ActionIcon, Autocomplete } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { memo, useEffect, useState } from "react";

import { useAtomValue, useSetAtom } from "jotai";

import { MeteoApi, MeteoApiQuery } from "../../meteo";
import { SearchResult } from "../../meteo_types";

import { AutocompleteCityItem } from "./item";
import { loadingSelectedCityAtom, selectedCityAtom } from "../../atom";

export type AutocompleteDataType = SearchResult & {
  value: string;
  key: number;
};

const RightSection = memo(function RightSection() {
  const isLoading = useAtomValue(loadingSelectedCityAtom);

  console.log("isLoading", isLoading);

  return (
    <ActionIcon loading={isLoading}>
      <IconSearch />
    </ActionIcon>
  );
});

export const AutocompleteCity = memo(function AutocompleteCity() {
  const setSelectedCity = useSetAtom(selectedCityAtom);
  const setLoading = useSetAtom(loadingSelectedCityAtom);
  const [city, setCity] = useInputState("");
  const [search] = useDebouncedValue(city, 500);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const autocompleteData: AutocompleteDataType[] = searchResult.map(
    (result) => ({
      ...result,
      value: result.name,
      key: result.id,
    })
  );

  useEffect(() => {
    if (!search) {
      return;
    }

    MeteoApi.search(search).then((data) => {
      setSearchResult(data.results || []);
    });
  }, [search]);

  return (
    <Autocomplete
      initiallyOpened
      placeholder="Digite o nome da cidade"
      value={city}
      onChange={setCity}
      rightSection={<RightSection />}
      radius={0}
      data={autocompleteData}
      onItemSubmit={(item: AutocompleteDataType) => {
        setLoading(true);

        MeteoApi.get(
          new MeteoApiQuery()
            .daily([
              "weathercode",
              "apparent_temperature_max",
              "apparent_temperature_min",
            ])
            .hourly(["apparent_temperature", "relativehumidity_2m"])
            .current_weather(true)
            .timezone("auto")
            .timeformat("iso8601")
            .latitude(item.latitude)
            .longitude(item.longitude)
        ).then((data) => {
          setSelectedCity({ ...item, ...data });
          setLoading(false);
        });
      }}
      itemComponent={AutocompleteCityItem}
      mb={20}
      dropdownPosition="bottom"
    />
  );
});
