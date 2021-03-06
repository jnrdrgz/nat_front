import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ABMCIclos.css"
import ErrorMsg from './ErrorMsg';


const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e) => {
        //console.log(e.target.value)
        setValue(e.target.value);
    }

    return { value, setValue, onChange };
};

const FormComponent = (props) => {

    const numero = useInput("")
    const actual = useInput(false)
    const fechaInicio = useInput("")
    const fechaFin = useInput(false)
    const inputsReadOnly = useInput(false)

    const [errorMsg, setErrorMsg] = useState("")
    const [submitDisabled, setSubmitDisabled] = useState(false)
    
    const setErrorSetSubmit = (errorM, subm) => {
        setErrorMsg(errorM)
        setSubmitDisabled(subm)    
    }


    let history = useHistory()

    const goToConsulta = () => {
        history.push({ pathname: "/ciclos" });
    }

    useEffect(() => {
        console.log("USE EFFECT", "si")
        const setValuesToProps = () => {
            numero.setValue(props.ciclo.numero)
            actual.setValue(props.ciclo.actual)
            fechaInicio.setValue(props.ciclo.fechaInicio)
            fechaFin.setValue(props.ciclo.fechaFin)
        }
        switch (props.tipoOperacion) {
            case "ALTA":
                break;
            case "MODIFICACION":
                setValuesToProps()
                break;
            case "BAJA":
                setValuesToProps()
                inputsReadOnly.setValue(true)
                //readOnly
                break;
            default:
                break;
        }

    }, [])

    const addCiclo = (e) => {
        e.preventDefault();
  
        
        const payload = {
            Ciclo: {
                numero: numero.value,
                actual: actual.value,
                fechaInicio: fechaInicio.value,
                fechaFin: fechaFin.value,
            }
        }
        
        if(!payload.Ciclo.numero){
            setErrorSetSubmit("Error algun campo no cargado", true)
            return
        }

        if(!payload.Ciclo.fechaInicio){
            setErrorSetSubmit("Error algun campo no cargado", true)
            return
        }

        if(!payload.Ciclo.fechaFin){
            setErrorSetSubmit("Error algun campo no cargado", true)
            return
        }

        console.log(payload)

        api.post("/ciclos/agregar", payload).then(r => {
            console.log(r.data)
            goToConsulta();
        }).catch(e => {
            console.log(e)
            setErrorSetSubmit("Error en el servidor comuniquese con administrador",true)
        })
    }

    const editarCiclo = (e) => {
        e.preventDefault();

        const payload = {
            id: props.ciclo.id,
            numero: numero.value,
            actual: actual.value,
            fechaInicio: fechaInicio.value,
            fechaFin: fechaFin.value,
        }
        

        console.log("EDITAR", payload)

        api.put("/ciclos/editar", payload).then(r => {
            console.log(r.data)
            goToConsulta()
        }).catch(e => {
            console.log(e)
            setErrorSetSubmit("Error en el servidor comuniquese con administrador")
        })
    }

    const eliminarCiclo = (e) => {
        e.preventDefault();
        console.log("prosp", props.ciclo.id)
        const payload = {
            id: props.ciclo.id
        }

        console.log("ELIMINAR", payload)

        api.put("/ciclos/eliminar", payload).then(r => {
            console.log(r.data)
            alert(`ciclo ${props.ciclo.numero} eliminado`)
            goToConsulta()
        }).catch(e => {
            console.log(e)
            setErrorSetSubmit("Error en el servidor comuniquese con administrador")
        })
    }

    const _onSubmit = (e) => {
        setSubmitDisabled(true)
        switch (props.tipoOperacion) {
            case "ALTA":
                addCiclo(e)
                break;
            case "MODIFICACION":
                editarCiclo(e)
                break;
            case "BAJA":
                eliminarCiclo(e)
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
            <form onSubmit={_onSubmit}>
                <div className="Inputs">
                    <label>Numero: </label><input type="text" onChange={numero.onChange} value={numero.value} readOnly={inputsReadOnly.value}></input><br />
                    {/*<label>Actual: </label><input type="text" onChange={precioOnChange} value={precio.value} readOnly={inputsReadOnly.value}></input><br />
                    */}
                    Inicio: <input onChange={ fechaInicio.onChange} type="date"  name="fechaInicio" value={ fechaInicio.value}></input>
                    Fin: <input onChange={fechaFin.onChange} type="date" name="fechaFin" value={ fechaFin.value}></input>
                    <div className="input-boton">
                        <button className="btn" type="submit" disabled={submitDisabled}>Registrar</button>
                    </div>
                </div>
            </form>
            </div>
        </div>

    )

}

const ABMCiclos = (props) => {
    const location = useLocation();
    useEffect(() => {
        console.log(location.state); // result: 'some_value'
    }, [location]);

    console.log(props)
    return (
        <FormComponent
            tipoOperacion={props.tipoOperacion}
            ciclo={location.state ? location.state.ciclo : {}} />
    )
}
export default ABMCiclos;