import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ABMProducto.css"
import ErrorMsg from './ErrorMsg';
import { uploadImg } from "../utils";


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
    const [image, setImage] = useState("https://res.cloudinary.com/dy5tuirk1/image/upload/v1605068028/j9z0pfqs8zros1kh23do.jpg")


    const [errorMsg, setErrorMsg] = useState("")

    const [precio, setPrecio] = useState(0.0)
    const [precioCosto, setPrecioCosto] = useState(0.0)
    const precioOnChange = (e) => {

        const p = parseFloat(e.target.value)
        if (!isNaN(p)) {
            setPrecio(p)
            const perc = (p * 30.0) / 100.0
            setPrecioCosto(p - perc)
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
            setPrecioCosto(props.producto.precioCosto)
            codigo.setValue(props.producto.codigo)
            puntos.setValue(props.producto.puntos)
            stock.setValue(props.producto.stock)
            setImage(props.producto.foto)
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
        if (!producto.value) {
            setErrorMsg("Complete el campo descripcion")
            return;
        }
        if (precio == 0 || precio == 0.0) {
            setErrorMsg("El precio no puede ser 0")
            return;
        }

        const payload = {
            descripcion: producto.value,
            codigo: codigo.value,
            puntos: puntos.value,
            precio: precio,
            precioCosto: precioCosto,
            stock: stock.value,
            foto: image
        }

        console.log(payload)



        api.post("/productos/agregar", payload).then(r => {
            console.log(r.data)
            goToConsulta();
        }).catch(e => {
            console.log(e)
            if (e.response.data.msg) {
                setErrorMsg(e.response.data.msg)
            } else {
                setErrorMsg("Ocurrio un error en el servidor, comuniquese con el administrador")
            }
        })
    }

    const editarProducto = (e) => {
        e.preventDefault();
        const payload = {
            id: props.producto.id,
            descripcion: producto.value,
            codigo: codigo.value,
            puntos: puntos.value,
            precio: precio,
            precioCosto: precioCosto,
            stock: stock.value,
            foto: image
        }

        console.log("EDITAR", payload)

        api.put("/productos/editar", payload).then(r => {
            console.log(r.data)
            goToConsulta();
        }).catch(e => console.log(e))

    }

    const eliminarProducto = (e) => {
        e.preventDefault();
        console.log("prosp", props.producto.id)
        const payload = {
            id: props.producto.id
        }

        console.log("ELIMINAR", payload)

        api.put("/productos/eliminar", payload).then(r => {
            console.log(r.data)
            if (window.confirm(`producto ${props.producto.descripcion} eliminado`)) {    
                goToConsulta();
            } else {
                goToConsulta();
            }
            
            

        }).catch(e => console.log(e))
    }

    const _onSubmit = (e) => {
        e.preventDefault();
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

    const handleImgUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(await uploadImg(file));
        }

    }

    return (
        <div className="Fondo">

            <div className="FormularioCompleto">
                <div>
                    <ErrorMsg errorMsg={errorMsg} />
                </div>

                <div className="Titulo">
                    <h3>{props.tipoOperacion}</h3>
                </div>
                <form className="form" onSubmit={_onSubmit}>
                    <div className="Inputs">                  
                        <div className="InputsIz">
                            <label>Producto: </label><input type="text" onChange={producto.onChange} value={producto.value} readOnly={inputsReadOnly.value}></input><br />
                            <label>Precio: </label><input type="text" onChange={precioOnChange} value={precio} readOnly={inputsReadOnly.value}></input><br />
                            <label>Precio Costo: </label><input type="text" onChange={() => { }} value={precioCosto} readOnly></input><br />
                            <label>Codigo: </label><input type="text" onChange={codigo.onChange} value={codigo.value} readOnly={inputsReadOnly.value}></input><br />
                            <label>Puntos: </label><input type="text" onChange={puntos.onChange} value={puntos.value} readOnly={inputsReadOnly.value}></input><br />
                            <label>Stock: </label><input type="text" onChange={stock.onChange} value={stock.value} readOnly={inputsReadOnly.value}></input><br />
                        </div>
                        <div className="InputsDe">
                            <label>Imagen: </label>
                            <input
                                id="imgprod-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImgUpload}
                            />
                            <div className ="InputsDeImg">
                            <img src={image} width={image ? "200" : "0"} height={image ? "200" : "0"}></img>
                             </div>
                        </div>
                     
                    </div>
                    <div className="input-boton">
                        <button className="btn" type="submit">Registrar</button>
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