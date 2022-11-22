import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from './contexts';
import ElementUpload from './components/ElementUpload';
import Search from './components/Search'
import SearchSection from './components/SearchSection';
import EditContainer from './components/EditContainer';
import Login from './components/Login';
import Noticeboard from './components/Noticeboard';
import EditItem from './components/EditItem'

function App() {
  const [currentContainer, setCurrentContainer] = useState({ "name": "All", "contains": [] }),
    [id, setId] = useState('6374f23e0318fa7c71b095ed'),
    [history, setHistory] = useState([]),
    [usersArray, setUsersArray] = useState([]),
    [user, setUser] = useState({}),
    [search, setSearch] = useState(""),
    [events, setEvents] = useState([]),
    addEvent = (user, time, location, type, subject) => setEvents(currEvents => [...currEvents, {user, time, location, type, subject}]) 

  return (
    <UserContext.Provider value={{user, setUser}} >
    <BrowserRouter>
      <div className="App">
        <Header addEvent={addEvent} />
        {user.name ?
        <Routes>
              <Route path='/' element={<div className='main'>
                <Noticeboard events={events} setEvents={setEvents} />
                <SearchSection search={search} setSearch={setSearch} />
                <Home currentContainer={currentContainer} setCurrentContainer={setCurrentContainer} id={id} setId={setId} history={history} setHistory={setHistory} addEvent={addEvent} /></div>} />
          <Route path='/add' element={<ElementUpload addEvent={addEvent}  currentContainer={currentContainer}/>} />
          <Route path='/search/:search_query' element={<Search addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} currentContainer={currentContainer} />}></Route>
          <Route path='/edit/container/:id' element={<EditContainer currentContainer={currentContainer} addEvent={addEvent} />}></Route>
          <Route path='/edit/item/' element={<EditItem currentContainer={currentContainer} addEvent={addEvent} />}></Route>
        </Routes>
        : <Login usersArray={usersArray} setUsersArray={setUsersArray} addEvent={addEvent} />}
      </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
