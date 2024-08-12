import { useLocation } from "react-router-dom";
import { useMemo,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Cards";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Flashcard() {
    const [data, setData] = useState<Card>({question: "", answer: "", id: 0});
    const [flipped, setFlipped] = useState(true);
    const [auth , setAuth] = useState(false);
    const [next , setNext] = useState<number | null>(null);
    const [prev , setPrev] = useState<number | null>(null);
    const query = useQuery();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token") != null){
            setAuth(true);
        }
        const id = query.get("id");
        if(id === null || id === undefined){
            navigate("/cards");
        }
        async function getData() {
            const res = await fetch(import.meta.env.VITE_API_URL + "/flashcard/" + id);
            const r = await res.json();
            // console.log(r);
            if(r[0] === null || r[0] === undefined){
                navigate("/cards"); 
            }
            
            setData(r[0]);
            const res2 = await fetch(import.meta.env.VITE_API_URL + "/cardIds");
            const r2 = await res2.json();
            const ind = r2.indexOf(parseInt(id as string));
            // console.log(r2);
            // console.log(ind);
            if(ind+1 < r2.length){
                setNext(r2[ind + 1]); 
            }
            
            if(ind-1 >= 0){
                setPrev(r2[ind-1]);
            }

            return r;
        }
        
        const d = async() =>{await getData()};
        d();
    },[query , navigate])

    function onNext(){
        if(next === null){
            navigate("/cards");
            return;
        }else{
            setNext(next + 1)
            navigate("/flashcard?id=" + next);
        }
    }

    function onPrev(){
        if(prev === null){
            navigate("/cards");
            return;
        }else{
            setPrev(prev - 1)
            navigate("/flashcard?id=" + prev);
        }
    }
    
       
    return(
    <main className="flex flex-col items-center h-full">
        <div className="flex gap-10 mt-2 ">
            <button onClick={()=>{
                onPrev();
            }} className="p-3 bg-[#bbdfad] text-slate-950 font-semibold rounded-md w-fit mb-2">Previous</button>
            {auth ? <button onClick={()=>{
                navigate("/edit?id=" + data.id);
            }} className="p-3 bg-[#bbdfad] text-slate-950 font-semibold rounded-md w-fit mb-2">Edit</button> : ""}
            <button onClick={()=>{
                onNext();
            }} className="p-3 bg-[#bbdfad] text-slate-950 font-semibold rounded-md w-fit mb-2">Next</button>
        </div>
        <div id="cards" className="w-[300px] h-[450px] cursor-pointer rounded-xl bg-slate-200 shadow-2xl shadow-gray-800 hover:shadow-gray-500"
            onClick={() => setFlipped(!flipped)}>
            <p className="text-xl font-semibold font-sans text-slate-950 mt-5 underline underline-offset-4">{flipped ? "Question" : "Answer"}</p> 
            <div className="flex flex-col justify-center h-full">
                {flipped ? <Text str={data.question}/> : <Text str={data.answer}/>}
            </div>
        </div>
        <button className="p-3 mt-1 bg-[#bbdfad] text-slate-950 font-semibold rounded-md w-fit mb-2" onClick={()=>{navigate("/cards")}}>Go Back</button>
    </main>
    )
    function Text(props : {str: string}) {
        return(
        <div className="flex flex-col justify-center">
            <p className="text-lg font-sans font-medium text-slate-950 p-5 break-words">{props.str}</p>
        </div>
        )
    }
}