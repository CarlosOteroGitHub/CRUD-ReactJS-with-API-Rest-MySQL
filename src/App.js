import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

//Declaración de los documentos del componente Empleado.
import Listar from './componentes/Listar';
import Crear from './componentes/Crear';
import Editar from './componentes/Editar';

//Proceso que muestra código en formato JSX para la visualización gráfica del encabezado en el navegador web.
function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>React</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-item nav-link active" to={"/"}>Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-item nav-link active" to={"/"}>Empleados</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Ruta de direccionamiento al documento "Listar" del componente Empleado */}
        <Route exact path="/" component={Listar} />

        {/* Ruta de direccionamiento al documento "Crear" del componente Empleado */}
        <Route path="/crear" component={Crear} />

        {/* Ruta de direccionamiento al documento "Editar" del componente Empleado */}
        <Route path="/editar/:id" component={Editar} />
      </div>
    </Router>
  );
}

export default App;