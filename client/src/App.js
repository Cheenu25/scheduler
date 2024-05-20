import './App.css'
import HomePage from './components/HomePage'
import Signuppage from './components/Signuppage'
import Loginpage from './components/Loginpage'
import Main from './components/Main'
import Today from './components/Modules/Today.js'
import { Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Upcoming from './components/Modules/Upcoming'


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.Authtoken
  return (
    <div className="App">
      <Routes>
        <Route path= '/' Component={authToken ? Main : HomePage}/>
        <Route path='/signup' Component={Signuppage}/>
        <Route path='/login' Component={Loginpage}/> 
      </Routes>
    </div>
  );
}

export default App;
