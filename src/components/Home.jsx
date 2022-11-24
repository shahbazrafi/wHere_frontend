import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts.jsx';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import { BsPlusSquareFill } from 'react-icons/bs'
import Carousel from './Carousel.jsx';
import Card from './Card.jsx';

const Home = ({ currentContainer, setCurrentContainer, id, setId, history, setHistory, addEvent }) => {
    
    const [isLoading, setIsLoading] = useState(true),
        { user, setUser } = useContext(UserContext),
        [screenWidth, setScreenWidth] = useState(window.innerWidth),
        [selected, setSelected] = useState('none')
    let key = 0;

    useEffect(() => {
        setIsLoading(true)
        api.fetchContainerById(id).then(data => {
            setCurrentContainer(data)
            setIsLoading(false)
        })
    }, [id])

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', changeWidth)
    }, [])

    // if (isLoading) return <p className='loading'>Loading</p>

    return (
        screenWidth > 700 ?<>
            <div>
                {history.map((x, index) =>{
                    key++
                    return <Carousel key={key} currentContainer={x} i={index} show={screenWidth > 1655 ? 4 : screenWidth > 1200 ? 3 : 2} screenWidth={screenWidth} addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} isHistory={true} selected={selected} setSelected={setSelected} >
                    </Carousel>})}
            </div> 
            {!currentContainer.contains.length && !isLoading? <p>Please add an item.</p> :
            <Carousel currentContainer={currentContainer} show={screenWidth > 1655 ? 4 : screenWidth > 1200 ? 3 : 2} screenWidth={screenWidth} addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} isHistory={false} selected={selected} setSelected={setSelected} />}
        <motion.div className='addIcon-cont'>
            <Link to="/add" ><BsPlusSquareFill className="addIcon" /></Link>
            </motion.div>
            {isLoading ? <p className='loading'>Loading</p> : null}
        </> :
    <div>
    <ul className="history-list">
        {history.map((x, index) => <a className="history-item" key={x._id} href="" onClick={(e) => {
            e.preventDefault();
            setId(x._id)
            setHistory((previousHistory) => previousHistory.slice(0, index))
        }}><li key={x.index}>{x.name}</li></a>)}
    </ul>
    <h1>{currentContainer.name}</h1>
    {isLoading ? <p className='loading'>Loading</p> :
        <motion.div layout className='card-field'>
            {currentContainer.contains.map((element, index) => {
                return <motion.div initial={{ opacity: 0, translatex: 50, translateY: -20 }} animate={{ opacity: 1, translateY: 0, translateX: 0 }} transition={{ duration: 0.3, delay: index * 0.1}}> < Card element={element} screenWidth={screenWidth} addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} cardIndex={index} selected={selected} setSelected={setSelected} /></motion.div>
            }
        )}
        {!currentContainer.contains.length ? <p>Please add an item.</p> : null}
        </motion.div>}
        <motion.div className='addIcon-cont'>
            <Link to="/add" ><BsPlusSquareFill className="addIcon" /></Link>
        </motion.div>
    </div>
    )
};
export default Home;