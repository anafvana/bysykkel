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
  sId: string;
  sData: StationData;
  sStatus: StationStatus | undefined;
}

const ListItem = (props: ListItemProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className='listitem' id={`station-${props.sId}`}>
      <button
        id={`button-${props.sId}`}
        className='listitem-button'
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <p>{props.sData.name}</p>
        <p>
          <FontAwesomeIcon icon={faBicycle} />{" "}
          {props.sStatus?.num_bikes_available}
        </p>
        <p>
          <FontAwesomeIcon icon={faParking} />
          {props.sStatus?.num_docks_available}
        </p>
        <FontAwesomeIcon
          icon={faAngleDown}
          className='listitem-button-chevron'
          id={`chevron-${props.sId}`}
        />
      </button>
      <Expandable sId={props.sId} sData={props.sData} sStatus={props.sStatus} />
    </article>
  );
};

export default ListItem;
