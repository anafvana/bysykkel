import { useState, useEffect } from "react";
import FetchedStationData from "../types/StationData";
import FetchedStationStatus from "../types/StationStatus";
import Stations from "../types/Station";
import ListItem from "./ListItem";
import "../styles/Main.css";
import { unixToDate } from "../utils/utils";

// Fetch data about stations (address, capacity, etc)
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

// Fetch station status (available bikes, empty racks, etc)
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

// Join data from different endpoints
const mergeData = (
  sData: FetchedStationData,
  sStatus: FetchedStationStatus
): Stations => {
  const res: Stations = { stations: {} };

  // Handle station data
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

  return res;
};

const Main = () => {
  const [content, setContent] = useState<undefined | Stations>(undefined);

  // Fetch and generate content
  const getContent = async () => {
    const stationData = await fetchStationData();
    const stationStatus = await fetchStationStatus();

    const content =
      stationData !== undefined && stationStatus !== undefined
        ? mergeData(stationData, stationStatus)
        : undefined;
    setContent(content);
  };

  // Retrieve content on mount
  useEffect(() => {
    getContent();
    return () => {};
  }, []);

  // Update content periodically
  setInterval(() => {
    getContent();
  }, 300000);

  return (
    <main id='main'>
      {content !== undefined && content.last_status_update !== undefined ? (
        <p className='main-lastupdate'>
          Last update: {unixToDate(content.last_status_update)}
        </p>
      ) : (
        ""
      )}

      <section>
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
      </section>
    </main>
  );
};

export default Main;
