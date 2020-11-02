import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch
} from "react-router-dom"
import ABMPedidoCliente from './ABMPedidoCliente'
import "./css/ConsultaPedidoCliente.css";

const PedidoDisp = (props) => {
    return (
        <div>
            TOTAL:  ${props.pedido.total}
            {props.pedido.DetallePedidos.map(detalle => {
                if (detalle.Producto) {
                    return (
                        <div key={detalle.Producto.descripcion}>

                            {detalle.Producto.descripcion}<br />
                            Precio unitario: ${detalle.Producto.precio} <br />
                            Cantidad: {detalle.cantidad}<br />
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

const ConsultaPedidoCliente = () => {
    const [pedidos, setPedidos] = useState([]);
    const [fUpdate, setfUpdate] = useState(false);

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

    useEffect(() => {
        //const res = () => 
        api.get("/pedidos/cliente").then(r => {
            console.log(r.data)
            setPedidos(r.data.data)
        })

    }, [])

    const goToAgregarClick = () => {
        history.push({
            pathname: `${match.path}/agregar`
        });
    }

    const marcarPedidoEntregado = (pId) => {
        const payload = {
            id: pId,
        }

        console.log(payload)

        api.put("/pedidos/cliente/entregado", payload).then(r => {
            console.log(r.data)
            alert("Entregado")
            //setfUpdate(!fUpdate)
            window.location.reload();
        }).catch(e => console.log(e))
    }

    const marcarPedidoPagado = (pId) => {
        const payload = {
            id: pId,
        }

        console.log(payload)

        api.put("/pedidos/cliente/pagado", payload).then(r => {
            console.log(r.data)
            alert("Pagado")
            //setfUpdate(!fUpdate)
            window.location.reload()
        }).catch(e => console.log(e))
    }

  //faltarian filtros y/o buscador
    if (pedidos !== []) {
        return (
            <div className="PedidosClientes">
                <div className="Agregar">
                    <button className="btn" onClick={() => goToAgregarClick()}>Agregar nuevo pedido</button>
                    <div className="ComponentesBuscador">
                        <input type="text" name="txtBuscador" id="txtBuscador" />
                        <button className="btnb">Buscar</button>
                    </div>
                </div>
                {pedidos.map(pedido =>
                    <div className="pedidoCliente" key={pedido.id}>
                        <div className="cabeceraPedido">
                            Pedido de {pedido.Cliente.nombre}
                        </div>
                        <PedidoDisp pedido={pedido.Pedido} />
                            Entregado: {pedido.entregado ? "Si" : "No"} -
                            Pagado: {pedido.pagado ? "Si" : "No"}
                        <br />
                        <div className="btnes">
                            <div className="bton">
                                <button className="bt" onClick={() => { marcarPedidoEntregado(pedido.id) }} >Marcar Entregado</button>
                            </div>
                            <div className="botns">
                                <button className="bt" onClick={() => { marcarPedidoPagado(pedido.id) }}>Marcar Pagado</button>
                                <button className="bt">Cancelar</button>
                            </div>
                        </div>
                    </div>)}
            </div>

        )
    } else {
        return (<div>loading...</div>)
    }
}
export default ConsultaPedidoCliente;