import { StationData, StationStatus } from "../types/Station";
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
        <p>Last update: {props.sStatus?.last_reported}</p>
      </div>
    </div>
  );
};

export default Expandable;
