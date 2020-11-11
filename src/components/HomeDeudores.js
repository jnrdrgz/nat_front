import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"

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
        <div style={{
            width:"100%",
    }}>
        <div style={{
                color: "#fff",
                backgroundColor: "#4ed9b6",
                textAlign:"center",
                width:"100%",

        }}><h2>DEUDORES</h2></div>
        <div style={{backgroundColor: "#edebed"}}>
        {deudores.map(pedido =>
            {
                if(parseInt(pedido.Pedido.total) !== 0){
                    return (<div key={pedido.id}>
                            {pedido.Cliente.nombre}: ${pedido.Pedido.total} Fecha: {pedido.Pedido.fecha.split("T")[0]} 
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