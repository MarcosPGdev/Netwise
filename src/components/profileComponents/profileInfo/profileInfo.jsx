import { useState, useEffect } from 'react';
import './profileInfo.css'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Formik, Form, Field } from 'formik';
import { patchInfo, patchImg } from '../../../api/user/profile';
import WorkSelector from '../../selectors/workSelector';
import { toast } from 'react-toastify';

function ProfileInfo ({userInfo, componentReseter, setComponentReseter, accountPropietary}){
    const [infoModal, setInfoModal] = useState(0);
    const [selectedWork, setSelectedWork] = useState(null);
    const [preview, setPreview] = useState(userInfo.user_image);
    const [imgForSubmit, setImgForSubmit] = useState(null);
   
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setImgForSubmit(file);
        }
    };

    const handleImgSubmit = async (values, { resetForm }) => {
        if (!imgForSubmit) {
            toast.warning('Por favor, selecciona una imagen antes de enviar.');
            return;
        }

        const formData = new FormData();
        await formData.append('imgSection', 'profiles');
        await formData.append('image', imgForSubmit);
        try {
            const data = await patchImg(formData);
            toast.success('Imagen subida con éxito!');
            resetForm();
        } catch (error) {
            toast.error('Error al subir la imagen');
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if(selectedWork){
                console.log(selectedWork);
                values.work = selectedWork.value;
            }else{
                return toast.error("Trabajo sin especificar");
            }

            const data = await patchInfo(values);
            console.log('Patch exitoso:', data);
            toast.success('¡Credenciales actualizados correctamente!');
            setComponentReseter(!componentReseter);
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    return(
        <div className='module gridModuleInfo'>
            <div className='moduleInfoHeader'>
                <p className='moduleTitle'>Información del perfil</p>
                {accountPropietary &&
                    <button className='editButton' onClick={() => {setInfoModal(1)}}>
                        <Icon icon="fa6-solid:pencil" />
                    </button>
                }
            </div>
            <Formik
                initialValues={{ image: '' }}
                onSubmit={handleImgSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form className="profileImgContainer" encType="multipart/form-data">
                        <label className='profileImg' htmlFor={accountPropietary ? 'image' : undefined} style={{ cursor: 'pointer' }}>
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Icon icon="whh:profile" style={{ fontSize: '125px' }} />
                            )}
                        </label>
                        { accountPropietary &&
                            <Field
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                style={{display:'none'}}
                                onChange={(event) => handleFileChange(event, setFieldValue)}
                            />
                        }
                        {imgForSubmit && <button className='button' type='submit'>Subir imagen</button>}
                    </Form>
                )}
            </Formik>
            <p><span className='paragraphSection'>Usuario: </span> {userInfo.username}</p>
            <p><span className='paragraphSection'>Nombre: </span> {`${userInfo.name} ${userInfo.surname}`}</p>
            <p><span className='paragraphSection'>Profesión: </span> {userInfo.work ? userInfo.work : "Sin especificar"}</p>
            <p><span className='paragraphSection'>Biografía: </span> {userInfo.bio ? userInfo.bio : "Sin especificar"}</p>
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
                            initialValues={{username: userInfo.username, name: userInfo.name, surname: userInfo.surname, work: userInfo.work, bio: userInfo.bio}}
                            onSubmit={(values) => {
                                handleFormSubmit(values);
                            }}
                        >
                        {() => (
                            <Form className="modalForm">
                                <div className="containerInput">
                                    <label htmlFor="username">Usuario:</label>
                                    <Field name="username" type="text" className="loginInput" />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="name">Nombre:</label>
                                    <Field name="name" type="text" className="loginInput" />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="surname">Apellidos:</label>
                                    <Field name="surname" type="text" className="loginInput" />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="work">Profesión:</label>
                                    <WorkSelector onSelect={(work) => setSelectedWork(work)} />
                                </div>
                                <div className="containerInput">
                                    <label htmlFor="bio">Biografía:</label>
                                    <Field name="bio" as="textarea" type="text" className="loginInput" />
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

export default ProfileInfo;