import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts.jsx';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import {BsPlusSquareFill} from 'react-icons/bs'
import Card from './Card.jsx';

const Home = ({ currentContainer, setCurrentContainer, id, setId, history, setHistory, addEvent }) => {
    
    const [isLoading, setIsLoading] = useState(true),
        {user, setUser} = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true)
        api.fetchContainerById(id).then(data => {
            console.log(data, '<<<data in home')
            setCurrentContainer(data)
            setIsLoading(false)
        })
    }, [id])

    if (isLoading) return <p>Loading</p>

    return (
    <div>
    <ul className="history-list">
        {history.map((x, index) => <a className="history-item" key={x._id} href="" onClick={(e) => {
            e.preventDefault();
            setId(x._id)
            setHistory((previousHistory) => previousHistory.slice(0, index))
        }}><li key={x.index}>{x.name}</li></a>)}
    </ul>

    
    <h1>{currentContainer.name}</h1>
        <motion.div layout className='card-field'>
            {currentContainer.contains.map((element, index) => {
                return <motion.div initial={{ opacity: 0, translatex: 50, translateY: -20 }} animate={{ opacity: 1, translateY: 0, translateX: 0 }} transition={{ duration: 0.3, delay: index * 0.1}}> < Card element={element} addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} index={index} /></motion.div>
            }
        )}
        {currentContainer.contains.length===0 ? <p>Please add an item.</p> : null}
        </motion.div>
        <motion.div className='addIcon-cont'>
            <Link to="/add" ><BsPlusSquareFill className="addIcon" /></Link>
        </motion.div>
    </div>
    )
};
export default Home;