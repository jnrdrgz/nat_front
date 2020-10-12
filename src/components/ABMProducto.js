import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"


const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
  
    const onChange = (e) => {
        //console.log(e.target.value)
        setValue(e.target.value);
    }
  
    return { value, setValue, onChange };
};

const FormComponent = (props) => {
    
    const producto = useInput("")
    const precio = useInput("")
    const codigo = useInput("")
    const puntos = useInput("")
    const stock = useInput("")
    const inputsReadOnly = useInput(false)
    //foto
    
    //console.log("in form comp", props)
    
    let history = useHistory()

    const goToConsulta = () => {
        history.push({pathname: "/productos"});  
    }

    useEffect(()=>{
        console.log("USE EFFECT", "si")
        const setValuesToProps = () => {
            producto.setValue(props.producto.descripcion)
            precio.setValue(props.producto.precio)
            codigo.setValue(props.producto.codigo)
            puntos.setValue(props.producto.puntos)
            stock.setValue(props.producto.stock)
        }
        switch(props.tipoOperacion){
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

    },[])

    const addProducto = (e) => {
        e.preventDefault();
        const payload = {
            descripcion: producto.value,
            codigo: codigo.value,
            puntos: puntos.value,
            precio: precio.value,
            stock: stock.value
        }

        console.log(payload)

        api.post("/productos/agregar", payload).then(r => {
            console.log(r.data)
            goToConsulta();
        }).catch(e => console.log(e))
    }

    const editarProducto = (e) => {
        e.preventDefault();
        const payload = {
            //id
            descripcion: producto.value,
            codigo: codigo.value,
            puntos: puntos.value,
            precio: precio.value,
            stock: stock.value
        }

        console.log("EDITAR", payload)

        //api.put("/productos/editar", payload).then(r => {
        //    console.log(r.data)
        //}).catch(e => console.log(e))
    }

    const eliminarProducto = (e) => {
        e.preventDefault();
        const payload = {
            //id
        }

        console.log("ELIMINAR", payload)

        //api.put("/productos/eliminar", payload).then(r => {
        //    console.log(r.data)
        //}).catch(e => console.log(e))
    }

    const _onSubmit = (e) => {
        switch(props.tipoOperacion){
            case "ALTA":
                addProducto(e)
                break;
            case "MODIFICACION":
                editarProducto(e)
                break;
            case "BAJA":
                eliminarProducto(e)
                break;
            default:
                break;
        }
    }

    return (
        <div>
            {props.tipoOperacion}
            <form onSubmit={_onSubmit}>
            Producto: <input onChange={producto.onChange} value={producto.value} readOnly={inputsReadOnly.value}></input><br/>
            Precio: <input onChange={precio.onChange} value={precio.value} readOnly={inputsReadOnly.value}></input><br/>
            Codigo: <input onChange={codigo.onChange} value={codigo.value} readOnly={inputsReadOnly.value}></input><br/>
            Puntos: <input onChange={puntos.onChange} value={puntos.value} readOnly={inputsReadOnly.value}></input><br/>
            Stock: <input onChange={stock.onChange}   value={stock.value}  readOnly={inputsReadOnly.value}></input><br/>
              <button type="submit">Submit</button>
            </form>
        </div>

    )

}

const ABMProducto = (props) => {
    const location = useLocation();
    useEffect(() => {
        console.log(location.state); // result: 'some_value'
     }, [location]);

    console.log(props)
    return (
        <FormComponent 
        tipoOperacion={props.tipoOperacion} 
        producto={location.state ? location.state.producto : {}}/>
    )

}
export default ABMProducto;