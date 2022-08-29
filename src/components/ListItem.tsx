import { StationData, StationStatus } from "../types/Station";
import Expandable from "./ListItemExpandable";
import "../styles/ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faParking,
  faBicycle,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export interface ListItemProps {
  stationId: string;
  stationData: StationData;
  stationStatus: StationStatus | undefined;
}

const ListItem = (props: ListItemProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className='listitem' id={`station-${props.stationId}`}>
      <button
        id={`button-${props.stationId}`}
        className='listitem-button'
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <p>{props.stationData.name}</p>
        <p>
          <FontAwesomeIcon icon={faBicycle} />{" "}
          {props.stationStatus?.num_bikes_available}
        </p>
        <p>
          <FontAwesomeIcon icon={faParking} />
          {props.stationStatus?.num_docks_available}
        </p>
        <FontAwesomeIcon
          icon={faAngleDown}
          className='listitem-button-chevron'
          id={`chevron-${props.stationId}`}
        />
      </button>
      <Expandable
        stationId={props.stationId}
        stationData={props.stationData}
        stationStatus={props.stationStatus}
      />
    </article>
  );
};

export default ListItem;
