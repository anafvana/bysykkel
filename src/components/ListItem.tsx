import { StationData, StationStatus } from "../types/Station";
import Expandable from "./ListItemExpandable";
import "../styles/ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faParking,
  faBicycle,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const toggleMoreInfo = (station_id: string) => {
  const btn = document.getElementById(`button-${station_id}`);
  if (btn === undefined || btn === null) {
    console.error("Could not find button element");
    return;
  }

  const expandable = document.getElementById(`expandable-${station_id}`);
  if (expandable === undefined || expandable === null) {
    console.error("Could not find Expandable element");
    return;
  }

  const chevron = document.getElementById(`chevron-${station_id}`);
  if (chevron === undefined || chevron === null) {
    console.error("Could not find chevron element");
    return;
  }

  if (btn.ariaExpanded == "true") {
    expandable.style.display = "none";
    btn.ariaExpanded = "false";
    chevron.style.transform = "rotateX(0deg)";
  } else {
    expandable.style.display = "flex";
    btn.ariaExpanded = "true";
    chevron.style.transform = "rotateX(180deg)";
  }
};

export interface ListItemProps {
  sId: string;
  sData: StationData;
  sStatus: StationStatus | undefined;
}

const ListItem = (props: ListItemProps) => {
  return (
    <article className='listitem' id={`station-${props.sId}`}>
      <button
        id={`button-${props.sId}`}
        className='listitem-button'
        aria-expanded='false'
        onClick={() => toggleMoreInfo(props.sId)}
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
