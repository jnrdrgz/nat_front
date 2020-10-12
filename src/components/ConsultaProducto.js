import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Link, useHistory
  } from "react-router-dom"

const ConsultaProducto = () => {
    const [productos, setProductos] = useState([]);

    let history = useHistory()

    function goToEditClick(p) {
        history.push({
            pathname: "/editar",
            state: { producto: p}
        });  
    }

    function goToDeleteClick(p){
        history.push({
            pathname: "/eliminar",
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
        return (
            <div>Consulta:
                {productos.map(producto =>
                <div key={producto.descripcion}>
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