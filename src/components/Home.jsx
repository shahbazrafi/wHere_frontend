import { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../contexts.jsx';
import { motion, useAnimationControls } from 'framer-motion'
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import { BsPlusSquareFill } from 'react-icons/bs'
import {HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft} from 'react-icons/hi'
import Card from './Card.jsx';

const Home = ({ currentContainer, setCurrentContainer, id, setId, history, setHistory, addEvent }) => {
    
    const [isLoading, setIsLoading] = useState(true),
        { user, setUser } = useContext(UserContext),
        [width, setWidth] = useState(0),
        carousel = useRef(),
        controls = useAnimationControls()

    useEffect(() => {
        setIsLoading(true)
        api.fetchContainerById(id).then(data => {
            setCurrentContainer(data)
            setIsLoading(false)
        })
    }, [id])

    useEffect(() => {   // define right scroll limit of carousel
        if (carousel.current) setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [isLoading])
    

    const scrollCarousel = () => {
        console.log('right arrow clicked ')
        controls.start({x: 100})
    }


    if (isLoading) return <p className='loading'>Loading</p>

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
            <motion.div className='carousel' ref={carousel}>
        <motion.div layout drag='x' dragConstraints={{right: 0, left: -width}} initial={{x: 0}} animate={{controls}} className='card-field'>
            {currentContainer.contains.map((element, index) => {
                return <motion.div key={element._id} initial={{ opacity: 0, translateX: 50, translateY: -20 }} animate={{ opacity: 1, translateY: 0, translateX: 0 }} transition={{ duration: 0.3, delay: index * 0.1}}> < Card element={element} addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} index={index} /></motion.div>
            }
        )}
        {currentContainer.contains.length===0 ? <p>Please add an item.</p> : null}
                </motion.div>
                <HiOutlineChevronDoubleRight id='carousel-right' onClick={scrollCarousel}/>
                <HiOutlineChevronDoubleLeft id='carousel-left'/>
            </motion.div>
        <motion.div className='addIcon-cont'>
            <Link to="/add" ><BsPlusSquareFill className="addIcon" /></Link>
        </motion.div>
    </div>
    )
};
export default Home;