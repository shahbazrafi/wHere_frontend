import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts"
import * as api from "../api"
import { useNavigate } from 'react-router-dom';


const LoginRegister = ({ usersArray, setUsersArray, addEvent })=>{
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext),
    [loading, setLoading] = useState(true),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [hintText, setHintText] = useState("")
 

useEffect(() => {
    api.fetchUsers().then((data) => {
        console.log(data)
        setLoading(true)
        setUsersArray(data)
        setLoading(false)
    })

 }, [])


  const handleUsername = ((e) => setUsername(e.target.value)),
    handlePassword = ((e) => setPassword(e.target.value)),
    handleSubmit = (e) => {

  e.preventDefault()


  for (let i = 0; i < usersArray.length; i++) {
    if(usersArray[i].name===username && usersArray[i].password===password){

   
      setUser(usersArray[i])
      addEvent(user.name, new Date(), 'the app', 'logged', ' in')
      navigate("/")
    } else {
      setHintText("Incorrect username or password")
    }
  }
}
  
return <div className="loginform">
        <form id="form" method="get" onSubmit={handleSubmit}>
          <fieldset>
            <br />
            <legend className="signtxt">Sign In</legend>
            <p>Sign in to your account!</p>
            <input className="input" placeholder="username" value={username} type="text" id="username" name="username" onChange={handleUsername}/>
              <input className="input" placeholder="password" type="password" id="password" name="password" onChange={handlePassword} />
    </fieldset>
    <p>For Demo purposes, <br/><br/> set <b>Username: </b>cam and <b>Password: </b>password</p>
          <button className="submitbutton" id="submit" type="submit">Submit</button>
        </form>
        <p>{hintText}</p>
      </div>
}

export default LoginRegister