import './profileLenguages.css';
import LenguageSelector from '../../selectors/lenguageSelector';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast } from 'react-toastify';
import {addLenguage, deleteLenguage } from '../../../api/user/profile';

function ProfileLenguages({userLenguages, componentReseter, setComponentReseter, accountPropietary}){
    console.log(userLenguages);
    const [lenguagesUsed, setLenguagesUsed] = useState(userLenguages);
    const [selectedAbility, setSelectedAbility] = useState(null);

    useEffect(() => {
        setLenguagesUsed(userLenguages);
    }, [userLenguages]);

    const handleSubmitLenguage = async () => {
        try{
            if(selectedAbility){
                const response = await addLenguage(selectedAbility);
                setComponentReseter(!componentReseter);
                toast.success(response.message);
            }else{
                return toast.error('Por favor, seleccione un idioma');
            }
        }catch (error) {
            toast.error(error.message);
        }
    }

    const handleDeleteAbility = async (value) => {
        console.log(value);
        try{
            const response = await deleteLenguage(value);
            setComponentReseter(!componentReseter);
            toast.success(response.message);
        }catch (error) {
            toast.error(error.message);
        }
    }

    return(
        <div className='module gridModuleLenguages'>
            <p className='moduleTitle'>Idiomas</p>
            {accountPropietary &&
                <div className='selectContainer'>
                    <LenguageSelector onSelect={(lenguage) => setSelectedAbility(lenguage)}></LenguageSelector>
                    <button className='button' onClick={handleSubmitLenguage}>Guardar</button>
                </div>
            }
            <div className='lenguagesContainer'>
                {lenguagesUsed.length > 0 ? lenguagesUsed.map((lenguage) => (
                        <div key={lenguage.id}>
                            {lenguage.lenguage}
                            {accountPropietary &&
                                <button className='deleteButton' onClick={() => handleDeleteAbility(lenguage.id)}>
                                    <Icon icon="icomoon-free:cross" />
                                </button>
                            }
                        </div>
                    )) : (
                        <div>No hay habilidades asignadas.</div>
                    )}
            </div>
        </div>
    )
}

export default ProfileLenguages;