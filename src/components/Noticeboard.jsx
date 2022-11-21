

const Noticeboard = ({events, setEvents}) => {

    return <div className="noticeboard">
        <ul className="event-list">
            {events.map(event => {
                const { user, time, location, type, subject } = event;
                return <li key={time} className="event-item">
                    <p>{user}</p>
                    <p>{time}</p>
                    <p>{`${type}: ${subject}`}</p>
                    <p>{location}</p> 
                </li>
            })}
        </ul>
    </div>
}
export default Noticeboard