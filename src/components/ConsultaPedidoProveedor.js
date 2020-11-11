import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch
} from "react-router-dom"

import "./css/ConsultaPedidoProveedor.css"

const PedidoDisp = (props) => {
    return (
        <div>
            <b>Total: ${props.pedido.total}</b><br />
            {props.pedido.DetallePedidos.map(detalle => {
                if (detalle.Producto) {
                    return (
                        <div key={detalle.Producto.descripcion}>
                            {detalle.Producto.descripcion}<br />
                            codigo: {detalle.Producto.codigo} <br />
                            precio unitario: ${detalle.Producto.precio} <br />
                            cantidad{detalle.cantidad}<br />
                            Subtotal: ${detalle.subtotal}
                        </div>)
                } else {
                    return (<div>Sin productos</div>)
                }
            })
            }
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
                    Recibido: {pedido.recibido ? "SI" : "NO"}
                        <div className="bton">
                            <button className="bt" onClick={() => { marcarPedidoRecibido(pedido.id) }}>Marcar Recibido</button>
                        </div>
                    </div>)}
            </div>

        )
    } else {
        return (<div>loading...</div>)
    }
}
export default ConsultaPedidoProveedor;