import { useState,useMemo } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function EditFlashCard() {
    const navigate = useNavigate();
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [done1 , setDone1] = useState<boolean >(true);
    const[done2 , setDone2] = useState<boolean >(true);
    const query = useQuery();
    
    async function update(){
        setDone1(false);
        const id = query.get("id");
        if(id === null || id === undefined){
            navigate("/cards");
            return;
        }
        const token = localStorage.getItem("token");
        if(token === null || token === undefined){
            navigate("/signin");
            return;
        }
        if(question.length === 0 || answer.length === 0){
            alert("Please fill in the question and answer");
            return;
        }
        const response = await fetch(import.meta.env.VITE_API_URL + "/flashcard/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:JSON.stringify({
                question: question,
                answer: answer
            })
        });
        const data = await response.json();
        if(data.success === false){
            localStorage.clear();
            navigate("/signin")
            return;
        }
        navigate("/flashcard?id=" + id);
        setDone1(true);
    }

    async function deleteCard(){
        setDone2(false);
        const id = query.get("id");
        if(id === null || id === undefined){
            navigate("/cards");
            return;
        }
        const token = localStorage.getItem("token");
        if(token === null || token === undefined){
            navigate("/signin");
            return;
        }
        const response = await fetch(import.meta.env.VITE_API_URL + "/flashcard/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        if(data.success === false){
            navigate("/signin")
            return;
        }
        navigate("/cards");
        setDone2(true);
    }

    return(
    <main className='flex flex-col items-center justify-center h-screen gap-4'>
        <p className='text-3xl mb-2'>Card Update</p>
        <input placeholder="Question" className='p-3 rounded-md text-slate-950 text-normal'  onChange={(e) => setQuestion(e.target.value)} />
        <input placeholder="Answer" className='p-3 rounded-md text-slate-950' onChange={(e) => setAnswer(e.target.value)} />
        <button className='p-3 rounded-md bg-slate-400' onClick={async()=>{await update()}}>Update {done1 === false ? "..." : ""}</button>
        <button className='p-3 rounded-md bg-slate-400' onClick={async()=>{await deleteCard()}}>Delete {done2 === false ? "..." : ""}</button>
    </main>
    )
}   