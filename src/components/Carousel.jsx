import { useState, useEffect } from "react"
import Card from "./Card"
import { motion } from "framer-motion"

const Carousel = ({ currentContainer, addEvent, setHistory, setCurrentContainer, setId, show, screenWidth}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(currentContainer.contains.length)
    
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
    return (<div className="carousel-container">
        <div className="carousel-wrapper">
        {currentIndex > 0 &&
        <button onClick={prev} className="left-arrow">
            &lt;
        </button>}
        <div className="carousel-content-wrapper">
            <div className={`carousel-content show-${show}`} style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }} >
                    {currentContainer.contains.map((element, index) => {
                        return <motion.div initial={{ opacity: 0, translatex: 50, translateY: -20 }} animate={{ opacity: 1, translateY: 0, translateX: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>< Card element={element} addEvent={addEvent} setHistory={setHistory} screenWidth={screenWidth} setId={setId} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} index={index} /></motion.div>
                    })}
            </div>
                {currentIndex < (length - show) &&
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>}
        </div>
    </div>
</div>
        
    )
}
export default Carousel