// Station data retrieved from station_information.json

import { StationData } from "./Station";

interface SDStation extends StationData {
  station_id: string;
  [x: string | number | symbol]: unknown;
}

interface FetchedStationData {
  data: { stations: Array<SDStation> };
  last_updated: number;
  [x: string | number | symbol]: unknown;
}

export default FetchedStationData;
