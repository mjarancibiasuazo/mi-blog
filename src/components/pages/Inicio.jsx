import React from 'react'
import { Link } from "react-router-dom"

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al Blog con React</h1>
      <p>Blog desarrollo con MERN Stack (Mongo, Express, React y NodeJS)</p>
      <Link to = "/articulos" className = 'button'>Ver los articulos</Link>
    </div>
    
  )
}
