import React from "react";
import { Link } from 'react-router-dom';
import Api from "../servicios/api";

class Crear extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nombre:"",
      nacimiento:"",
      correo:"",
      descripcion:""
    }
  }

  cambioValor = (e) =>{
    const state = this.state;
    state[e.target.name]=e.target.value;
    this.setState({state});
  }

  //Función que inserta un registro del modelo Empleados en la base de datos MySQL.
  enviarDatos = (e) =>{
    e.preventDefault();
    const{nombre,nacimiento,correo,descripcion}=this.state;

    var datosEnviar = {nombre:nombre, nacimiento:nacimiento, correo:correo, descripcion:descripcion};

    fetch(Api+"?insertar=1", {
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

  //Proceso que muestra código en formato JSX para la visualización gráfica del formulario de inserción en el navegador web.
  render(){
    const{nombre,nacimiento,correo,descripcion}=this.state;
    return( 
      <div className="card">
        <div className="card-header">
          <h4>Agregar Empleado</h4>
        </div>
        <div className="card-body">
            <form onSubmit={this.enviarDatos}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre*</label>
                  <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={nombre} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="form-group">
                  <label htmlFor="nacimiento">Nacimiento*</label>
                  <input type="date" name="nacimiento" id="nacimiento" value={nacimiento} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="form-group">
                  <label htmlFor="correo">Correo Electrónico*</label>
                  <input type="email" name="correo" id="correo" value={correo} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción*</label>
                  <input type="text" name="descripcion" id="descripcion" value={descripcion} onChange={this.cambioValor} className="form-control" aria-describedby="helpId"/>
                  <br></br>
                </div>
                <div className="btn-group" role="group" aria-label="">
                  <button type="submit" className="btn btn-success">Agregar</button>
                  <Link to={"/"} className="btn btn-danger">Cancelar</Link>
                </div>
            </form>
        </div>
      </div>
    );
  }
}

export default Crear;