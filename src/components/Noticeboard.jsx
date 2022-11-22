import { useState } from 'react'
import {motion} from 'framer-motion'
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
    return <motion.div transition={{layout: {duration: 1.2, type: 'spring' }}} layout className="noticeboard" onMouseEnter={toggleExpand} onMouseLeave={toggleExpand}>
        {!isExpanded ? <motion.li layout='transition' className="event-item"><Event event={events[events.length-1]} /></motion.li>: <></>}
        {isExpanded && <motion.ul  layout className="event-list">
            {events.map((event, index) => {
                key++;
                return <motion.li
                    initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                    transition={{duration: 0.2, delay: index * 0.07}}
                    key={key} className="event-item">
                    <Event event={event} />
                </motion.li>
            })}
        </motion.ul>}
        <motion.button layout='position' onClick={toggleExpand} >
            {isExpanded ? <MdOutlineExpandLess className='expand-arrow'/> : <MdOutlineExpandMore className='expand-arrow'/>}
        </motion.button >
    </motion.div>
}
export default Noticeboard