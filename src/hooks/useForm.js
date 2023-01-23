import { useState } from "react";

export const useForm = (objetoInicial = {} ) => {
     
    //Estado
     const [ formulario, setFormulario ] = useState(objetoInicial);
  
     const serializarFormulario = (formulario) => {
 
         const formData = new FormData(formulario);
 
         const objetoCompleto = {};
 
         for(let [name, value] of formData){
             objetoCompleto[name] = value;
         }
 
         return objetoCompleto;
     }
 
     const enviado = (e) => {
         e.preventDefault();
     /*
         //Objeto
         let curso = {
             titulo: e.target.titulo.value,
             anio: e.target.anio.value,
             descripcion: e.target.descripcion.value,
             autor: e.target.autor.value,
             email: e.target.email.value
         };
 
         */
 
         let curso = serializarFormulario(e.target);
 
         //Asiganción al estado
         setFormulario(curso);

         document.querySelector(".codigo").classList.add("enviado");


     }


     const cambiado = ({ target }) => {
        const {name, value } = target;

        setFormulario({
            ...formulario,
            [name]: value
        });
     }


    return {
        formulario,
        enviado,
        cambiado
    }

}