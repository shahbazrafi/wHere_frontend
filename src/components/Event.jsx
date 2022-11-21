const dayjs = require('dayjs'),
    relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Event = ({ event }) => {
    const { user, time, location, type, subject } = event,
                    happenedAgo = dayjs(time).fromNow()

    return (<>
        <p className="event-user">{user}</p>
        <p className="event-desc">{`${type}: ${subject}`}</p>
        <p className="event-time">{happenedAgo}</p>
        <p className="event-loc">{`in ${location}`}</p></> )
}
export default Event