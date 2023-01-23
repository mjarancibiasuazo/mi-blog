import React from 'react'
import { useState, useEffect } from "react"
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Articulos = () => {

  //Crear estado(se guarda los array de objetos de los articulos de la BD )
  //articulos(estado principal, setArticulos(método para actualizar los articulos))
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);


  //Array de objetos
  useEffect(() => {
    conseguirArticulos();

  }, [])

  const conseguirArticulos = async () => {

    //1 linea en la peticion Ajax
    const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");


    if (datos.status === "success") {
      setArticulos(datos.articulos);
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