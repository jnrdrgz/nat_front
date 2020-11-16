import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router,  Switch, Route, Link, useHistory, useRouteMatch
  } from "react-router-dom"
  import "./css/ConsultaCiclos.css"
const ConsultaCiclos = () => {
    const [ciclos, setciclos] = useState([]);
    let history = useHistory()
    let match = useRouteMatch();
    const goToBalance = (c) => {
        history.push({
            pathname: `${match.path}/balance`,
            state: { cicloId: c}
        });  
    }

    const goToEditClick = (c) => {
        history.push({
            pathname: `${match.path}/editar`,
            state: { ciclo: c }
        });
    }

    const goToDeleteClick = (c) => {
        history.push({
            pathname: `${match.path}/eliminar`,
            state: { ciclo: c }
        });
    }

    const goToAgregarClick = () => {
        history.push({
            pathname: `${match.path}/agregar`
        });
    }

    useEffect( () =>{
        
        api.get("/ciclos").then(r => {
            console.log("data cicl", r.data)
            setciclos(r.data.data) 
            console.log("resp", r)
            
        })

    },[])

    const handleSetActual = (idCiclo) => {
        api.put("/ciclos/setActual", {id:idCiclo}).then(r => {
            alert(`Ciclo ${idCiclo} ahora es actual`)
            window.location.reload();
        }).catch(e => console.log(e))
    }

             
    if (ciclos !== []) {
        console.log("PATH", match.path)
        return (
            <div className="Ciclos">
                <div className="Agregar">
                    <button className="btn" onClick={() => goToAgregarClick()}>Agregar nuevo ciclo</button>
                    <div className="ComponentesBuscador">
                        <input type="text" name="txtBuscador" id="txtBuscador" />
                        <button className="btnb">Buscar</button>
                    </div>
                </div>
                {ciclos.map(ciclo =>
                    <div className="Ciclo" key={ciclo.id}>
                        <div className="Titulo">
                            <label className="NumeroCiclo">Ciclo: {ciclo.numero}</label>
                            <label className="NumeroCiclo">{ciclo.actual ? "Ciclo Actual" : "Ciclo Pasado"}</label>
                           </div>
                        <div className="Contenido">
                            <div className="Fechas">
                                <label className="FechaInicio">Inicio: {ciclo.fechaInicio.split("T")[0]}</label>
                                <label className="FechaFin">Fin: {ciclo.fechaFin.split("T")[0]}</label>
                            </div>
                            
                            <div className="btnes">
                                <button className="bt" onClick={() => {goToEditClick(ciclo) }}>Editar</button>
                                <button className="bt" onClick={() => {handleSetActual(ciclo.id)}}>Actual</button>
                                <button className="bt" onClick={() => { goToDeleteClick(ciclo)}}>Eliminar</button>
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>

        )
    } else {
        return (<div>loading...</div>)
    }
}
export default ConsultaCiclos;