import { useEffect, useState } from "react";
import "../css/ListaMiDia.css";
import axios from "axios";

interface DatosApi{
    id:number
    tarea:string
    fecha:Date
    importante:number
    terminada:number
}

function ListaMiDia() {
    const[datos, setDatos] = useState<DatosApi[]>([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/tarea/buscar/todos")
        .then(respuesta =>{
            setDatos(respuesta.data)
        })
        .catch(error =>{

        })
    },);

    return(
        <div className="contenedorLista">
            <div className="contenedorLista-input">
                <input type="text" name="tarea" placeholder="Ingrese una tarea" size={100}/>
                <div className="contenedorLista-input-div">
                    <button>Agregar</button>
                </div>
            </div>
            <ul>
                <li>
                    {
                        datos.map((dato, index)=>(
                            <div key={index}>
                                <p>fecha:{dato.fecha+""}</p>
                                <p>{dato.tarea}</p>
                                <button>Completar</button>
                            </div>
                        ))
                    }
                </li>
            </ul>
        </div>
    );
}


export default ListaMiDia;