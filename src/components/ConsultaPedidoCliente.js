import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router,  Switch, Route, Link, useHistory, useRouteMatch
  } from "react-router-dom"
import ABMPedidoCliente from './ABMPedidoCliente'

const ConsultaPedidoCliente = () => {
    const [pedidos, setPedidos] = useState([]);

    let history = useHistory()
    let match = useRouteMatch();

    //const goToEditClick = (p) => {
    //    history.push({
    //        pathname: `${match.path}/editar`,
    //        state: { pedido: p}
    //    });  
    //}

    //const goToDeleteClick = (p) => {
    //    history.push({
    //        pathname: `${match.path}/eliminar`,
    //        state: { pedido: p}
    //    });  
    //}

    useEffect( () =>{
        //const res = () => 
        api.get("/pedidos/cliente").then(r => {
            console.log(r.data)
            //setPedidos(r.data.data)     
        })
    },[])

             
    if(pedidos !== []){
        return (
            <div>Consulta:
                {pedidos.map(pedido =>
                <div key={pedido.id}>
                    
                </div>)}               
            </div>
   
        )
    }else{
        return (<div>loading...</div>)
    }
}
export default ConsultaPedidoCliente;