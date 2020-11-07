import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch
} from "react-router-dom"
import "./css/ConsultaProducto.css"



const ConsultaProducto = () => {

    const [productos, setProductos] = useState([]);

    let history = useHistory()
    let match = useRouteMatch();

    const goToEditClick = (p) => {
        history.push({
            pathname: `${match.path}/editar`,
            state: { producto: p }
        });
    }
    
    const goToDeleteClick = (p) => {
        history.push({
            pathname: `${match.path}/eliminar`,
            state: { producto: p }
        });
    }

    const goToAgregarClick = () => {
        history.push({
            pathname: `${match.path}/agregar`
        });
    }

    useEffect(() => {
        //const res = () => 
        api.get("/productos").then(r => {
            console.log(r.data)
            setProductos(r.data.data)
        })
    }, [])


    if (productos !== []) {


        return (
            <div className="Productos">
                <div className="Agregar">
                    <button className="btn" onClick={() => goToAgregarClick()}>Agregar nuevo producto</button>
                    <div className ="ComponentesBuscador">
                        <input type="text" name="txtBuscador" id="txtBuscador" />
                        <button className="btnb">Buscar</button>
                    </div>
                </div>
                {productos.map(producto =>
                    <div className="Producto" key={producto.id}>
                        <img src="https://placekitten.com/g/200/300" width="200" height="250"></img>
                        <p>{producto.descripcion}</p>
                        <div className="Cuerpo">
                            <label>Codigo: {producto.codigo}</label>
                            <label>Precio: ${producto.precio}</label>
                            <label>Stock: {producto.stock}</label>
                        </div>
                        <div className="Pie">
                            <button className="btn" onClick={() => goToEditClick(producto)}>Editar</button>
                            <button className="btn" onClick={() => goToDeleteClick(producto)}>Elimnar</button>

                        </div>

                    </div>)}
            </div>
        )
    } else {
        return (<div>loading...</div>)
    }
}
export default ConsultaProducto;