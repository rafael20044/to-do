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

    const cambiarEstado = (index:number)=>{
        if (datos[index].terminada == 0) {
            datos[index].terminada = 1;
            axios.put(`http://localhost:8080/api/tarea/updateEstado/${datos[index].id}`, datos[index])
            window.location.reload();
        }
    }

    const buscarDatos = ()=>{
        axios.get("http://localhost:8080/api/tarea/buscar/todos")
        .then(respuesta =>{
            setDatos(respuesta.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    useEffect(buscarDatos,[]);

    return(
        <div className="contenedorLista">
            <div className="contenedorLista-input">
                <input type="text" name="tarea" placeholder="Ingrese una tarea" size={100}/>
                <div className="contenedorLista-input-div">
                    <button>Agregar</button>
                </div>
            </div>
            <ul className="contenedorLista-lista">
                <li className="contenedorLista-lista-li">
                    {
                        datos.map((dato, index)=>(
                            <div key={index}>
                                <p>Fecha:{dato.fecha+""}, Tarea:{dato.tarea}, Estado:{dato.terminada == 0 ? "Incompleta":"Terminada"}</p>
                                <button onClick={()=>cambiarEstado(index)}>Completar</button>
                            </div>
                        ))
                    }
                </li>
            </ul>
        </div>
    );
}


export default ListaMiDia;