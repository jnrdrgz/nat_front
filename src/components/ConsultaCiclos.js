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

             
    if(ciclos !== []){
        console.log("PATH", match.path)
        return (
            <div>Consulta:
                <button onClick={() => goToAgregarClick()}>Agregar</button>
                {ciclos.map(ciclo =>
                    <div key={ciclo.id}>
                        {ciclo.numero}
                        <button onClick={() => {}}>E</button>
                        <button onClick={() => {}}>X</button>
                        actual:{ciclo.actual ? "SI" : "NO"}
                        <button onClick={() => {handleSetActual(ciclo.id)}}>Set Actual</button>
                        
                    </div>
                    )}               
            </div>
   
        )
    }else{
        return (<div>loading...</div>)
    }
}
export default ConsultaCiclos;