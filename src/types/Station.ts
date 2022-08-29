// Station data handled within the application

export interface StationData {
  name: string;
  address: string;
  capacity: number;
  lat: number;
  lon: number;
}

export interface StationStatus {
  is_installed: number;
  is_renting: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
}

interface Stations {
  last_status_update?: number;
  stations: {
    [x: string]: {
      data?: StationData;
      status?: StationStatus;
    };
  };
}

export default Stations;
