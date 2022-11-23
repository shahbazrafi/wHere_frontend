import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts"
import * as api from "../api"
import { useNavigate } from 'react-router-dom';


const LoginRegister = ({ usersArray, setUsersArray, addEvent })=>{
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
 

useEffect(() => {
    api.fetchUsers().then((data) => {
        console.log(data)
        setLoading(true)
        setUsersArray(data)
        setLoading(false)
    })

 }, [])


const handleUsername = ((e) => {
  setUsername(e.target.value)
})

const handlePassword = ((e) => {

  setPassword(e.target.value)
}) 


const handleSubmit = (e)=>{

  e.preventDefault()

  for (let i = 0; i < usersArray.length; i++) {
    if(usersArray[i].name===username && usersArray[i].password===password){

      console.log("username", username)
      setUser(usersArray[i])
      navigate("/")
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
          <button id="submit" type="submit">Submit</button>
        </form>
      </div>
}

//comment
export default LoginRegister