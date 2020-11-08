import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"

const HomeDiasRestantes = (props) => {
    const [dias, setDias] = useState({})

    useEffect( () =>{
        api.get("/ciclos/diasRestantes").then(r => {
            console.log("data cicl", r.data)
            setDias(r.data.data) 
        })

    },[])

    console.log(props)
    return (
        <div>
            
            <h2>TIEMPO CICLO</h2>
            QUEDAN {dias.diasRestantes} DÍAS PARA QUE FINALICE EL CICLO
            <br/>Inicio {dias.fechaInicio}    
            <br/>Fin {dias.fechaFin}
        </div>
    )
}

export default HomeDiasRestantes;