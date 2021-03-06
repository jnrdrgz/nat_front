import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ABMCuota.css"
import ErrorMsg from './ErrorMsg';

const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return { value, setValue, onChange };
};

const FormComponent = (props) => {
    const monto = useInput(0.0)
    const [errorMsg, setErrorMsg] = useState("")

    const [submitDisabled, setSubmitDisabled] = useState(false)
    
    const setErrorSetSubmit = (errorM, subm) => {
        setErrorMsg(errorM)
        setSubmitDisabled(subm)    
    }

    
    let history = useHistory()

    const goToConsulta = () => {
        history.push({ pathname: "/pedidos/cliente" });
    }


    const addCuota = (e) => {
        e.preventDefault();

        const payload = {
            "pedidoId": props.pedidoId,
            "monto": monto.value
        }
  
        console.log(payload)
        
        if(payload.monto == 0){
            setErrorMsg("El monto no puede ser 0")
            return;
        }

        if(props.maximo > monto.value && props.maximo != -1){
            api.put("/pedidos/cliente/pagarCuota", payload).then(r => {
                console.log(r.data)
                alert("cuota agregada")
                goToConsulta();
            }).catch(e => {
                console.log(e)
                setErrorMsg("Error en el servidor comuniquese con administrador")

            })
        } else {
            setErrorMsg("Error, el monto es mayor al total que falta pagar del pedido")
        }
  
    } 

    const _onSubmit = (e) => {
        setSubmitDisabled(true)
        switch (props.tipoOperacion) {
            case "ALTA":
                addCuota(e)
                break;
            case "MODIFICACION":
                //editarProducto(e)
                break;
            case "BAJA":
                //eliminarProducto(e)
                break;
            default:
                break;
        }
    }



    return (
        <div className="Fondo">
            <div className="FormularioCompleto">
                <div className="Titulo">
                    <h3>{props.tipoOperacion}</h3>
                </div>

                <ErrorMsg errorMsg={errorMsg}/>
                
                <form className="form" onSubmit={_onSubmit}>
                    <div className="Inputs">
                        <label>Monto: </label>
                        <input 
                        type="text" 
                        onChange={monto.onChange} 
                        value={monto.value}></input><br />
                    </div>
                    <div className="input-boton">
                        <button className="btn" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

const ABMCuota = (props) => {
    const location = useLocation();
    useEffect(() => {
        console.log("state", location.state);
    }, [location]);

    console.log(props)
    return (
        <FormComponent
            tipoOperacion={props.tipoOperacion}
            pedidoId={location.state ? location.state.pedidoId : {}}
            maximo={location.state ? location.state.maximoCuota : -1} />
    )
}

export default ABMCuota;