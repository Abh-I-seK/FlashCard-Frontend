import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    const [name, setName] = useState<string>("");
    const navigate = useNavigate();

    useEffect(()=>{
        let na = localStorage.getItem("name");
        // console.log(na === null);
        if(na === null){
            na = "";
        }
        setName(na);
    },[setName])

    return(
        <div className='flex flex-row justify-between items-center w-full mb-5 text-slate-200'>
            <nav>{name}</nav>
                {(name != "") ?
                <nav className='flex gap-4 '>
                    <button className='p-3 rounded-md text-slate-900 bg-slate-400' onClick={()=>{navigate("/add");}}>Add Card</button>                
                    <button className='p-3 rounded-md text-slate-900 bg-slate-400' onClick={()=>{
                        localStorage.removeItem("token");localStorage.removeItem("name"); navigate("/cards")}}>Logout</button>  
                </nav>
                : 
                <nav className='flex gap-4 '>
                    <button className='p-3 rounded-md bg-slate-400' onClick={()=>{navigate("/signup");}}>SignUp</button>                  
                    <button className='p-3 rounded-md bg-slate-400' onClick={()=>{navigate("/signin");}}>SignIn</button>
                </nav>
                }
        </div>
    )
}