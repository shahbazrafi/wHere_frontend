import { useState, useEffect } from "react"
import Card from "./Card"
import { motion, AnimatePresence } from "framer-motion"

const Carousel = ({ i, currentContainer, addEvent, setHistory, setCurrentContainer, setId, show, screenWidth, isHistory, selected, setSelected}) => {
    const [currentIndex, setCurrentIndex] = useState(0),
        [length, setLength] = useState(currentContainer.contains.length)
    
    useEffect(() => {
        setLength(currentContainer.contains.length)
    }, [currentContainer.contains])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    },
    prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }
    return (<motion.div layout className="carousel-container" initial={{opacity: 0, translateY: -50}} animate={{opacity: 1, translateY:0}} transition={{duration: 0.5}}>
        <div className="carousel-wrapper">
        {currentIndex > 0 &&
        <button onClick={prev} className="left-arrow">
            &lt;
        </button>}
        <div className="carousel-content-wrapper">
            <div layout className={`carousel-content show-${show}`} style={{ transform: `translateX(-${currentIndex * (100 / show)}%)`}} >
                    <AnimatePresence mode="wait" >
                    {currentContainer.contains.map((element, index) => {
                        return <motion.div style={{ 'flex-grow': length > 3 ? 1 : 0 }}
                            initial={{ opacity: 0, translateX: -50, translateY: -20 }}
                            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
                            exit={{ opacity: 0, translateY: -50, translateX: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            key={element._id + 'x'} >
                            <Card element={element} addEvent={addEvent} setHistory={setHistory} screenWidth={screenWidth} setId={setId} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} index={i} cardIndex={index} isHistory={isHistory} selected={selected} setSelected={setSelected} />
                        </motion.div>
                    })}
                    </AnimatePresence>
            </div>
                {currentIndex < (length - show) &&
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>}
        </div>
    </div>
</motion.div>
        
    )
}
export default Carousel