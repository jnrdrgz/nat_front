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
 
const ABMPedidoCliente = (props) => {
    const location = useLocation();
    const [inputFields, setInputFields] = useState([]);
    const [productos, setProductos] = useState([]);

    const [nuevo, setNuevo] = useState(false)
    
    useEffect(() => {
        console.log(location.state)
        api.get("/productos").then(r => {
            console.log(r.data)
            setProductos(r.data.data)            
        })
    
     }, [location]);

     const handleAddFields = (nuevo) => {
        const values = [...inputFields];
        console.log("hanlde add file",nuevo)
        setNuevo(nuevo)
        if(nuevo){
            values.push({ 
                nuevo: nuevo,
                producto: "",
                precio:   0.0,
                codigo:   0,
                puntos:   0,
                stock:    0.0, 
                cantidad: 0,
            });
        } else {
            values.push({ 
                nuevo: nuevo,
                productoId: "", 
                cantidad: 0,
            });
        }
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if(values[index].nuevo === true){
            if (event.target.name === "producto") {
                values[index].producto = event.target.value;
            }
            if (event.target.name === "precio") {
                values[index].precio = event.target.value;
            }
            if (event.target.name === "codigo") {
                values[index].codigo = event.target.value;
            }    
            if (event.target.name === "puntos") {
                values[index].puntos = event.target.value    
            }
            if (event.target.name === "cantidad") {
                values[index].cantidad = event.target.value    
            } 
            else {
                values[index].stock = event.target.value;
            }
        } else {
            if (event.target.name === "cantidad") {
                values[index].cantidad = event.target.value    
            } 
            else {
                values[index].productoId = event.target.value;
            }
        }
    
        setInputFields(values);
        
      };

    const marcameElMarco = {
      border: "2px solid red",
      width: "33%",
    }
    const marcameElMarcoEx = {
        border: "2px solid blue",
        width: "33%",
      }
    console.log(inputFields)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("On form submit", inputFields)
        const payload = {
            Pedido:{
                total: 0.0,
                DetallePedidos: []
            },
            Cliente: {
                nombre: "mario jrez",
                numeroTelefono: "3815812095"
            } 
        }

        inputFields.forEach(x => {
            if(!x.nuevo){
                payload.Pedido.DetallePedidos.push(
                    {
                        ProductoId: x.productoId,
                        cantidad: parseFloat(x.cantidad),
                    }
                )
            }else{
                payload.Pedido.DetallePedidos.push(
                    {
                        Producto:{
                            descripcion: x.producto,
                            puntos: parseFloat(x.puntos),
                            precio: parseFloat(x.precio),
                            codigo: parseFloat(x.codigo),
                            stock: parseFloat(x.stock)
                        },
                        cantidad: parseFloat(x.cantidad),
                    }
                )
            }
        });

        api.post("/pedidos/cliente/agregar", payload).then(r => {
            //console.log(r.data)
            //goToConsulta();
        }).catch(e => console.log(e))
    }

    return (
      <div>
          <form onSubmit={handleSubmit}>
          
          Pedido:
            <div>
                {inputFields.map((inputField, index) => {
                    if(inputField.nuevo){
                        return (
                        <Fragment key={`asdf${index}`}>
                         <div style={marcameElMarco}>
                             Nuevo  <br />
                            
                            Producto
                              <input name="producto" value={inputField.Producto} 
                              onChange={event => handleInputChange(index, event)}
                              /><br />
                            Cantidad
                              <input name="cantidad" 
                              value={inputField.Cantidad} 
                              onChange={event => handleInputChange(index, event)}
                              /><br />
                            Precio
                              <input name="precio" value={inputField.Precio} 
                              onChange={event => handleInputChange(index, event)}
                              /><br />
                            Stock
                              <input name="stock" 
                              value={inputField.Stock} 
                              onChange={event => handleInputChange(index, event)}
                              /><br />
                           Ptos
                              <input name="puntos" 
                              value={inputField.Puntos} 
                              onChange={event => handleInputChange(index, event)}
                              />

                        </div>
                        <br />
                        </Fragment>)
                    } else {
                        //add onchange to select igual que arriaba
                        return(
                        <div style={marcameElMarcoEx} key={`asdf${index}`}>
                            existente <br />
                            Producto: 
                                <select name="producto"
                                onChange={event => handleInputChange(index, event)}>
                                    
                                    {productos.map(
                                        p => <option key={`${p.id}`} value={p.id}>{p.descripcion}</option>)}
                                </select>    
                            Cantidad
                              <input name="cantidad" 
                              value={inputField.Cantidad} 
                              onChange={event => handleInputChange(index, event)}
                              />
                        </div>)
                    }
                })}
            </div>
            <button  type="button" onClick={() => {
                        handleAddFields(false)}}>existente</button>
            <button type="button" onClick={() => {
                        handleAddFields(true)}}>nuevo</button>
            <br/>
            nombre cliente<input name="nombreCliente"  
                onChange={()=>{}}/>
            <br/>
            numero cliente<input name="numeroCliente"  
                onChange={()=>{}}/>
            <br/>

            <button type="submit">Agregar </button>
          </form>
      </div>
    )
}
export default ABMPedidoCliente;