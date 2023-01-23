import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Busqueda = () => {

  //Crear estado(se guarda los array de objetos de los articulos de la BD )
  //articulos(estado principal, setArticulos(método para actualizar los articulos))
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  //cogemos valores
  const params = useParams();


  //Array de objetos
  useEffect(() => {
    console.log(params);
    conseguirArticulos();

  }, []);

   //Se ejecuta cuando params se modifica/vuelve a actualizar los articulos
   //vuelve hacer la petición AJAX y los vuelve a mostrar
   useEffect(() => {
    console.log(params);
    conseguirArticulos();

  }, [params]);


  const conseguirArticulos = async () => {

    //1 linea en la peticion Ajax
    const { datos, cargando } = await Peticion(Global.url + "buscar/" +params.busqueda, "GET");


    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }else{
      setArticulos([]);
    }

    setCargando(false);
  }

  return (
    <>
      {cargando ? "Cargando..." :

        articulos.length >= 1 ? 
        <Listado articulos={ articulos } setArticulos={ setArticulos } /> 
        : <h1>No hay Articulos</h1>
      
      }

    </>
  )
}