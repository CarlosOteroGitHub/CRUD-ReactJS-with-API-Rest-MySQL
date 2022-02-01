import React from "react";
import { Link  } from 'react-router-dom';
import Api from "../servicios/api";

class Editar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
          datosCargados:false,
          empleado:[]
      }
	}

  //Función que se invoca inmediatamente, la cual consulta los datos de un registro del Modelo Empleados por medio del ID del registro en la base de datos MySQL.
  componentDidMount(){
    console.log(this.props.match.params.id);
    fetch(Api+"?consultar="+this.props.match.params.id)
    .then(respuesta => respuesta.json())
    .then((datosRespuesta) =>{
      console.log(datosRespuesta);
      this.setState({
                datosCargados:true,
                empleado:datosRespuesta[0]
            })
    })
    .catch(console.log)
  }

  cambioValor = (e) =>{
    const state = this.state.empleado;
    state[e.target.name]=e.target.value;
    this.setState({empleado:state});
  }

  //Función que actualiza un registro del modelo Empleados en la base de datos MySQL.
  enviarDatos = (e) =>{
    e.preventDefault();

    const{id,nombre,nacimiento,correo,descripcion}=this.state.empleado;

    var datosEnviar = {id:id, nombre:nombre, nacimiento:nacimiento, correo:correo, descripcion:descripcion};

    fetch(Api+"?actualizar=1", {
      method:"POST",
      body:JSON.stringify(datosEnviar)
    })
    .then(respuesta => respuesta.json())
    .then((datosRespuesta) =>{
      console.log(datosRespuesta);
      this.props.history.push("/");
    })
    .catch(console.log)
  }

  //Proceso que muestra código en formato JSX para la visualización gráfica del formulario de actualización en el navegador web.
	render(){
    const {datosCargados, empleado}=this.state;

    if(!datosCargados){
      return(
        <div>Cargando...</div>
      );
    } else {
      return( 
        <div className="card">
          <div className="card-header">
            <h4>Editar Empleado</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.enviarDatos}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre*</label>
                  <input type="text" name="nombre" id="nombre" value={empleado.nombre} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="form-group">
                  <label htmlFor="nacimiento">Nacimiento*</label>
                  <input type="date" name="nacimiento" id="nacimiento" value={empleado.nacimiento} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="form-group">
                  <label htmlFor="correo">Correo Electrónico*</label>
                  <input type="email" name="correo" id="correo" value={empleado.correo} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción*</label>
                  <input type="text" name="descripcion" id="descripcion" value={empleado.descripcion} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <input type="hidden" name="id" id="id" readOnly value={empleado.id} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                <div className="btn-group" role="group" aria-label="">
                  <button type="submit" className="btn btn-primary">Editar</button>
                  <Link to={"/"} className="btn btn-danger">Cancelar</Link>
                </div>
            </form>
          </div>
        </div>
      );
    }
	}
}

export default Editar;