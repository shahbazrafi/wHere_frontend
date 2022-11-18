import './App.css';
import './image.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementUpload from './components/ElementUpload';
function App() {
  const [currentContainer, setCurrentContainer] = useState({ "name": "All", "contains": [] })

  

  const [user, setUser] = useState({"_id":{"$oid":"63735476c45a0c96d278035e"},"name":"cam","email":"cam_va@yahoo.co.uk","__v":{"$numberInt":"0"},"contains":"6374f23e0318fa7c71b095ed"});
  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Home user={user} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} />} />
          <Route path='/add' element={<ElementUpload user={user} currentContainer={currentContainer} />} />
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
