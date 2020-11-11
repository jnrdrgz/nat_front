import React, { useEffect, useState, Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import api from "../services/api"
import "./css/ABMPedidoCliente.css"
import ErrorMsg from './ErrorMsg';


const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e) => {
        //console.log(e.target.value)
        setValue(e.target.value);
    }

    return { value, setValue, onChange };
};

const PedidoWP = (props) => {
    const [wpData, setWpData] = useState("")

    const makeApiCallWpPed = () => {
        const payload = { "pedido": wpData }

        api.post("pedidos/cliente/agregar/porwp", payload).then(r => {
            console.log("data WPPED", r.data)
            props.setDataPed(r.data.data.productos)

            //setciclos(r.data.data) 
            //console.log("resp", r)

        })

    }
    if (props.show) {
        return (<div className="PedidoWpp">
            <div className="Area">
                <textarea 
                    placeholder="Ingrese el pedido de whatsapp co nel siguiente formato: -> ''¡Hola! Te envío mi pedido de Ciclo 14B:

            3 unidad(es) - Código: 67597 -  Precio: $ 9.195,00  Eau de parfum femenino  viver
            4 unidad(es) - Código: 69615 -  Precio: $ 12.780,00  Eau de parfum femenino  rubí
            3 unidad(es) - Código: 93269 -  Precio: $ 7.905,00  Kaiak eau de parfum 
            1 unidad(es) - Código: 25213 -  Precio: $ 1.135,00  Regalo Naturé 
            
            
            Total = $31.015,00
            
            ¡Gracias!'''"
                    onChange={(e) => { setWpData(e.target.value) }}>
                </textarea >
            </div>
            <button className="bot" type="button" onClick={() => {
                makeApiCallWpPed()
            }}>Cargar Productos</button>

        </div>)
    } else {
        return (<div></div>)
    }
}

const ABMPedidoCliente = (props) => {
    const location = useLocation();
    const [inputFields, setInputFields] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cicloActualId, setCicloActualId] = useState("");

    const [nuevo, setNuevo] = useState(false)
    const [showPedidoWP, setShowPedidoWP] = useState(false)
    const [dataPedidoWP, setDataPedidoWP] = useState([])

    const nombreCliente = useInput("")
    const numeroCliente = useInput("")

    const [errorMsg, setErrorMsg] = useState("")

    const [deudores, setDeudores] = useState([])
    
    useEffect(() => {
        console.log(location.state)
        api.get("/productos").then(r => {
            console.log(r.data)
            setProductos(r.data.data)
        })
    
        api.get("/pedidos/cliente?onlyDeudores=1").then(r => {
            console.log("data deud", r.data)
            const d = r.data.data.map(p => p.Cliente)
            setDeudores(d) 
            console.log("deudores", d)

        })

        
        //TODO
        api.get("/ciclos/actual").then(r => {
            console.log("ciclo", r.data)

            if (!r.data.data.id) {
                alert("Adevertencia: no hay ciclo actual")
                return
            }
            setCicloActualId(r.data.data.id)
            console.log(r.data.data.id)
        }).catch(e => {
            alert("Adevertencia: no hay ciclo actual")
        })


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
            if (event.target.name === "stock") {
                values[index].stock = event.target.value;
            }
        } else {
            if (event.target.name === "cantidad") {
                values[index].cantidad = event.target.value
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
                CicloId: cicloActualId,
                DetallePedidos: []
            },
            Cliente: {
                nombre: nombreCliente.value,
                numeroTelefono: numeroCliente.value
            }
        }

        if(!payload.Cliente.nombre){
            setErrorMsg("Complete el campo nombre cliente")
            return;
        }
        if(!payload.Cliente.numeroTelefono){
            setErrorMsg("Complete el campo numero cliente")
            return;
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
                if(!x.descripcion) error = true
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
        }
        if(payload.Pedido.DetallePedidos.length === 0){
            setErrorMsg("No se han cargado productos")
            return;
        }


        payload.actualizarProductos = false
        
        const checkIfDeudor = () => {
            //const checkTelefono = d => d.numeroTelefono === payload.Cliente.numeroTelefono; 
            const estaTelefonoEnDeudores = !deudores.filter(d => d.numeroTelefono == payload.Cliente.numeroTelefono).length == 0  
            const estaNombreEnDeudores = !deudores.filter(d => d.nombre == payload.Cliente.nombre).length == 0

            console.log("nombres", payload.Cliente.nombre,payload.Cliente.numeroTelefono)
            console.log("bools", estaTelefonoEnDeudores, estaNombreEnDeudores)
            return estaTelefonoEnDeudores && estaNombreEnDeudores
        }

        if(checkIfDeudor()){ 
            console.log("DEDUDOR")
            if (!window.confirm("Esta por cargarle un pedido a un DEUDOR, ¿desea continuar?")) {
                alert("Pedido no cargado")
                return;
            } 
        }

        api.post("/pedidos/cliente/agregar", payload).then(r => {
            //console.log(r.data)
            //goToConsulta();
            alert("Pedido cargado")


        }).catch(e => {
            console.log(e)
            if (e.response.status === 300) {
                //let r = ;
                if (window.confirm("Se cargaron productos con codigos ya existentes, ¿Actualizar precio y stock?")) {
                    payload.actualizarProductos = true
                    api.post("/pedidos/cliente/agregar", payload)
                        .then(r_ => {
                            alert("Pedido cargado")
                        })
                        .catch(e => { })

                    } else {
                        alert("Pedido no cargado")
                    } 
                } 
            })
        
    }


    const delete_prod_by_index = (index) => {
        const values_slice = [...inputFields];
        values_slice.splice(index, 1)
        setInputFields(values_slice);
        console.log(inputFields)
    }

    const addWPToProds = (wpDataFromChild) => {
        setDataPedidoWP(wpDataFromChild)
        console.log("FROM CHILD", wpDataFromChild)
        const values = [...inputFields];

        wpDataFromChild.map(p => {
            values.push({
                nuevo: true,
                producto: p.descripcion,
                precio: p.precio,
                precioCosto: 0.0,
                codigo: p.codigo,
                puntos: p.puntos,
                stock: 0.0,
                cantidad: p.cantidad,
            })
        })

        setInputFields(values);


    }

    return (
        <div className="ABMPedidosClientes">
            <div>
                <ErrorMsg errorMsg={errorMsg}/>
            </div>
           
            <div className="DatosClientes">
                <div className="Cabecera">
                    <label>Datos Cliente</label>
                </div>
                <div className="NomTel">
                    <div className="Nombre">
                        <label>Nombre:</label><input type="text" name="nombreCliente"
                            value={nombreCliente.value}
                            onChange={nombreCliente.onChange} />
                    </div>
                    <div className="Telefono">
                        <label>Telefono:</label><input type="text" name="numeroCliente"
                            value={numeroCliente.value}
                            onChange={numeroCliente.onChange} />
                    </div>
                </div>
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
                        setShowPedidoWP(!showPedidoWP)
                    }}>Pedido WPP</button>
                    <button className="bot" type="button" onClick={() => {
                        handleAddFields(true)
                    }}>Producto Nuevo</button>

                </div>
                <PedidoWP show={showPedidoWP} setDataPed={addWPToProds} />

            </div>

            <form className="formulario" onSubmit={handleSubmit}>
                <div className="DatosPedidoCliente">
                    {inputFields.map((inputField, index) => {
                        if (inputField.nuevo) {
                            return (
                                <Fragment key={`asdf${index}`}>
                                    <div className="ProductoNuevo">
                                        <div className="Cabecera">
                                            <label>Producto Nuevo</label>
                                            <button className="btnDiscreto"
                                                type="button"
                                                onClick={() => delete_prod_by_index(index)}
                                            >X</button>

                                        </div>
                                        <div className="DatosProductoNuevo">
                                            <div className="DescProd">
                                                <label>Producto</label>
                                                <input type="text" name="producto"
                                                    value={inputField.producto}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="CantProd">
                                                <label>Cantidad</label>
                                                <input type="text" name="cantidad"
                                                    value={inputField.cantidad}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="CantProd">
                                                <label>Codigo</label>
                                                <input type="text" name="codigo"
                                                    value={inputField.codigo}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="PrecProd">
                                                <label>Precio</label>
                                                <input type="text" name="precio" value={inputField.precio}
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
                                                    value={inputField.stock}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </div>
                                            <div className="PuntProd">
                                                <label>Puntos</label>
                                                <input type="text" name="puntos"
                                                    value={inputField.puntos}
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
                                        <label> Producto Existente</label>
                                        <button className="btnDiscreto"
                                            type="button"
                                            onClick={() => delete_prod_by_index(index)}
                                        >X</button>
                                    </div>
                                    <div className="DatosProducto">
                                        <div className="DatosProductoDesc">
                                            <label className="ExistenteProducto">Producto:</label>
                                            <select name="producto"
                                                onChange={event => handleInputChange(index, event)}>

                                                {productos.map(
                                                    p => <option key={`${p.id}`} value={p.id}>{p.descripcion}</option>)}
                                            </select>
                                        </div>
                                        <div className="ExistenteCantidad">
                                            <label>Cantidad:</label>
                                            <input type="text" name="cantidad"
                                                value={inputField.Cantidad}
                                                onChange={event => handleInputChange(index, event)}
                                            />
                                        </div>
                                    </div>
                                </div>)
                        }
                    })}
                </div>
                <button className="botn" type="submit">Agregar</button>
            </form>
        </div>
    )
}
export default ABMPedidoCliente;