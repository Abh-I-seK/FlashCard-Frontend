import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [name, setname] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [done , setDone] = useState<boolean >(true);
    const navigate = useNavigate();

    async function login() {
        setDone(false);
        if(name.length === 0 || password.length === 0){
            alert("Please fill in the name and password");
            return;
        }
        const response = await fetch(import.meta.env.VITE_API_URL + "/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                adminName: name,
                adminPassword: password
            })
        });

        const data = await response.json();
        // console.log(data);
        if(data.success === false){
            alert(data.msg);
        }else{
            const token = data.token
            localStorage.setItem("token", token);
            localStorage.setItem("name", data.adminName);
            navigate("/flashcard");
        }
        setDone(true);
    }

    return (
        <main className='flex flex-col items-center justify-center h-screen gap-4'>
        <p className='text-3xl mb-2'>Admin SignUp</p>
        <input placeholder="Name" className='p-3 rounded-md text-slate-950 text-normal'  onChange={(e) => setname(e.target.value)} />
        <input placeholder="Password" className='p-3 rounded-md text-slate-950' onChange={(e) => setpassword(e.target.value)} />
        <button className='p-3 rounded-md bg-slate-400' onClick={async()=>{await login()}}>Sign Up {done === false ? "..." : ""} </button>
        
        </main>
    )
}