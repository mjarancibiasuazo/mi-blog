import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export const Sidebar = () => {
  
  //Estado buscar
  const [ buscar, setBuscar ] = useState("");

  //useNavigate
  const navegar = useNavigate();

  //Método 
  const hacerBusqueda = (e) => {
    e.preventDefault();

    //Busqueda
    let mi_busqueda = e.target.search_field.value;

    navegar("/buscar/"+mi_busqueda, { replace: true });
   


  }



  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={ hacerBusqueda }>
          <input type="text" name="search_field" />
          <input type="submit" id="search" value="Buscar"/>
        </form>
      </div>

      {/*
      <div className="add">
        <h3 className="title">Añadir Pelicula</h3>
        <form>
          <input type="text" placeholder="Titulo" />
          <textarea placeholder="Descripción"></textarea>
          <input type="submit" value="Guardar"/>
        </form>
      </div>
  */}
    </aside>
  )
}
