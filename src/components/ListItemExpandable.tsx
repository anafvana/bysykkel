import { StationData, StationStatus } from "../types/Station";
import { unixToDate } from "../utils/utils";
import { ListItemProps } from "./ListItem";

const Expandable = (props: ListItemProps) => {
  return (
    <div className='listitem-expandable' id={`expandable-${props.sId}`}>
      <div className='data'>
        <p>Address: {props.sData.address}</p>
        <p>Capacity: {props.sData.capacity}</p>
        <a
          href={`https://www.google.com/maps/place/Oslo+Bysykkel/@${props.sData.lat},${props.sData.lon},20z`}
          target='_blank'
          rel='noopener noreferrer'
        >
          See on Google Maps
        </a>
      </div>
      <div className='status'>
        {props.sStatus?.last_reported !== undefined &&
        props.sStatus?.last_reported !== NaN ? (
          <p>Last update: {unixToDate(props.sStatus?.last_reported)}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Expandable;
