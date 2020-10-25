import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"

const BalanceCiclo = (props) => {
    const [balance, setBalance] = useState({});
    
    const location = useLocation();
    useEffect(() => {
        console.log(location.state);
         //const res = () => 
         console.log(location.state.cicloId)
         const cicloId = location.state.cicloId
        
        api.get(`/balances/ciclo/${cicloId}`).then(r => {
            console.log(r.data)
            setBalance(r.data.data)     
        })
     }, [location]);

     console.log(balance)
    if(balance !== {}){
        return(<div>
            Balance Ciclo<br />
            Ingresos: ${balance.ingresos}<br />
            Egresos: ${balance.egresos}
        </div>)
    } else {
        return(<div>cargando...</div>)
    }
}


export default BalanceCiclo;