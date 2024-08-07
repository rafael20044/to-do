import { useEffect, useState, type ChangeEvent } from "react";
import "../css/ListaMiDia.css";
import axios from "axios";
import { format } from "date-fns";

interface DatosApi{
    id?:number
    tarea:string
    fecha:string
    importante:number
    terminada:number
}

function ListaMiDia() {
    const[datos, setDatos] = useState<DatosApi[]>([]);
    const [tarea, setTarea] = useState<string>("");
    let fechaActual = new Date(); 
    let fechaActualF = format(fechaActual, "dd-MM-yyyy").toString;

    const cambiarEstado = (index:number)=>{
        if (datos[index].terminada == 0) {
            datos[index].terminada = 1;
            axios.put(`http://localhost:8080/api/tarea/updateEstado/${datos[index].id}`, datos[index])
            window.location.reload();
        }
    }

    const cambioInput = (e:ChangeEvent<HTMLInputElement>)=>{
        setTarea(e.target.value);
    }

    const enviar = ()=>{
        let fecha2 = new Date();
        let fechaFormat = format(fecha2,"dd-mm-yyyy");
        const datosEnviar:DatosApi = {
            tarea: tarea,
            fecha: fechaFormat,
            importante:0,
            terminada:0
        }
        console.log(datosEnviar.fecha);
        axios.post("http://localhost:8080/api/tarea/guardar", datosEnviar)
        .then(respuesta =>{
            console.log(respuesta)
        })
        alert("Tarea agregada: "+datosEnviar.tarea);
        window.location.reload();
    }

    const buscarDatos = ()=>{
        axios.get(`http://localhost:8080/api/tarea/buscar/todos`)
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
                <input type="text" name="tarea" placeholder="Ingrese una tarea" size={100} id="tarea" onChange={cambioInput}/>
                <div className="contenedorLista-input-div">
                    <button onClick={enviar}>Agregar</button>
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