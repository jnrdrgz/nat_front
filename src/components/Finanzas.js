import React, { useEffect, useState } from 'react'
import api from '../services/api';
import ConsultaBalance from './ConsultaBalance';

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

    return (<div>
        {cuotas.map(c =>{
            console.log(c)
            if(c.PedidoCliente){
                return(
                    <div>
                        Cuota de {c.PedidoCliente.Cliente.nombre}<br />
                        Fecha {c.fecha.split("T")[0]}<br />
                        ${c.monto}<br />
                        </div>
                )
            } else {
                return(
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
            <div>
                <button onClick={()=>{}}>Balance</button>
                <button onClick={()=>{setTipo("historial")}}>Cuotas</button>
                
                <ConsultaBalance />
            </div>
        )
    } else if(tipo === "historial"){
        return(
            <div>
                
                <button onClick={()=>{setTipo("balances")}}>Balance</button>
                <button onClick={()=>{}}>Cuotas</button>
                <HistorialCuotas />
            </div>
        )
    } else {
        return(
            <div> error</div>)
    }
}

export default Finanzas;