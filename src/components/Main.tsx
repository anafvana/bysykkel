import { useState, useEffect } from "react";
import FetchedStationData from "../types/StationData";
import FetchedStationStatus from "../types/StationStatus";
import Stations from "../types/Station";

const fetchStationData = async (): Promise<FetchedStationData | null> => {
  const response = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
    {
      headers: {
        "Client-Identifier": "Ana-oppgave",
      },
    }
  );

  if (!response.ok) return null;

  try {
    const stationData: FetchedStationData = await response.json();
    return stationData;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchStationStatus = async (): Promise<null | FetchedStationStatus> => {
  const response = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
    {
      headers: {
        "Client-Identifier": "Ana-oppgave",
      },
    }
  );

  if (!response.ok) return null;

  try {
    const stationStatus: FetchedStationStatus = await response.json();
    return stationStatus;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const mergeData = (
  sData: FetchedStationData,
  sStatus: FetchedStationStatus
): Stations => {
  const res: Stations = { stations: {} };

  res.last_data_update = sData.last_updated;
  sData.data.stations.map((station) => {
    // TODO Create or add
    res.stations[station.station_id] =
      res.stations[station.station_id] === undefined
        ? {}
        : res.stations[station.station_id];
    return (res.stations[station.station_id].data = { ...station });
  });

  res.last_status_update = sStatus.last_updated;
  sStatus.data.stations.map((station) => {
    // TODO Create or add
    res.stations[station.station_id] =
      res.stations[station.station_id] === undefined
        ? {}
        : res.stations[station.station_id];
    return (res.stations[station.station_id].status = { ...station });
  });

  res.last_update = Date.now() / 1000;

  return res;
};

const Main = () => {
  const [content, setContent] = useState<null | Stations>(null);

  useEffect(() => {
    const getContent = async () => {
      const stationData = await fetchStationData();
      const stationStatus = await fetchStationStatus();

      const content =
        stationData !== null && stationStatus !== null
          ? mergeData(stationData, stationStatus)
          : null;
      setContent(content);
    };
    getContent();

    // Handle unmounting
    return () => {};
  }, []);

  return (
    <div id='main'>
      {content == null ? (
        <p>Data could not be fetched</p>
      ) : (
        Object.keys(content.stations).map((station_id: string) => (
          <li key={station_id}>{content.stations[station_id].data?.address}</li>
        ))
      )}
    </div>
  );
};

export default Main;
