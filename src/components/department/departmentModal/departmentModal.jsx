import { Icon } from '@iconify/react/dist/iconify.js';
import { Formik, Form, Field } from 'formik';
import './departmentModal.css'
import { useEffect, useState } from 'react';
import { createTask, fetchTasks } from '../../../api/project';
import { toast } from 'react-toastify';
import Task from '../../tasks/tasks';

function DepartmentModal({ departmentData, setShowModal }) {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        handleFetchTask();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmitTask = async () => {
        try{
            const data = await createTask({departmentId:departmentData.id, text:inputValue});
            toast.success(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }
    
    const handleFetchTask = async () => {
        try{
            const data = await fetchTasks(departmentData.id);
            setTasks(data.results);
            
            console.log('tasks');
            console.log(tasks);
            console.log(data.results);
        }catch(error){
            toast.error(error.message)
        }
    }

    return (
        <div className="containerModal">
            <div className="modal" style={{width:'80%', maxWidth:'1200px'}}>
                <div className="modalHeader">
                    <h2>{departmentData.name}</h2>
                    <button
                        className="closeButton"
                        onClick={handleCloseModal}
                    >
                        <Icon icon="icomoon-free:cross" />
                    </button>
                </div>
                <div className='departmentModalContent'>
                    <div className='tasksContainer'>
                        <h3>Tareas</h3>
                        <div className='taskContent'>
                            {tasks && tasks.map((task, index) => (
                                <Task taskId={task.id}/>
                                )) 
                            }
                        </div>
                        <div className='createTaskContainer'>
                            <input placeholder='crear tarea' className='loginInput' onChange={(e) => {setInputValue(e.target.value)}}></input>
                            <button className='button' onClick={handleSubmitTask}>Crear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepartmentModal;