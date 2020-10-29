import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"

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

    return(<div>
        
            desde: <input onChange={onDesdeChange} type="date"  name="desde"></input>
            hast: <input onChange={onHastaChange} type="date" name="hasta"></input>
            <br />
            Ingresos: ${balance.ingresos}<br />
            Egresos: ${balance.egresos}<br />
        </div>
    )
}

const ConsultaBalance = (props) => {
    const [tipo, setTipo] = useState("ciclo");
    
    if(tipo === "ciclo"){
        return(
            <div>
                <button onClick={()=>{}}>Ciclo</button>
                <button onClick={()=>{setTipo("intervalo")}}>Intervalo</button>
                
                por ciclo
            </div>
        )
    } else if(tipo === "intervalo"){
        return(
            <div>
                
                <button onClick={()=>{setTipo("ciclo")}}>Ciclo</button>
                <button onClick={()=>{}}>Intervalo</button>
                <BalanceIntervalo />
            </div>
        )
    } else {
        return(
            <div> error</div>)
    }
}


export default ConsultaBalance;