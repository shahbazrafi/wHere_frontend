const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Noticeboard = ({events, setEvents}) => {
    let key = 0;
    return <div className="noticeboard">
        <ul className="event-list">
            {events.map(event => {
                const { user, time, location, type, subject } = event,
                    happenedAgo = dayjs(time).fromNow()
                key++;
                return <li key={key} className="event-item">
                    <p className="event-user">{user}</p>
                    <p className="event-time">{happenedAgo}</p>
                    <p className="event-desc">{`${type}: ${subject}`}</p>
                    <p className="event-loc">{`in ${location}`}</p> 
                </li>
            })}
        </ul>
    </div>
}
export default Noticeboard