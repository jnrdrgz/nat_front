import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ConsultaBalanceCiclo.css"

const VerBalance = (props) => {
    const onMesChange = (props) = {
        
    }

    if(props.porMes){
        return(
            <div></div>
        )
    } else {
        return(
            <div></div>
        )

    }
}

const BalanceIntervalo = () => {
    const today = new Date()
    const [balance, setBalance] = useState({
        ingresos: 0.0,
        egresos: 0.0
    });
    
    const [hasta, setHasta] = useState("");
    const [desde, setDesde] = useState("");

    const location = useLocation();
    useEffect(() => {
        //http://localhost:3001/balances/intervalo?d=2020-10-20&h=2020-10-22
     }, []);


     const onDesdeChange = (e) => {
        e.preventDefault();
        
        console.log(e.target.value)
        console.log(typeof(e.target.value))
        setDesde(e.target.value)

        const url = `balances/intervalo?d=${e.target.value}&h=${hasta}`
        console.log("DESDE", desde)
        console.log(url)
        api.get(url)
        .then( r => {
                setBalance(r.data.data)
            }).catch(err => console.log(err))
     }
     const onHastaChange = (e) => {
        e.preventDefault();
        
        console.log(e.target.value)
        console.log(typeof(e.target.value))
        setHasta(e.target.value)
        
        const url = `balances/intervalo?d=${desde}&h=${e.target.value}`
        console.log("hasta", hasta)
        console.log(url)
        api.get(url)
        .then( r => {
                setBalance(r.data.data)
                }).catch(err => console.log(err))

        }   

        return (<div className="BalanceIntervalo">
        <div className="Intervalos">
            <label className="IntervaloD">Desde:</label> <input onChange={onDesdeChange} type="date" name="desde"></input>
            <label className="IntervaloH">Hasta:</label><input onChange={onHastaChange} type="date" name="hasta"></input>
        </div>
        <div className="DatosBalance">
            <label className="LabelIngresos">Ingresos: ${balance.ingresos.toFixed(2)}</label>
            <label className="LabelEgresos">Egresos: ${balance.egresos.toFixed(2)}</label>
        </div>
        <div className ="Total">
        <label className="LabelTotal">Total: ${(balance.ingresos - balance.egresos).toFixed(2)}</label>
        </div>
    </div>
    )
}

const ConsultaBalance = (props) => {
    const [tipo, setTipo] = useState("ciclo");
    
    if(tipo === "ciclo"){
        return (
            <div className="Ciclos-Intervalo">
                <button className="btnc" onClick={() => { }}>Ciclo</button>
                <button className="btnc" onClick={() => { setTipo("intervalo") }}>Intervalo</button>
            </div>


        )
    } else if(tipo === "intervalo"){
        return (
            <div>
                <div className="Ciclos-Intervalo">
                    <button className="btnc" onClick={() => { }}>Ciclo</button>
                    <button className="btnc" onClick={() => { setTipo("intervalo") }}>Intervalo</button>
                </div>
                <BalanceIntervalo />
            </div>
        )
    } else {
        return(
            <div> error</div>)
    }
}


export default ConsultaBalance;