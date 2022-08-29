import { StationData, StationStatus } from "../types/Station";
import Expandable from "./ListItemExpandable";

const toggleMoreInfo = () => {};

export interface ListItemProps {
  sId: string;
  sData: StationData;
  sStatus: StationStatus | undefined;
}

const ListItem = (props: ListItemProps) => {
  return (
    <article id={`station-${props.sId}`}>
      <button className='listitem' onClick={toggleMoreInfo}>
        <p>{props.sData.name}</p>
        <p>{props.sStatus?.num_bikes_available}</p>
        <p>{props.sStatus?.num_docks_available}</p>
      </button>
      <Expandable sId={props.sId} sData={props.sData} sStatus={props.sStatus} />
    </article>
  );
};

export default ListItem;
