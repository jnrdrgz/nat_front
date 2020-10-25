import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ABMProducto.css"


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
    const codigo = useInput("")
    const puntos = useInput("")
    const stock = useInput("")
    const inputsReadOnly = useInput(false)
    //foto

    const [precio, setPrecio] = useState(0.0)
    const [precioCosto, setPrecioCosto] = useState(0.0)
    const precioOnChange = (e) => {
        const p = parseFloat(e.target.value)
        if (!isNaN(p)) {
            setPrecio(p)
            const perc = (p * 30.0) / 100.0
            setPrecioCosto(p + perc)
        } else {
            setPrecio(0.0)
            setPrecioCosto(0.0)
        }
    }
    //console.log("in form comp", props)

    let history = useHistory()

    const goToConsulta = () => {
        history.push({ pathname: "/productos" });
    }

    useEffect(() => {
        console.log("USE EFFECT", "si")
        const setValuesToProps = () => {
            producto.setValue(props.producto.descripcion)
            setPrecio(props.producto.precio)
            codigo.setValue(props.producto.codigo)
            puntos.setValue(props.producto.puntos)
            stock.setValue(props.producto.stock)
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

    const addProducto = (e) => {
        e.preventDefault();
        const payload = {
            descripcion: producto.value,
            codigo: codigo.value,
            puntos: puntos.value,
            precio: precio,
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
        switch (props.tipoOperacion) {
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
        <div className="Fondo">
            <div className="FormularioCompleto">
            <div className="Titulo">
                <h3>{props.tipoOperacion}</h3>
            </div>
            <form onSubmit={_onSubmit}>
                <div className="Inputs">
                    <label>Producto: </label><input type="text" onChange={producto.onChange} value={producto.value} readOnly={inputsReadOnly.value}></input><br />
                    <label>Precio: </label><input type="text" onChange={precioOnChange} value={precio.value} readOnly={inputsReadOnly.value}></input><br />
                    <label>Codigo: </label><input type="text" onChange={codigo.onChange} value={codigo.value} readOnly={inputsReadOnly.value}></input><br />
                    <label>Puntos: </label><input type="text" onChange={puntos.onChange} value={puntos.value} readOnly={inputsReadOnly.value}></input><br />
                    <label>Stock: </label><input type="text" onChange={stock.onChange} value={stock.value} readOnly={inputsReadOnly.value}></input><br />

                    <div className="input-boton">
                        <button className="btn" type="submit">Registrar</button>
                    </div>
                </div>
            </form>
            </div>
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
            producto={location.state ? location.state.producto : {}} />
    )
}
export default ABMProducto;