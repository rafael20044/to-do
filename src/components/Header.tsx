import "../css/header.css";

function Header() {
    return(
        <div className="contenedor-div">
            <h1 className="contenedor-titulo">To do</h1>
            <input type="text" className="contenedor-input"/>
        </div>
    );
}

export default Header;