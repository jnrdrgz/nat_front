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
        <div>
            <h2>DEUDORES</h2>
        {deudores.map(pedido =>
            {
                if(parseInt(pedido.Pedido.total) !== 0){
                    return (<div key={pedido.id}>
                            {pedido.Cliente.nombre}: ${pedido.Pedido.total} 
                        </div>
                    )
                }
            }
        )}
        </div>
    )
}

export default HomeDeudores;