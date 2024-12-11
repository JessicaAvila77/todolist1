
import 'bootstrap/dist/css/bootstrap.min.css'
import useTarea from '../hooks/useTareas';
import { useEffect,  useState } from "react";
import Swal from 'sweetalert2';  

const Tarea =() =>{ 

    
    const {getTareas, 
        
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

    } = useTarea()

    const [selectedIds, setSelectedIds] = useState([]);  

    // Al recargar la página recarga la info  
    useEffect(() => {  
        getTareas();  
    }, []);   

    // Manejo de la eliminación de proveedores seleccionados  
    const handleDeleteSelected = () => {  
        if (selectedIds.length === 0) {  
            Swal.fire({  
                title: 'Error',  
                text: 'No se han seleccionado tareas para eliminar.',  
                icon: 'error'  
            });  
            return;          
        }  

        // Mostrar alerta de confirmación  
        Swal.fire({  
            title: '¿Estás seguro?',  
            text: "No podrás recuperar las tareas eliminadas.",  
            icon: 'warning',  
            showCancelButton: true,  
            confirmButtonText: 'Sí, eliminar',  
            cancelButtonText: 'Cancelar'  
        }).then((result) => {  
            if (result.isConfirmed) {  
                deleteTareas(selectedIds); // Llama a la función para eliminar varios proveedores   
                setSelectedIds([]); // Resetea la selección después de eliminar  
            }  
        });  
    };  

    const handleSelect = (id) => {  
        setSelectedIds(prevSelected =>   
            prevSelected.includes(id)   
                ? prevSelected.filter(item => item !== id)   
                : [...prevSelected, id]  
        );  
    };  

    const handleSelectAll = (event) => {  
        if (event.target.checked) {  
            const allIds = tareas.map(proveedor => proveedor.id);  
            setSelectedIds(allIds);  
        } else {  
            setSelectedIds([]);  
        }  
    };  


//finalagregado

    return (
        




        <div className="container-fluir">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">


                        <h2 className="text-primary mb-3">To Do List</h2>
                        <h3 className="text-secondary mb-4">Grupo 2</h3>

                        
                        <button onClick={() => openModal(1)} className="btn btn-success" data-bs-toggle = "modal" data-bs-target="#modalTareas">
                            <i className="fa-solid fa-circle-plus">Agregar</i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr className="text-center">
                                <th>  
                                        <input   
                                            type="checkbox"   
                                            onChange={handleSelectAll}   
                                            checked={selectedIds.length === tareas.length && tareas.length > 0}  
                                        />  
                                    </th>  
                                    <th>Id</th>      
                                    <th>Tarea</th> 
                                    <th>Estado</th> 
                                    <th>Acciones</th>                            
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    tareas.map((tarea, i) =>(
                                        <tr key = {tarea.id}>  
                                            <td>  
                                                <input   
                                                    type="checkbox"   
                                                    checked={selectedIds.includes(tarea.id)}   
                                                    onChange={() => handleSelect(tarea.id)}   
                                                />  
                                            </td>

                                            <td>{i + 1}</td>
                                            <td>{tarea.nombreTarea}</td>
                                            <td>{tarea.estado}</td>
                                           
                                            <td>
                                                <button onClick={() => openModal(2, tarea.id, tarea.nombreTarea, tarea.estado)} className="btn btn-warning" data-bs-toggle = 'modal' data-bs-target = '#modalTareas'> <i className="fa-solid fa-edit"></i></button>

                                                <button onClick={() => deleteTarea(tarea.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                                                </button>                                           
                                            </td>
                                       </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="d-grid mt-3">  
                            <button className="btn btn-danger" onClick={handleDeleteSelected}>  
                                Eliminar Seleccionados  
                            </button>  
                        </div>  
                    </div>
                </div>
            </div>

            <div id="modalTareas" className="modal fade" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titleModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close"/>
                        </div>
                        <div className="modal-body">
                            <input type='hidden' id='id' />
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-clipboard" /></span>
                                <input type='text' id='nombreTarea' className="form-control" placeholder="Nombre de la tarea" value={nombreTarea} onChange={(e) => setNombreTarea(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-clipboard" /></span>
                                <select 
                                    id="estado" 
                                    className="form-control" 
                                    value={estado} 
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value="">Seleccionar estado</option>
                                    <option value="Por hacer">Por hacer</option>
                                    <option value="En progreso">En progreso</option>
                                    <option value="Finalizada">Finalizada</option>
                                </select>
                               
                            </div>
                           
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={() => validar()}>
                                <i className="fa-solid fa-floppy-disk" /> Guardar
                            </button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss='modal'>Cerrar</button>
                        </div> 
                    </div>                                          
                </div>
            </div>          
        </div>        
    );
}

export default Tarea
