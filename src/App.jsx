import { Outlet } from 'react-router-dom';
import './App.css'


function App() {

  return (
    <div className='md:w-4/5 mx-auto'>
      <div className="navbar bg-slate-800 text-white">
        <a className="btn btn-ghost normal-case text-xl">Form Builder</a>
      </div>
      <Outlet></Outlet>
      
    </div>
  )
}

export default App
