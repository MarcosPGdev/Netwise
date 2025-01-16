import { useState } from 'react';
import './actions.css'
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { createPost } from '../../api/post';
import { createProject, createDepartment} from '../../api/project';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobalState';
import { createCommunity, createEvent } from '../../api/community';

function Actions(){
    const {homeContent, selectedRoute} = useGlobalState();
    const { id } = useParams();
    const [modalState, setModalState] = useState('');

    const handlePostSubmit = async (values) => {
        try {
            let idContext = id ? id : null;
            let section = homeContent;
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('body', values.body);
            formData.append('imgSection', 'posts');
            formData.append('image', values.image);
            formData.append('idContext', idContext);
            formData.append('section', section);
            const data = await createPost(formData);
            console.log('Patch exitoso:', data);
            toast.success('¡Post creado correctamente!');
            //setComponentReseter(!componentReseter);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleProjectSubmit = async (values, section, idContext) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('imgSection', 'projects');
            formData.append('image', values.image);
            formData.append('state', values.state);
            formData.append('final_date', values.final_date);
            formData.append('idContext', idContext);
            formData.append('section', section);
            console.log(values);
            const data = await createProject(formData);
            console.log('Patch exitoso:', data);
            toast.success('¡Proyecto creado correctamente!');
            //setComponentReseter(!componentReseter);
        } catch (error) {
            console.log(error);
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const handleCommunitySubmit = async (values, section, idContext) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('imgSection', 'projects');
            formData.append('image', values.image);
            formData.append('state', values.state);
            formData.append('idContext', idContext);
            formData.append('section', section);
            const data = await createCommunity(formData);
            console.log('Patch exitoso:', data);
            toast.success('Comunidad creada correctamente!');
            //setComponentReseter(!componentReseter);
        } catch (error) {
            console.log(error);
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const handleDepartmentSubmit = async (values) => {
        try {
            values.projectId = id;
            const data = await createDepartment(values);
            console.log('Patch exitoso:', data);
            toast.success('¡Departamento creado correctamente!');
            //setComponentReseter(!componentReseter);
        } catch (error) {
            console.log(error);
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const handleEventSubmit = async (values, section, idContext) => {
        try {
            if(values.link == '' ||
                values.name == '' ||
                values.description == '' ||
                values.location == '' ||
                values.final_date == ''
            ){
                return toast.warning('Faltan datos por rellenar');
            }
            const formData = new FormData();
            formData.append('communityId', id);
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('imgSection', 'events');
            formData.append('image', values.image);
            formData.append('link', values.link);
            formData.append('state', values.state);
            formData.append('location', values.location);
            formData.append('beggining_date', values.beggining_date);
            formData.append('final_date', values.final_date);
            formData.append('idContext', idContext);
            formData.append('section', section);
            
            const data = await createEvent(formData);
            console.log('Patch exitoso:', data);
            toast.success('Evento creado correctamente!');
            //setComponentReseter(!componentReseter);
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
    }


    return(
        <div className='module actionModule'>
            <div className='headerAction'>
                <p>Acciones</p>
            </div>
            <div className='containerSelector'>
                {homeContent == 'projects' && 
                    <div className='actionSelector' onClick={() => {setModalState('departamento')}}>
                        <p><Icon style={{color:'rgb(var(--color-primary))'}} icon="fluent-emoji-high-contrast:plus" /> Crear departamento</p>
                    </div>
                }
                {homeContent == 'communities' && 
                    <div className='actionSelector' onClick={() => {setModalState('evento')}}>
                        <p><Icon style={{color:'rgb(var(--color-primary))'}} icon="fluent-emoji-high-contrast:plus" /> Crear evento</p>
                    </div>
                }
                <div className='actionSelector' onClick={() => {setModalState('publicacion')}}>
                    <p><Icon style={{color:'rgb(var(--color-primary))'}} icon="fluent-emoji-high-contrast:plus" /> Publicar</p>
                </div>
                <div className='actionSelector' onClick={() => {setModalState('comunidad')}}>
                    <p><Icon style={{color:'rgb(var(--color-primary))'}} icon="fluent-emoji-high-contrast:plus" /> Crear comunidad</p>
                </div>
                <div className='actionSelector' onClick={() => {setModalState('proyecto')}}>
                    <p><Icon style={{color:'rgb(var(--color-primary))'}} icon="fluent-emoji-high-contrast:plus" /> Crear proyecto</p>
                </div>
                {modalState == 'publicacion' && 
                    <div className='containerModal'>
                        <div className='modal'>
                            <div className='modalHeader'>
                                <h2>Publicar post</h2>
                                <button className='closeButton' onClick={() => {setModalState('')}}>
                                    <Icon icon="icomoon-free:cross" />
                                </button>
                            </div>
                            <Formik
                                initialValues={{title: '', body: '', image: ''}}
                                onSubmit={(values) => {
                                    handlePostSubmit(values);
                                }}
                            >
                            {({ setFieldValue, values }) => (
                                <Form className="modalForm" encType="multipart/form-data">
                                    <div className="containerInput">
                                        <label htmlFor="title">Título:</label>
                                        <Field name="title" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="body">Texto:</label>
                                        <Field name="body" as="textarea" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="image">Imagen:</label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue('image', file);
                                            }}
                                        />
                                        {values.image && (
                                            <div>
                                            <p>Vista previa:</p>
                                            <img
                                                src={URL.createObjectURL(values.image)}
                                                alt="Vista previa"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                            </div>
                                        )}
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
                {modalState == 'proyecto' && 
                    <div className='containerModal'>
                        <div className='modal'>
                            <div className='modalHeader'>
                                <h2>Crear proyecto</h2>
                                <button className='closeButton' onClick={() => {setModalState('')}}>
                                    <Icon icon="icomoon-free:cross" />
                                </button>
                            </div>
                            <Formik
                                initialValues={{name: '', description: '', image: '', state: '0', final_date: ''}}
                                onSubmit={(values) => {
                                    handleProjectSubmit(values, 'projects', null);
                                }}
                            >
                            {({ setFieldValue, values }) => (
                                <Form className="modalForm" encType="multipart/form-data">
                                    <div className="containerInput">
                                        <label htmlFor="name">Nombre:</label>
                                        <Field name="name" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="description">Descripción:</label>
                                        <Field name="description" as="textarea" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="state">Estado:</label>
                                        <Field name="state" as="select" type="text" className="loginInput">
                                            <option value="0">Público</option>
                                            <option value="1">Privado</option>
                                        </Field>
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="final_date">Fecha de finalización:</label>
                                        <Field name="final_date" type="date" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="image">Imágen:</label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue('image', file);
                                            }}
                                        />
                                        {values.image && (
                                            <div>
                                            <p>Vista previa:</p>
                                            <img
                                                src={URL.createObjectURL(values.image)}
                                                alt="Vista previa"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                            </div>
                                        )}
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

                {modalState == 'comunidad' && 
                    <div className='containerModal'>
                        <div className='modal'>
                            <div className='modalHeader'>
                                <h2>Crear comunidad</h2>
                                <button className='closeButton' onClick={() => {setModalState('')}}>
                                    <Icon icon="icomoon-free:cross" />
                                </button>
                            </div>
                            <Formik
                                initialValues={{name: '', description: '', image: '', state: '0', final_date: ''}}
                                onSubmit={(values) => {
                                    handleCommunitySubmit(values, 'communities', null);
                                }}
                            >
                            {({ setFieldValue, values }) => (
                                <Form className="modalForm" encType="multipart/form-data">
                                    <div className="containerInput">
                                        <label htmlFor="name">Nombre:</label>
                                        <Field name="name" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="description">Descripción:</label>
                                        <Field name="description" as="textarea" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="state">Estado:</label>
                                        <Field name="state" as="select" type="text" className="loginInput">
                                            <option value="0">Público</option>
                                            <option value="1">Privado</option>
                                        </Field>
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="image">Imágen:</label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue('image', file);
                                            }}
                                        />
                                        {values.image && (
                                            <div>
                                            <p>Vista previa:</p>
                                            <img
                                                src={URL.createObjectURL(values.image)}
                                                alt="Vista previa"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                            </div>
                                        )}
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

                {modalState == 'departamento' && 
                    <div className='containerModal'>
                        <div className='modal'>
                            <div className='modalHeader'>
                                <h2>Crear departamento</h2>
                                <button className='closeButton' onClick={() => {setModalState('')}}>
                                    <Icon icon="icomoon-free:cross" />
                                </button>
                            </div>
                            <Formik
                                initialValues={{name: '', description: ''}}
                                onSubmit={(values) => {
                                    handleDepartmentSubmit(values);
                                }}
                            >
                            {({ setFieldValue, values }) => (
                                <Form className="modalForm" encType="multipart/form-data">
                                    <div className="containerInput">
                                        <label htmlFor="name">Nombre:</label>
                                        <Field name="name" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="description">Descripción:</label>
                                        <Field name="description" as="textarea" type="text" className="loginInput" />
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

                {modalState == 'evento' && 
                    <div className='containerModal'>
                        <div className='modal'>
                            <div className='modalHeader'>
                                <h2>Crear evento</h2>
                                <button className='closeButton' onClick={() => {setModalState('')}}>
                                    <Icon icon="icomoon-free:cross" />
                                </button>
                            </div>
                            <Formik
                                initialValues={{name: '', description: '', image: '', link: '', state: '0', location:'', final_date: '', beggining_date:''}}
                                onSubmit={(values) => {
                                    handleEventSubmit(values, 'events', null);
                                }}
                            >
                            {({ setFieldValue, values }) => (
                                <div>
                                <Form className="modalForm" encType="multipart/form-data">
                                    <div className="containerInput">
                                        <label htmlFor="name">Nombre:</label>
                                        <Field name="name" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="description">Descripción:</label>
                                        <Field name="description" as="textarea" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="link">Link:</label>
                                        <Field name="link" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="location">Ubicación:</label>
                                        <Field name="location" type="text" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="state">Estado:</label>
                                        <Field name="state" as="select" type="text" className="loginInput">
                                            <option value="0">Público</option>
                                            <option value="1">Privado</option>
                                        </Field>
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="beggining_date">Fecha de inicio:</label>
                                        <Field name="beggining_date" type="date" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="final_date">Fecha de finalización:</label>
                                        <Field name="final_date" type="date" className="loginInput" />
                                    </div>
                                    <div className="containerInput">
                                        <label htmlFor="image">Imagen:</label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue('image', file);
                                            }}
                                        />
                                        {values.image && (
                                            <div>
                                            <p>Vista previa:</p>
                                            <img
                                                src={URL.createObjectURL(values.image)}
                                                alt="Vista previa"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                            </div>
                                        )}
                                    </div>
                                    <div className="formButtonContainer">
                                        <button className="button" type="submit">
                                            <span className="transition"></span>
                                            <span className="gradient"></span>
                                            <span className="label">Aceptar</span>
                                        </button>
                                    </div>
                                </Form>
                                </div>
                            )}
                            </Formik>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Actions;