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
            <div style={{
                    color: "#fff",
                    backgroundColor: "#4ed9b6",
                    textAlign:"center",
                    width:"100%",
                }}><h2>TIEMPO CICLO</h2></div>
            
        <div style={{backgroundColor: "#edebed"}}>
            QUEDAN {dias.diasRestantes} DÍAS PARA QUE FINALICE EL CICLO
            <br/>Inicio {dias.fechaInicio}    
            <br/>Fin {dias.fechaFin}
        </div>
        </div>
    )
}

export default HomeDiasRestantes;