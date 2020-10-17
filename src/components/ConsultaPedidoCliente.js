import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router,  Switch, Route, Link, useHistory, useRouteMatch
  } from "react-router-dom"
import ABMPedidoCliente from './ABMPedidoCliente'

const PedidoDisp = (props) => {
    return (
        <div>
            total: ${props.pedido.total}
            {props.pedido.DetallePedidos.map(detalle =>{
                if(detalle.Producto){
                    return(
                        <div key={detalle.Producto.descripcion}>

                            {detalle.Producto.descripcion}<br />
                            precio unitario: ${detalle.Producto.precio} <br />
                            cantidad{detalle.cantidad}<br /> 
                            Subtotal: ${detalle.subtotal}

                        </div>)
                        }else {
                            return(<div>Sin productos</div>)
                        } } )
                }
        </div>
    )
}

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
            setPedidos(r.data.data)     
        })
        
    },[])

    const goToAgregarClick = () => {
        history.push({
            pathname: `${match.path}/agregar`
        });  
    }
    const marcameElMarco = {
        border: "2px solid red",
        width: "33%",
      }
             
      //faltarian filtros y/o buscador
    if(pedidos !== []){
        return (
            <div>
                <button onClick={() => goToAgregarClick()}>Agregar</button>
                Consulta:
                {pedidos.map(pedido =>
                <div style={marcameElMarco} key={pedido.id}>
                    pedido de {pedido.Cliente.nombre} <br />
                    <PedidoDisp pedido={pedido.Pedido}/>
                    entregado: {pedido.entregado ? "Si" : "No"} pagado: {pedido.pagado ? "Si" : "No"}
                    <br />
                    <button>Marcar Entregado</button>
                    <button>Marcar Pagado</button>
                    <button>Cancelar</button>
                </div>)}               
            </div>
   
        )
    }else{
        return (<div>loading...</div>)
    }
}
export default ConsultaPedidoCliente;