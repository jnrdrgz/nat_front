import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch
} from "react-router-dom"
import ABMPedidoCliente from './ABMPedidoCliente'
import "./css/ConsultaPedidoCliente.css";


const format_fecha = (f) => {
    const d = new Date(f)
    return `${d.getDate()}/${d.getMonth() + 1}`
}


const PedidoDisp = (props) => {

    let history = useHistory();
    let match = useRouteMatch();

    console.log("PropsHere", props)
    return (
        <div className="DetallePedido">
            <div className="DetallePrincipal">
                <label>Total: ${props.pedido.total.toFixed(2)}</label>
                <label>Monto Saldado: ${props.saldado}</label>
            </div>
            <div className="BotonCuotaDetalle">
                <button className="btnCuota" type="button"
                    onClick={() => {
                        history.push({
                            pathname: `${match.path}/cuota`,
                            state: { pedidoId: props.id, 
                                maximoCuota: props.pedido.total-props.saldado}
                        });
                    }}
                >Agregar Cuota</button>
            </div>
            <div className="DetalleProductosPedido">
                {props.pedido.DetallePedidos.map(detalle => {
                    if (detalle.Producto) {
                        return (
                            <div className="DetalleProducto" key={detalle.Producto.descripcion}>
                                <label>{detalle.Producto.descripcion}</label>
                                <label>Precio unitario: ${detalle.Producto.precio.toFixed(2)}</label>
                                <label>Cantidad: {detalle.cantidad}</label>
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



const ConsultaPedidoCliente = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosCarrito, setPedidosCarrito] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [fUpdate, setfUpdate] = useState(false);
    const [busquedaQuery, setBusquedaQuery] = useState("");


    const [filtroPagados, setFiltroPagados] = useState(true);
    const [filtroCancelados, setFiltroCancelados] = useState(true);
    const [filtroEntregados, setFiltroEntregados] = useState(true);

    let history = useHistory()
    let match = useRouteMatch();

    const goToABMPedidoProveedor = (p) => {
        history.push({
            pathname: "/pedidos/proveedor/agregar",
            state: { carrito: p }
        });
    }

    const Carrito = (props) => {
        const [hiddenCart, setHiddenCart] = useState(true)

        return (
            <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
                <div style={{
                    backgroundColor: "#4ed9b6",
                }} hidden={hiddenCart}>
                    {props.pedidosCarrito.map(pedido =>
                        <div key={pedido.id}>
                            <div >
                                Pedido de {pedido.Cliente.nombre} {format_fecha(pedido.Pedido.fecha)}
                            </div>
                        </div>
                    )}
                    <button onClick={() => {
                        goToABMPedidoProveedor(pedidosCarrito)
                    }}>Crear Pedido Proveedor</button>
                </div>
                <div>

                    <img src="https://i.ibb.co/jyctx8s/Screenshot-2020-11-09-Revista-Natura-1.png" alt="" class="rounded-circle"
                        style={{
                            float: "right",
                            border: "none",
                        }}
                        onClick={() => { setHiddenCart(!hiddenCart) }}></img>
                </div>
            </div>
        )
    }

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
            setFilteredPedidos(r.data.data)
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

    const onBuscarClick = () => {
        const filt = (pedido) => {
            //console.log(pedido)
            //console.log("pagados", filtroPagados)
            //console.log("canclacdo", filtroCancelados)
            //console.log("entregados", filtroPagados)
            return pedido.Cliente.nombre.toLowerCase().includes(busquedaQuery)
                && pedido.entregado === filtroEntregados && pedido.pagado === filtroPagados
            //&& pedido.cancelado === filtroCancelados
        }
        setFilteredPedidos(pedidos.filter(filt))
    }

    const onBusquedaQueryChange = (e) => {
        console.log(e.target.value)
        setBusquedaQuery(e.target.value.toLowerCase());
    }

    const onFiltCheckChange = (e, checkb) => {
        switch (checkb) {
            case "entregados":
                setFiltroEntregados(e.target.checked)
                break;
            case "pagados":
                setFiltroPagados(e.target.checked)
                break;
            case "cancelados":
                setFiltroCancelados(e.target.checked)
                break;
        }
    }

    //faltarian filtros y/o buscador
    if (pedidos !== []) {
        return (<div>
            <div className="PedidosClientes">
                <div className="Agregar">
                    <button className="btn" onClick={() => goToAgregarClick()}>Agregar nuevo pedido</button>
                    <div>
                        <input onChange={(e) => { onFiltCheckChange(e, "entregados") }}
                            type="checkbox" id="entregadosCheck" name="entregadosCheck" checked={filtroEntregados}></input>
                        <label htmlFor="entregadosCheck"> Entregados</label><br />
                    </div>
                    <div>
                        <input onChange={(e) => { onFiltCheckChange(e, "pagados") }}
                            type="checkbox" id="pagadosCheck" name="pagadosCheck" checked={filtroPagados}></input>
                        <label htmlFor="pagadosCheck"> Pagados</label><br />
                    </div>
                    <div>
                        <input onChange={(e) => { onFiltCheckChange(e, "cancelados") }}
                            type="checkbox" id="canceladosCheck" name="canceladosCheck" checked={filtroCancelados}></input>
                        <label htmlFor="canceladosCheck"> Cancelados</label><br />
                    </div>

                    <div className="ComponentesBuscador">
                        <input
                            type="text"
                            name="txtBuscador"
                            id="txtBuscador"
                            onChange={onBusquedaQueryChange}
                        />

                        <button
                            className="btnb"
                            onClick={() => { onBuscarClick() }}
                        >Buscar</button>
                    </div>
                </div>
                {filteredPedidos.map(pedido =>
                    <div className="pedidoCliente" key={pedido.id}>
                        <div className="cabeceraPedido">
                            Pedido de {pedido.Cliente.nombre} {format_fecha(pedido.Pedido.fecha)}
                            <button className="btnDiscreto" type="button" onClick={(e) => {
                                e.preventDefault()
                                const pedidos_c = [...pedidosCarrito, pedido]
                                console.log(pedidos_c)

                                setPedidosCarrito(pedidos_c)
                            }}>+</button>
                        </div>

                        <PedidoDisp pedido={pedido.Pedido} saldado={pedido.montoSaldado} id={pedido.id} />
                        <div className="EntregadoPagado">
                            <label>Entregado: {pedido.entregado ? "Si" : "No"} </label>
                            <label>-</label>                                
                            <label>Pagado: {pedido.pagado ? "Si" : "No"} </label>
                        </div>
                        <div className="BotonesPedidoCliente">
                            <div className="btnesMarcar">
                                <button className="bt"
                                    onClick={() => { marcarPedidoEntregado(pedido.id) }}
                                    disabled={pedido.entregado} >
                                    Entregado</button>
                                <button className="bt"
                                    onClick={() => { marcarPedidoPagado(pedido.id) }}
                                    disabled={pedido.pagado}
                                >Pagado</button>
                            </div>
                            <div className="botnCancelar">
                                <button className="bt2">Cancelar</button>
                            </div>
                        </div>
                    </div>)}

            </div>
            <div>
                <Carrito pedidosCarrito={pedidosCarrito} />
            </div>
        </div>)
    } else {
        return (<div>loading...</div>)
    }
}
export default ConsultaPedidoCliente;