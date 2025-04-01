import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import './App.css'
import { Outlet } from 'react-router-dom';
import {Header, Footer} from './components'

function App() {
     const [loading, setLoading] = useState(true);
     const dispatch = useDispatch();
     useEffect( () =>{
            authService.getCurrentuser()
            .then( (userData) => {
              if(userData){
                dispatch(login({userData}))
              }
              else{
                dispatch(logout())
              }
            })
            .finally( ()=>{
              setLoading(false)
            })
     },[])

     return !loading ? (
     <div className='min-h-screen flex flex-wrap content-between bg-gary-400'>
           <div className='w-full block'>
 <Header></Header>
       <main>
        {/* <Outlet></Outlet> */}
       </main>
 <Footer></Footer>
           </div>
     </div>) : null

  
}

export default App
