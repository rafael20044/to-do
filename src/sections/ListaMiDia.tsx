import "../css/ListaMiDia.css";

function ListaMiDia() {
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
                    <div>
                        <p>tarea</p>
                        <button>Completar</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}


export default ListaMiDia;