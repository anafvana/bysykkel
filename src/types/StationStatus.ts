// Station status retrieved from station_status.json

import { StationStatus } from "./Station";

interface SSStation extends StationStatus {
  station_id: string;
  [x: string | number | symbol]: unknown;
}

interface FetchedStationStatus {
  last_updated: number;
  data: { stations: Array<SSStation> };
  [x: string | number | symbol]: unknown;
}

export default FetchedStationStatus;
