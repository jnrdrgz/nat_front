import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/Home.css"

const HomeDeudores = (props) => {
    const [deudores, setDeudores] = useState([])

    useEffect(() => {

        api.get("/pedidos/cliente?onlyDeudores=1").then(r => {
            console.log("data d", r.data)
            setDeudores(r.data.data)
        })

        console.log(deudores)

    }, []);

    console.log(props)

    return (
        <div className ="Deudores">
            <h2>DEUDORES</h2>
            <div className ="Deudor">
                {deudores.map(pedido => {
                    if (parseInt(pedido.Pedido.total) !== 0) {
                        return (<div className ="ElDeudor" key={pedido.id}>
                            <label>{pedido.Cliente.nombre}: ${pedido.Pedido.total} Fecha: {pedido.Pedido.fecha.split("T")[0]}</label>
                        </div>
                        )
                    }
                }
                )}
            </div>
        </div>
    )
}

export default HomeDeudores;