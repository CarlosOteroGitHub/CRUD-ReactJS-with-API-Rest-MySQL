import React from 'react';
import { Link } from 'react-router-dom';
import Api from "../servicios/api";

class Listar extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
            datosCargados:false,
            empleados:[]
		}
	}

    //Función que consulta todos los registros del modelo Empleados en la base de datos MySQL.
    cargarDatos(){
        fetch(Api)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            this.setState({datosCargados:true, empleados:datosRespuesta})
        })
        .catch(console.log)
    }

    //Función que se invoca inmediatamente, la cual ejecuta el método "cargarDatos"
    componentDidMount(){
        this.cargarDatos();
    }

    //Función que elimina un registro del modelo Empleados en la base de datos MySQL.
    borrarRegistro = (id) => {
        fetch(Api+"?borrar="+id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)
    }

    //Proceso que muestra código en formato JSX para la visualización gráfica de todos los registros del modelo Empleados en el navegador web.
    render(){
        const{datosCargados, empleados}=this.state;

        if(!datosCargados){
            return(
                <div>Cargando...</div>
            );
        } else {
            return(
                <div className="card">
                    <div className="card-header">
                        <h4>Lista de Empleados</h4>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Nacimiento</th>
                                    <th>Correo</th>
                                    <th>Descripción</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.map(
                                    (empleado) => (
                                        <tr>
                                            <td>{empleado.id}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.nacimiento}</td>
                                            <td>{empleado.correo}</td>
                                            <td>{empleado.descripcion}</td>
                                            <td><Link type="button" className="btn btn-primary" to={"/editar/"+empleado.id}>Editar</Link></td>
                                            <td><button type="button" className="btn btn-danger" onClick={()=>this.borrarRegistro(empleado.id)}>Eliminar</button></td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                        <Link type="button" className="btn btn-success" to={"/crear"}>Agregar Empleado</Link>
                    </div>
                </div>
            );
        }
    }
}

export default Listar;