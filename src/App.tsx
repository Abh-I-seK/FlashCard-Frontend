import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10'>
      <p className='text-2xl text-sky-200 font-serif font-semibold'>FlashCard</p>
      <button onClick={()=>{navigate("/cards")}} className='p-3 rounded-md bg-slate-100 text-black font-bold'>Get Started</button>  
    </div> 
  )
}

export default App
