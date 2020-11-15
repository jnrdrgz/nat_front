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
    return (
        <div className="Dias">
            <h2>TIEMPO CICLO</h2>
            <div>
                <label>QUEDAN {dias.diasRestantes} DÍAS PARA QUE FINALICE EL CICLO</label>
                <label>Inicio {dias.fechaInicio}</label>
                <label>Fin {dias.fechaFin}</label>
            </div>
        </div>
    )
}

export default HomeDiasRestantes;