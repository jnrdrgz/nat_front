import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/Home.css"

const HomeDiasRestantes = (props) => {
    const [dias, setDias] = useState({})

    useEffect(() => {
        api.get("/ciclos/diasRestantes").then(r => {
            console.log("data cicl", r.data)
            setDias(r.data.data)
        })

    }, [])

    console.log(props)
    if(dias.fechaInicio){
        return (
            <div className="Dias">
                <h2>TIEMPO CICLO</h2>
                <div>
                    <label>QUEDAN {dias.diasRestantes} DÍAS PARA QUE FINALICE EL CICLO</label>
                    <label>Inicio {dias.fechaInicio.split("T")[0]}</label><br />
                    <label>Fin {dias.fechaFin.split("T")[0]}</label>
                </div>
            </div>
        )
    } else {
        return(<div>cargando...</div>)
    }
}

export default HomeDiasRestantes;