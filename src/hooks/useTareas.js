import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import Tarea from "../components/Tarea";


const useTarea = () =>{
    const [tareas, setTareas] = useState([])
    const [id, setId] = useState('')
    const [nombreTarea, setNombreTarea] = useState('')
    const [estado, setEstado] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operacion, setOperacion] = useState(1)

    //listado de proveedores

    const getTareas = ()=>{
        const localStorageTareas = localStorage.getItem('TAREAS')
        const parseTareas = localStorageTareas ? JSON.parse(localStorageTareas):[]

        if (!Array.isArray(parseTareas)){
            setTareas([])

        }else{
            setTareas(parseTareas)
        }
    }

    const openModal = (operation, id, nombre, estado) =>{
        setId('')
        setNombreTarea('')
        setEstado('')
       

        if (operation === 1){
            setTitleModal('Registrar tarea')
            setOperacion(1)
        }else if (operation === 2){
            setTitleModal('Editar tarea')
            setOperacion(2)
            setId(id)
            setNombreTarea(nombre)
            setEstado(estado)
        }
    }

    const enviarSolicitud = (metodo, parametros = {}) => {
        const saveUpdateTarea = [...tareas]
        let mensaje 

        if (metodo === 'POST'){
            saveUpdateTarea.push({...parametros, id:Date.now()})
            mensaje = 'Tarea ingresada correctamente'
        }else if (metodo === 'PUT'){
            const Tareaindex = saveUpdateTarea.findIndex(tarea=> tarea.id == parametros.id)

            if (Tareaindex !== -1){//si encuentra un registro
                saveUpdateTarea[Tareaindex] = {...parametros}
                mensaje = 'Tarea actualizada correctamente'
            }
        }else if (metodo === 'DELETE'){
            const tareaArr = saveUpdateTarea.filter(tarea => tarea.id !== parametros.id)
            setTareas(tareaArr)
            localStorage.setItem('TAREAS', JSON.stringify(tareaArr))
            alertaSuccess('Tarea eliminada correctamente')
            return
        }

        localStorage.setItem('TAREAS', JSON.stringify(saveUpdateTarea)) //guardamos el del arreglo post y put
        setTareas(saveUpdateTarea)
        alertaSuccess(mensaje)
        document.getElementById('btnCerrarModal').click()

    }

    const validar = () => {
        let metodo = ''
        
        if (nombreTarea === ''){
            alertaWarning('Nombre de la tarea en blanco', 'nombre')
        }else if (estado === ''){
            alertaWarning('Estado de la tarea en blanco', 'estado')
        }else{
            let payload = {
                id: id || Date.now(),
                nombreTarea: nombreTarea,
                estado: estado
            }

            if (operacion === 1){
                metodo = 'POST'
            }else{
                metodo = 'PUT'
            }

            enviarSolicitud(metodo, payload)

        }

    }

    const deleteTareas = (ids) => {  
        Swal.fire({  
            title: '¿Está seguro que desea eliminar las tareas seleccionadas?',  
            icon: 'question',  
            text: 'NO habrá marcha atrás',  
            showCancelButton: true,  
            confirmButtonText: 'Sí, eliminar',  
            cancelButtonText: 'Cancelar'  
        }).then((result) => {  
            if (result.isConfirmed) {  
                const tareaArr = tareas.filter(tarea => !ids.includes(tarea.id));  
                setTareas(tareaArr);  
                localStorage.setItem('TAREAS', JSON.stringify(tareaArr));  
                alertaSuccess('Tareas eliminadas correctamente');  
            }  
        }).catch((error) => {  
            alertaError(error);  
        });  
    };  

    const deleteTarea = (id) => {
        Swal.fire({
            title:'Seguro que desea eliminar la tarea?',
            incon: 'question',
            text: 'NO habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed){
                enviarSolicitud('DELETE', {id})
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

   
    return {
        getTareas,
        openModal,
        validar,
        deleteTareas,
        deleteTarea,
        tareas,
        titleModal,
        nombreTarea,
        setNombreTarea,
        estado,
        setEstado

        
    }
}

export default useTarea

