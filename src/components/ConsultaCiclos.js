import React, { useEffect, useState } from 'react'
import api from "../services/api"
import {
    BrowserRouter as Router,  Switch, Route, Link, useHistory, useRouteMatch
  } from "react-router-dom"

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

    useEffect( () =>{
        //const res = () => 
        //api.get("/ciclos").then(r => {
        //    console.log(r.data)
        //    setciclos(r.data.data) 
        //})

        setciclos(
            [{
                "id": "a63fab5c-549b-4eee-a181-1cc934b284e1",
                "fechaInicio": "2020-10-21T05:04:44.996Z",
                "fechaFin": "2020-10-21T05:04:44.996Z",
                "actual": false,
                "estaEliminado": false,
                "numero": "14A",
                "updatedAt": "2020-10-21T05:04:44.999Z",
                "createdAt": "2020-10-21T05:04:44.999Z"
            },
            {
                "id": "3fb2e242-aeea-448d-af18-95e419f3fdb2",
                "fechaInicio": "2020-10-21T05:04:44.996Z",
                "fechaFin": "2020-10-21T05:04:44.996Z",
                "actual": true,
                "estaEliminado": false,
                "numero": "14B",
                "updatedAt": "2020-10-21T05:04:44.999Z",
                "createdAt": "2020-10-21T05:04:44.999Z"
            }]
        )
    },[])

             
    if(ciclos !== []){
        console.log("PATH", match.path)
        return (
            <div>Consulta:
                <button onClick={() => {}}>Agregar</button>
                {ciclos.map(ciclo =>
                    <div key={ciclo.id}>
                        {ciclo.numero}
                        <button onClick={() => goToBalance(ciclo.id)}>Ver Balance</button>
                        <button onClick={() => {}}>E</button>
                        <button onClick={() => {}}>X</button>
                    </div>
                    )}               
            </div>
   
        )
    }else{
        return (<div>loading...</div>)
    }
}
export default ConsultaCiclos;