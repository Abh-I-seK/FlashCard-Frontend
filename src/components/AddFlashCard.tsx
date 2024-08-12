import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddFlashCard() {
    const[question, setQuestion] = useState<string>("");
    const[answer, setAnswer] = useState<string>("");
    const [done , setDone] = useState<boolean >(true);
    const navigate = useNavigate();

    useEffect(() => {
        const na = localStorage.getItem("token");
        if(na === null){
            navigate("/signin");
        }
    },[navigate])
    
    async function add() {
        setDone(false);
        if(question.length === 0 || answer.length === 0){
            alert("Please fill in the question and answer");
            return;
        }
        const response = await fetch(import.meta.env.VITE_API_URL + "/flashcard", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                question: question,
                answer: answer
            })
        });

        const data = await response.json();
        if(data.success === false){
            navigate("/signin");
        }else{
            navigate("/flashcard");
        }
        // console.log(data);
        setDone(true);

    }   

    return (
        <main onKeyDown={async(e)=>{if(e.key === "Enter"){await add()}}} className='flex flex-col items-center justify-center h-screen gap-4'>
            <p className='text-3xl mb-2'>Add new FlashCard</p>
            <input placeholder="Question" className='p-3 rounded-md text-slate-950 text-normal'  onChange={(e) => setQuestion(e.target.value)} />
            <input placeholder="Answer" className='p-3 rounded-md text-slate-950' onChange={(e) => setAnswer(e.target.value)} />
            <button className='p-3 rounded-md bg-slate-400' onClick={async()=>{await add()}}>Add FlashCard {done === false ? "..." : ""} </button>
        </main>
    )
}