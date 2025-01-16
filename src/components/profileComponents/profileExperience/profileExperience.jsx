import './profileExperience.css'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Formik, Form, Field } from 'formik';
import WorkSelector from '../../selectors/workSelector';
import { toast } from 'react-toastify';
import { useEffect, useState, lazy, Suspense } from 'react';
import { addExperience } from '../../../api/user/profile';
import 'react-loading-skeleton/dist/skeleton.css';
const Experience = lazy(() => import('./experience/experience'));

function ProfileExperience({userInfo, componentReseter, setComponentReseter, accountPropietary}){
    const [infoModal, setInfoModal] = useState(0);
    const [selectedWork, setSelectedWork] = useState(null);
    const [finalDate, setFinalDate] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
            if(selectedWork){
                console.log(selectedWork);
                values.work = selectedWork.value;
            }else{
                return toast.error("Trabajo sin especificar");
            }

            const data = await addExperience(values);
            console.log('Patch exitoso:', data);
            toast.success('¡Credenciales actualizados correctamente!');
            setComponentReseter(!componentReseter);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return(
        <div className='module gridModuleExperience'>
            <div className='moduleInfoHeader'>
                <p className='moduleTitle'>Experiencia</p>
                {accountPropietary &&
                    <button className='editButton' style={{display:'flex', justifyContent:'center', alignItems:'center'}} onClick={() => {setInfoModal(1)}}>
                        <Icon style={{fontSize:'1.2rem'}} icon="fluent-emoji-high-contrast:plus" />
                    </button>
                }
            </div>
            <div className='experienceContainer'>
                {
                    userInfo.userExperience.map((data, index) => {
                        return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                    <Experience experienceData={data} componentReseter={componentReseter} setComponentReseter={setComponentReseter}/> 
                                </Suspense>
                    })
                }
            </div>
            { infoModal == 1 && 
                <div className='containerModal'>
                    <div className='modal'>
                        <div className='modalHeader'>
                            <h2>Editar información</h2>
                            <button className='closeButton' onClick={() => {setInfoModal(0)}}>
                                <Icon icon="icomoon-free:cross" />
                            </button>
                        </div>
                        <Formik
                            initialValues={{}}
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
        </div>
    )
}

export default ProfileExperience;