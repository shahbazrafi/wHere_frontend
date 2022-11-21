import {useState} from 'react'
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'
import Event from './Event'
const dayjs = require('dayjs'),
    relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Noticeboard = ({ events, setEvents }) => {
    const [isExpanded, setIsExpanded] = useState(false),
        toggleExpand = () => {
            setIsExpanded(state => !state)
        }
    let key = 0;
    return <div className="noticeboard" onMouseEnter={toggleExpand} onMouseLeave={toggleExpand}>
        {!isExpanded ? <li className="event-item"><Event event={events[events.length-1]} /></li>: <></>}
        {isExpanded && <ul className="event-list">
            {events.map(event => {
                key++;
                return <li key={key} className="event-item">
                    <Event event={event} />
                </li>
            })}
        </ul>}
        <button onClick={toggleExpand} >
            {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        </button>
    </div>
}
export default Noticeboard