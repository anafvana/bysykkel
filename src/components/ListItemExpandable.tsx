import { unixToDate } from "../utils/utils";
import { ListItemProps } from "./ListItem";

const Expandable = (props: ListItemProps) => {
  return (
    <div className='listitem-expandable' id={`expandable-${props.stationId}`}>
      <div className='listitem-expandable-data'>
        <p>Station ID: {props.stationId}</p>
        <p>Address: {props.stationData.address}</p>
        <p>Capacity: {props.stationData.capacity}</p>
        <a
          href={`https://www.google.com/maps/place/Oslo+Bysykkel/@${props.stationData.lat},${props.stationData.lon},20z`}
          target='_blank'
          rel='noopener noreferrer'
        >
          See on Google Maps
        </a>
      </div>
      <div className='listitem-expandable-status'>
        {props.stationStatus?.last_reported !== undefined &&
        props.stationStatus?.last_reported !== NaN ? (
          <p>Last update: {unixToDate(props.stationStatus?.last_reported)}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Expandable;
