import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch
} from "react-router-dom"

import "./css/ConsultaPedidoProveedor.css"

const PedidoDisp = (props) => {
    return (
        <div className="PedidosProveedorh">
            <div className="TituloContenedor">
                {console.log(props.pedido)}
                <label>Total: ${props.pedido.total.toFixed(2)}</label>
            </div>
            <div className="PedidosProveedorhh" >
                {props.pedido.DetallePedidos.map(detalle => {
                    if (detalle.Producto) {
                        return (
                            <div className="PedidoProveedorh" key={detalle.Producto.descripcion}>
                                <label className="TituloProd">{detalle.Producto.descripcion}</label>
                                <label>Codigo: {detalle.Producto.codigo} </label>
                                <label>Precio unitario: ${detalle.Producto.precioCosto.toFixed(2)} </label>
                                <label>Cantidad{detalle.cantidad}</label>
                                <label>Subtotal: ${detalle.subtotal.toFixed(2)}</label>
                            </div>)
                    } else {
                        return (<div>Sin productos</div>)
                    }
                })

                }
            </div>
        </div>
    )
}

const ConsultaPedidoProveedor = () => {
    const [pedidos, setPedidos] = useState([]);

    let history = useHistory()
    let match = useRouteMatch();

    useEffect(() => {
        //const res = () => 
        api.get("/pedidos/proveedor").then(r => {
            console.log(r.data)
            setPedidos(r.data.data)
        })

    }, [])

    const goToAgregarClick = () => {
        history.push({
            pathname: `${match.path}/agregar`
        });
    }

    const marcarPedidoRecibido = (pId) => {
        const payload = {
            id: pId,
        }

        console.log(payload)

        api.put("/pedidos/proveedor/recibido", payload).then(r => {
            console.log(r.data)
            alert("recibido")
            //setfUpdate(!fUpdate)
            window.location.reload();
        }).catch(e => console.log(e))
    }

    //faltarian filtros y/o buscador
    if (pedidos !== []) {
        return (
            <div className="PedidosProveedor">
                <div className="Agregar">
                    <button className="btn" onClick={() => goToAgregarClick()}>Agregar nuevo pedido</button>
                    <div className="ComponentesBuscador">
                        <input type="text" name="txtBuscador" id="txtBuscador" />
                        <button className="btnb">Buscar</button>
                    </div>
                </div>
                {pedidos.map(pedido =>
                    <div className="pedidoProveedor" key={pedido.id}>
                        <PedidoDisp pedido={pedido.Pedido} />
                        <label>Ptos: {pedido.puntosTotales}</label>
                    
                        <div className="Bajo">                           
                            <div className="bton">
                                <button 
                                onClick={() => { marcarPedidoRecibido(pedido.id) }}
                                className= {pedido.pagado ? "BtDeshabilitado" : "bt"} >Recibido</button>
                            </div>
                            <label>Recibido: {pedido.recibido ? "SI" : "NO"}</label>
                        </div>
                    </div>)}
            </div>

        )
    } else {
        return (<div>loading...</div>)
    }
}
export default ConsultaPedidoProveedor;