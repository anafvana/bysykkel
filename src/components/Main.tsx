import { useState, useEffect } from "react";
import FetchedStationData from "../types/StationData";
import FetchedStationStatus from "../types/StationStatus";
import Stations from "../types/Station";
import ListItem from "./ListItem";
import "../styles/Main.css";

const fetchStationData = async (): Promise<FetchedStationData | undefined> => {
  const response = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
    {
      headers: {
        "Client-Identifier": "Ana-oppgave",
      },
    }
  );

  if (!response.ok) return undefined;

  try {
    const stationData: FetchedStationData = await response.json();
    return stationData;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const fetchStationStatus = async (): Promise<
  undefined | FetchedStationStatus
> => {
  const response = await fetch(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
    {
      headers: {
        "Client-Identifier": "Ana-oppgave",
      },
    }
  );

  if (!response.ok) return undefined;

  try {
    const stationStatus: FetchedStationStatus = await response.json();
    return stationStatus;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const mergeData = (
  sData: FetchedStationData,
  sStatus: FetchedStationStatus
): Stations => {
  const res: Stations = { stations: {} };

  // Handle station data
  res.last_data_update = sData.last_updated;
  sData.data.stations.map((station) => {
    res.stations[station.station_id] =
      res.stations[station.station_id] === undefined
        ? {}
        : res.stations[station.station_id];
    return (res.stations[station.station_id].data = { ...station });
  });

  // Handle station status
  res.last_status_update = sStatus.last_updated;
  sStatus.data.stations.map((station) => {
    res.stations[station.station_id] =
      res.stations[station.station_id] === undefined
        ? {}
        : res.stations[station.station_id];
    return (res.stations[station.station_id].status = { ...station });
  });

  // Set last update as now
  res.last_update = Date.now() / 1000;

  return res;
};

const Main = () => {
  const [content, setContent] = useState<undefined | Stations>(undefined);

  useEffect(() => {
    const getContent = async () => {
      const stationData = await fetchStationData();
      const stationStatus = await fetchStationStatus();

      const content =
        stationData !== undefined && stationStatus !== undefined
          ? mergeData(stationData, stationStatus)
          : undefined;
      setContent(content);
    };
    getContent();

    // Handle unmounting
    return () => {};
  }, []);

  return (
    <div id='main'>
      {content == undefined ? (
        <p>Data could not be fetched</p>
      ) : (
        Object.keys(content.stations).map((station_id: string) =>
          content.stations[station_id].data !== undefined ? (
            <ListItem
              key={station_id}
              sId={station_id}
              //@ts-ignore
              sData={content.stations[station_id].data}
              sStatus={content.stations[station_id].status}
            />
          ) : (
            ""
          )
        )
      )}
    </div>
  );
};

export default Main;
