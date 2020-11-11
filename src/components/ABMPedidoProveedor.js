import React, { useEffect, useState, Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ABMPedidoCliente.css" //usamos lo mismo
import ErrorMsg from './ErrorMsg';


const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e) => {
        //console.log(e.target.value)
        setValue(e.target.value);
    }

    return { value, setValue, onChange };
};

const CicloSelect = (props) => {
    return (
        <div>
            <input type="checkbox" id="cicloActual" name="cicloActual"></input>
            <label for="cicloActual"> Ciclo Actual</label><br />
        </div>
    )
}

const ABMPedidoProveedor = (props) => {
    const location = useLocation();
    const [inputFields, setInputFields] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cicloActualId, setCicloActualId] = useState("");

    const [nuevo, setNuevo] = useState(false)

    const [loaded, setLoaded] = useState(false)

    const [errorMsg, setErrorMsg] = useState("")


    useEffect(() => {
        console.log(location.state)
        api.get("/productos").then(r => {
            console.log(r.data)
            setProductos(r.data.data)
        })

        //TODO
        api.get("/ciclos/actual").then(r => {
            setCicloActualId(r.data.data.id)
        }).catch( e =>{
            alert("Advertencia: no hay ciclo actual")
        })

        console.log()
        if(location.state){
            const values = []
            let index = 0
            location.state.carrito.map(ped => {
                ped.Pedido.DetallePedidos.map(p => {
                    values.push({
                        nuevo: false,
                        productoId: p.Producto.id,
                        cantidad: p.cantidad,
                    });
                    console.log("values; ", values)
                    index++;
                })
            })
            setInputFields(values);
            setLoaded(true);
        } else {
            setLoaded(true);
        }

        //setCicloActualId("a63fab5c-549b-4eee-a181-1cc934b284e1")

    }, [location]);

    const handleAddFields = (nuevo) => {
        const values = [...inputFields];
        console.log("hanlde add file", nuevo)
        setNuevo(nuevo)
        if (nuevo) {
            values.push({
                nuevo: nuevo,
                producto: "",
                precio: 0.0,
                precioCosto: 0.0,
                codigo: 0,
                puntos: 0,
                stock: 0.0,
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
        if (values[index].nuevo === true) {
            if (event.target.name === "producto") {
                values[index].producto = event.target.value;
            }
            if (event.target.name === "precio") {
                values[index].precio = event.target.value;
                const p = parseFloat(values[index].precio)
                const perc = (p * 30.0) / 100.0
                values[index].precioCosto = p - perc;
            }
            if (event.target.name === "precioCosto") {
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
                console.log("ppppp", values[index].productoId)
                //HACK
                if(!values[index].productoId){
                    values[index].productoId = productos[0].id    
                }
            }
            else {
                values[index].productoId = event.target.value;
            }
        }

        setInputFields(values);

    };

    console.log(inputFields)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("On form submit", inputFields)

        const payload = {
            Pedido: {
                total: 0.0,
                //CicloId: cicloActualId,
                DetallePedidos: []
            },
        }

        let error = false
        inputFields.forEach(x => {
            if (!x.nuevo) {
                if(!x.productoId) error = true
                if(x.cantidad==0) error = true
 
                payload.Pedido.DetallePedidos.push(
                    {
                        ProductoId: x.productoId,
                        cantidad: parseFloat(x.cantidad),
                    }
                )
            } else {
                if(!x.producto) error = true
                if(parseInt(x.codigo)==0) error = true

                payload.Pedido.DetallePedidos.push(
                    {
                        Producto: {
                            descripcion: x.producto,
                            puntos: parseFloat(x.puntos),
                            precio: parseFloat(x.precio),
                            precioCosto: parseFloat(x.precioCosto),
                            codigo: parseFloat(x.codigo),
                            stock: parseFloat(x.stock)
                        },
                        cantidad: parseFloat(x.cantidad),
                    }
                )
            }
        });

        if(error){
            setErrorMsg("Algun campo del pedido no ha sido cargado") 
            return
        }
        if(payload.Pedido.DetallePedidos.length === 0){
            setErrorMsg("No se han cargado productos")
            return;
        }


        api.post("/pedidos/proveedor/agregar", payload).then(r => {
            //console.log(r.data)
            //goToConsulta();
            alert("Pedido cargado")
        }).catch(e => console.log(e))
    }

    if(loaded){
    return (
        <div className="ABMPedidosClientes">
            <div>
                <ErrorMsg errorMsg={errorMsg}/>
            </div>

            <div className="Agregando">
                <div className="BotonesCabecera">
                    <label>Añadir producto al pedido</label>
                </div>
                <div className="Botones">
                    <button className="bot" type="button" onClick={() => {
                        handleAddFields(false)
                    }}>Producto Existente</button>
                    <button className="bot" type="button" onClick={() => {
                        handleAddFields(true)
                    }}>Producto Nuevo</button>


                </div>
            </div>


            <form className="formulario" onSubmit={handleSubmit}>
                <CicloSelect />
                <div className="DatosPedidoCliente">
                    {inputFields.map((inputField, index) => {
                        if (inputField.nuevo) {
                            return (
                                <Fragment key={`asdf${index}`}>
                                    <div className="ProductoNuevo">
                                        <div className="Cabecera">
                                            <label>Producto Nuevo</label>
                                        </div>
                                        <div className="DatosProductoNuevo">
                                            <div className="DescProd">
                                                <label>Producto</label>
                                                <input type="text" name="producto" value={inputField.Producto}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="CantProd">
                                                <label>Cantidad</label>
                                                <input type="text" name="cantidad"
                                                    value={inputField.Cantidad}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="CantProd">
                                                <label>Codigo</label>
                                                <input type="text" name="codigo"
                                                    value={inputField.Codigo}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                          
                                            <div className="PrecProd">
                                                <label>Precio</label>
                                                <input type="text" name="precio" value={inputField.Precio}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="PrecCostProd">
                                                <label>Precio Costo (30%)</label>
                                                <input type="text" name="precioCosto" value={inputField.precioCosto}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="StocProd">
                                                <label>Stock</label>
                                                <input type="text" name="stock"
                                                    value={inputField.Stock}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="PuntProd">
                                                <label>Puntos</label>
                                                <input type="text" name="puntos"
                                                    value={inputField.Puntos}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </Fragment>)
                        } else {
                            //add onchange to select igual que arriaba
                            return (
                                <div className="ProductoExistente" key={`asdf${index}`}>
                                    <div className="Cabecera">
                                        <label>Existente</label>
                                    </div>
                                    <div className="DatosProducto">
                                        <div className="DatosProductoDesc">
                                            <label className="ExistenteProducto">Producto:</label>
                                            <select name="producto"
                                                
                                                onChange={event => handleInputChange(index, event)}>

                                                {productos.map(
                                                    p => {
                                                        return(
                                                        <option 
                                                            selected={p.id===inputField.productoId}
                                                            key={`${p.id}`} value={p.id}>{p.descripcion}
                                                        </option>)})}
                                            </select>
                                        </div>
                                        <div className="ExistenteCantidad">
                                            <label>Cantidad:</label>
                                            <input type="text" name="cantidad"
                                                value={inputField.cantidad}
                                                onChange={event => handleInputChange(index, event)}
                                            />
                                        </div>
                                    </div>
                                </div>)
                        }
                    })}
                </div>
                <button className ="botn" type="submit">Agregar</button>
            </form>
        </div>
    )}else {
        return (
            <div className="ABMPedidosClientes">
                cargando...
                </div>)
        
    }

}
export default ABMPedidoProveedor;