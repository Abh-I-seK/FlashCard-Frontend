import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cards.css'

export type Card = {
    question : string,
    answer : string,
    id : number
} 

export default function Cards() {
    const [data, setData] = useState<Card[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function getData() {
            const res = await fetch(import.meta.env.VITE_API_URL + "/flashcard");
            const r = await res.json();
            setData(r);
            return r;
        }
        
        const d = async() =>{await getData()};
        d();
    },[setData])

    
    return (
        <main>
        <div className="text-2xl">Cards</div>
        <div className="w-full h-full flex gap-10 justify-center mx-auto my-10 flex-wrap">
        {data.map((a : Card)=>{return <Card question={a.question} answer={a.answer} id={a.id} key={a.id}/>})}
        </div>
        </main>
    )

    function Card(props : {question: string, answer: string , id : number}) {
        return(
        <div id="cards" className="w-64 h-60 border-2 rounded-xl flex flex-col justify-center bg-slate-200 shadow-2xl shadow-gray-800 hover:shadow-gray-500 cursor-pointer"
            onClick={() => navigate("/flashcard?id=" + props.id)}>
            <p className="text-xl font-semibold font-sans text-slate-950 mt-5 underline underline-offset-4">Question</p>  
            <div className="flex flex-col justify-center h-full">
                <Text str={props.question}/>
            </div>
        </div>
        )
    }

    function Text(props : {str: string}) {
        return(
            <div className="text-lg font-sans font-medium text-slate-950">{props.str}</div>
        )
    }
}

