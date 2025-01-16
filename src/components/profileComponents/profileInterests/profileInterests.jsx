import { useState } from 'react';
import './profileInterests.css'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Formik, Form, Field } from 'formik';
import { patchInterests } from '../../../api/user/profile';
import { toast } from 'react-toastify';


function ProfileInterests({userInfo, componentReseter, setComponentReseter, accountPropietary}){
    const [infoModal, setInfoModal] = useState(0);

    const handleFormSubmit = async (values) => {
        try {
            const data = await patchInterests(values);
            console.log('Patch exitoso:', data);
            toast.success('Intereses actualizados correctamente!');
            setComponentReseter(!componentReseter);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return(
        <div className='module gridModuleInterests'>
            <div className='moduleInfoHeader'>
                <p className='moduleTitle'>Intereses</p>
                {accountPropietary &&
                    <button className='editButton' onClick={() => {setInfoModal(1)}}>
                        <Icon icon="fa6-solid:pencil" />
                    </button>
                }
            </div>
            <p>{userInfo.interests ? (userInfo.interests) : ('Sin especificar')}</p>
            { infoModal == 1 && 
                <div className='containerModal'>
                    <div className='modal'>
                        <div className='modalHeader'>
                            <h2>Editar intereses</h2>
                            <button className='closeButton' onClick={() => {setInfoModal(0)}}>
                                <Icon icon="icomoon-free:cross" />
                            </button>
                        </div>
                        <Formik
                            initialValues={{interests: userInfo.interests}}
                            onSubmit={(values) => {
                                handleFormSubmit(values);
                            }}
                        >
                        {() => (
                            <Form className="modalForm">
                                <div className="containerInput">
                                    <label htmlFor="interests">Intereses:</label>
                                    <Field name="interests" as="textarea" type="text" className="loginInput"  style={{height:'200px'}}/>
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

export default ProfileInterests;