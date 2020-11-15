import React, { useEffect, useState } from 'react'
import api from '../services/api';
import ConsultaBalance from './ConsultaBalance';
import "./css/FinanzaCuotas.css"

const HistorialCuotas = (props) => {

    const [cuotas, setCuotas] = useState([]);
    const [filteredcuotas, setFilteredCuotas] = useState([]);
    useEffect(() => {
        api.get("/cuotas").then(r => {
            console.log(r.data)
            setCuotas(r.data.data)
            setFilteredCuotas(r.data.data)
        })
    }, [])

    return (<div className ="cuotas">
        {cuotas.map(c => {
            console.log(c)
            if (c.PedidoCliente) {
                return (
                    <div className="Cuota">
                        <div className="CuotaCabecera">
                            <label>Cuota de {c.PedidoCliente.Cliente.nombre}</label>
                        </div>
                        <div className="TituloGrilla">
                            <div className="ComponenteGrilla">
                                <label>Fecha</label>
                            </div>
                            <div className="ComponenteGrilla">
                                <label>Cuota</label>
                            </div>
                            <div className="ComponenteGrilla">
                                <label>Saldo Faltante</label>
                            </div>
                        </div>
                        <div className="ContenidoGrilla">
                            <div className="ComponenteGrilla">
                                <label>{c.fecha.split("T")[0]}</label>
                            </div>
                            <div className="ComponenteGrilla">
                                <label>${c.monto}</label>
                            </div>
                            <div className="ComponenteGrilla">
                                <label>${c.PedidoCliente.Pedido.total - c.monto}</label>
                            </div>
                           
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        Cuota de -- <br />
                        Fecha {c.fecha.split("T")[0]}<br />
                        {c.monto}<br />

                    </div>
                )
            }
        })}
    </div>)
}

const Finanzas = (props) => {
    const [tipo, setTipo] = useState("balances");
    if(tipo === "balances"){
        return(
            <div className="Balance-Cuotas">
                <div className =" botonesBC">
                <button  className="btnc" onClick={()=>{}}>Balance</button>
                <button  className="btnc" onClick={()=>{setTipo("historial")}}>Cuotas</button>
                </div>
                <ConsultaBalance />
            </div>
        )
    } else if(tipo === "historial"){
        return(
            <div className="Balance-Cuotas">
                <div className =" botonesBC">
                <button  className="btnc" onClick={()=>{setTipo("balances")}}>Balance</button>
                <button  className="btnc" onClick={()=>{}}>Cuotas</button>
               </div>
                <HistorialCuotas />
            </div>
        )
    } else {
        return (
            <div> error</div>)
    }
}

export default Finanzas;