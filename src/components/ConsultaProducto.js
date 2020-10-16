import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router,  Switch, Route, Link, useHistory, useRouteMatch
  } from "react-router-dom"
  import ABMProducto from './ABMProducto'

  const ConsultaProducto = () => {
    const [productos, setProductos] = useState([]);

    let history = useHistory()
    let match = useRouteMatch();

    const goToEditClick = (p) => {
        history.push({
            pathname: `${match.path}/editar`,
            state: { producto: p}
        });  
    }

    const goToDeleteClick = (p) => {
        history.push({
            pathname: `${match.path}/eliminar`,
            state: { producto: p}
        });  
    }

    useEffect( () =>{
        //const res = () => 
        api.get("/productos").then(r => {
            console.log(r.data)
            setProductos(r.data.data)
                
        })
    },[])

             
    if(productos !== []){
        console.log("PATH", match.path)
        return (
            <div>Consulta:
                {productos.map(producto =>
                <div key={producto.id}>
                    {producto.descripcion}
                    <button onClick={() => goToEditClick(producto)}>E</button>
                    <button onClick={() => goToDeleteClick(producto)}>X</button>
                </div>)}               
            </div>
   
        )
    }else{
        return (<div>loading...</div>)
    }
}
export default ConsultaProducto;