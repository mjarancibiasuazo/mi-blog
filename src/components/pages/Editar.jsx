import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  //Array de objetos
  useEffect(() => {
    conseguirArticulo();

  }, [])


  const conseguirArticulo = async () => {

    //1 linea en la peticion Ajax
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");


    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }

  }


  const editarArticulo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = formulario;

    //Guardar articulo en el backend
    const { datos } = await Peticion(Global.url + "articulo/"+params.id, "PUT", nuevoArticulo);

    if (datos.status === "success") {

      setResultado("guardado");

    } else {

      setResultado("error");

    }

    //Subir imagen 
    const fileInput = document.querySelector("#file");


    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);
      console.log(subida.datos);


      if (subida.datos.status === "success") {
        setResultado("guardado");

      } else {
        setResultado("error");
      }

    }

  }

  return (
    <div className='jumbo'>
      <h1>Editar Articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>


      <strong>{resultado == "guardado" ? "Articulo guardado con exito !!!" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>


      {/*montar formulario*/}
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlForm="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} />

        </div>
        <div className='form-group'>
          <label htmlForm="contenido">Contenido</label>
          <textarea type="text" name="contenido" onChange={cambiado} defaultValue={articulo.contenido} />

        </div>
        <div className='form-group'>
          <label htmlForm="file0">Imagen</label>
          <div className="mascara">
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "default.png" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" />}
          </div>
          <input type="file" name="file0" id="file" />

        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />



      </form>

    </div>
  )
}

