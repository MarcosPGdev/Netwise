import { Icon } from '@iconify/react/dist/iconify.js';
import './experience.css'
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import WorkSelector from '../../../selectors/workSelector';
import { deleteExperience, updateExperience } from '../../../../api/user/profile';
import { toast } from 'react-toastify';

function formatDate(dateString) {
    const date = new Date(dateString); // Crear un objeto Date con el string
    const day = String(date.getUTCDate()).padStart(2, '0'); // Obtener el día y agregar ceros si es necesario
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Obtener el mes (sumar 1 porque es 0-indexado)
    const year = date.getUTCFullYear(); // Obtener el año
    return `${day}/${month}/${year}`; // Formatear como dd/mm/yyyy
}

function Experience ({experienceData, componentReseter, setComponentReseter}){
    console.log("experienceData");
    console.log(experienceData);
    const [editModal, setEditModal] = useState(0);
    const [selectedWork, setSelectedWork] = useState(null);
    const [finalDate, setFinalDate] = useState(false);

    const handleDeleteExperience = async () => {
        const data = await deleteExperience(experienceData.id);
        setComponentReseter(!componentReseter)
        toast.success(data.message);
    }

    const handleFormSubmit = async (values) => {
        values.experienceId = experienceData.id;
        if(selectedWork){
            values.work = selectedWork.value;
        }else{
            return toast.error("Trabajo sin especificar");
        }
        const data = await updateExperience(values);
        setComponentReseter(!componentReseter)
        toast.success(data.message);
    }

    return(
        <>
            <div className='experienceCard'>
                <div className='experienceHeader'>
                    <p className='nameCard'>{experienceData.name}</p>
                    <button className='experienceEditButton' style={{display:'flex', justifyContent:'center', alignItems:'center'}} onClick={() => {setEditModal(1)}}>
                        <Icon icon="fa6-solid:pencil" />
                    </button>
                    <button className='experienceEditButton' style={{display:'flex', justifyContent:'center', alignItems:'center'}} onClick={handleDeleteExperience}>
                        <Icon icon="bxs:trash" />
                    </button>
                </div>
                <p className='paragraphCard'>Tiempo: {formatDate(experienceData.start)} - {experienceData.ending ? (formatDate(experienceData.ending)) : ('Actualidad')}</p>
                <p className='paragraphCard'>Descripción: {experienceData.description}</p>
            </div>
            { editModal == 1 && 
                <div className='containerModal'>
                    <div className='modal'>
                        <div className='modalHeader'>
                            <h2>Editar información</h2>
                            <button className='closeButton' onClick={() => {setEditModal(0)}}>
                                <Icon icon="icomoon-free:cross" />
                            </button>
                        </div>
                        <Formik
                            initialValues={{name:experienceData.name, type: experienceData.type, description: experienceData.description, start: experienceData.start, ending: experienceData.ending}}
                            onSubmit={(values) => {
                                handleFormSubmit(values);
                            }}
                        >
                        {() => (
                            <Form className="modalForm">
                                <div className="containerInput">
                                    <label htmlFor="name">Nombre de la empresa:</label>
                                    <Field name="name" type="text" className="loginInput" />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="type">Tipo de trabajo:</label>
                                    <Field name="type" as="select" type="text" className="loginInput">
                                        <option value="Freelance">Freelance</option>
                                        <option value="Project">Proyecto</option>
                                        <option value="Work">Work</option>
                                    </Field>
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="work">Profesión:</label>
                                    <WorkSelector onSelect={(work) => setSelectedWork(work)} />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="description">Descripción:</label>
                                    <Field name="description" as="textarea" type="text" className="loginInput" />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="start">Fecha de inicio:</label>
                                    <Field name="start" type="date" className="loginInput" />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="ending"><input type='checkbox' checked={finalDate} onChange={() => {setFinalDate(!finalDate)}}/>Fecha de finalización:</label>
                                    {finalDate &&
                                        <Field name="ending" type="date" className="loginInput" />
                                    }
                                </div>
                                <div className="formButtonContainer">
                                    <button className="button" type="submit">
                                        <span className="transition"></span>
                                        <span className="gradient"></span>
                                        <span className="label">Aceptar</span>
                                    </button>
                                </div>
                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            }
        </>
    )
}

export default Experience;