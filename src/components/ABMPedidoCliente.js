import React, { useEffect, useState, Fragment } from 'react'
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

const ProductoExistenteComponent = (props) => {
    return(
        <div>

        </div>
    )
}

const NuevoProductoComponent = (props) => {
    return(
        <div>
            <form>
                Producto: <input></input><br/>
                Precio: <input></input><br/>
                Codigo: <input></input>
                Puntos: <input></input><br/>
                Stock: <input ></input>
            </form>
        </div>
    )
}

const DetalleProducto = (props) => {
    return (
        <div>

        </div>
    )
}


const FormComponent = (props) => {
    
    const producto = useInput("")
    const inputsReadOnly = useInput(false)
    //foto
    
    const [productos, setProductos] = useState([]);
  

    //console.log("in form comp", props)
    
    let history = useHistory()

    const goToConsulta = () => {
        history.push({pathname: "/productos"});  
    }

    useEffect(()=>{
        console.log("USE EFFECT", "si")
        const setValuesToProps = () => {
            producto.setValue(props.producto.descripcion)
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

    const addPedido = (e) => {
        e.preventDefault();
        const payload = {
            descripcion: producto.value,
        }

        console.log(payload)

        api.post("/pedidos/cliente/agregar", payload).then(r => {
            console.log(r.data)
            goToConsulta();
        }).catch(e => console.log(e))
    }

    //fataria cuotas
    const marcarPagado = (e) => {
        e.preventDefault();
        const payload = {
            //id
            descripcion: producto.value,
        }

        console.log("EDITAR", payload)

        //api.put("/productos/editar", payload).then(r => {
        //    console.log(r.data)
        //}).catch(e => console.log(e))
    }

    const marcarEntregado = (e) => {
        e.preventDefault();
        const payload = {
            //id
        }

        console.log("EDITAR", payload)

        //api.put("/productos/editar", payload).then(r => {
        //    console.log(r.data)
        //}).catch(e => console.log(e))
    }


    const _onSubmit = (e) => {
        switch(props.tipoOperacion){
            case "ALTA":
                addPedido(e)
                break;
            case "MODIFICACION":
                //marcar como entregado o pagado
                break;
        }
    }

    return (
        <div>
            {props.tipoOperacion}
            <form onSubmit={_onSubmit}>
            Producto: <input onChange={producto.onChange} value={producto.value} readOnly={inputsReadOnly.value}></input><br/>
              <button type="submit">Submit</button>
            </form>
        </div>

    )

}

const ABMPedidoCliente = (props) => {
    const location = useLocation();
    const [inputFields, setInputFields] = useState([]);

    const [nuevo, setNuevo] = useState(false)
    

    useEffect(() => {
        console.log(location.state); // result: 'some_value'
     }, [location]);

     const handleAddFields = (nuevo) => {
        const values = [...inputFields];
        console.log("hanlde add file",nuevo)
        setNuevo(nuevo)
        if(nuevo){
            values.push({ 
                nuevo: nuevo,
                producto: "",
                precio: "",
                codigo: "",
                puntos: "",
                stock: "", 
            });
        } else {
            values.push({ 
                nuevo: nuevo,
                producto: "",
            });
        }
        setInputFields(values);
      };

      const marcameElMarco = {
        border: "2px solid red"
      }
    console.log(props)
    return (
      <div>
          <form onSubmit={()=>{}}>
          
          Pedido:
            <div>
                {inputFields.map((inputField, index) => {
                    if(inputField.nuevo){
                        return (<Fragment key={`asdf${index}`}>
                         <div style={marcameElMarco}>
                            Producto
                              <input name="producto" value={inputField.Producto} />
                        </div>
                        <br />
                        </Fragment>)
                    } else {
                        return(<div>existente</div>)
                    }
                })}
            </div>
          
          <button type="submit">Agregar </button>
          </form>
          <button onClick={() => {
                        handleAddFields(false)}}>existente</button>
            <button onClick={() => {
                        handleAddFields(true)}}>nuevo</button>


      </div>
    )
}
export default ABMPedidoCliente;