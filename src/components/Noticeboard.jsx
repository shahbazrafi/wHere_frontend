import {useState} from 'react'
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'
const dayjs = require('dayjs'),
    relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Noticeboard = ({ events, setEvents }) => {
    const [isExpanded, setIsExpanded] = useState(false),
        toggleExpand = () => {
            setIsExpanded(state => !state)
            console.log(isExpanded)
        }

    let key = 0;
    return <div className="noticeboard">
        {isExpanded && <ul className="event-list">
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
        </ul>}
        <button onClick={toggleExpand} >
            {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        </button>
    </div>
}
export default Noticeboard