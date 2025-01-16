import './profileAbilities.css'
import AbilitySelector from '../../selectors/abilitiesSelector';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast } from 'react-toastify';
import { addAbility, deleteAbility } from '../../../api/user/profile';


function ProfileAbilities({userAbilities, componentReseter, setComponentReseter, accountPropietary}){
    console.log(userAbilities);
    const [abilitiesUsed, setAbilitiesUsed] = useState(userAbilities);
    const [selectedAbility, setSelectedAbility] = useState(null);
    console.log("accountPropietary");
    console.log(accountPropietary);
    useEffect(() => {
        setAbilitiesUsed(userAbilities);
    }, [userAbilities]);

    const hadleSubmitAbility = async () => {
        try{
            if(selectedAbility){
                const response = await addAbility(selectedAbility);
                setComponentReseter(!componentReseter);
                toast.success(response.message);
            }else{
                return toast.error('Por favor, seleccione una habilidad');
            }
        }catch (error) {
            toast.error(error.message);
        }
    }

    const handleDeleteAbility = async (value) => {
        try{
            const response = await deleteAbility(value);
            setComponentReseter(!componentReseter);
            toast.success(response.message);
        }catch (error) {
            toast.error(error.message);
        }
    }

    return(
        <div className='module gridModuleAbilities'>
            <p className='moduleTitle'>Habilidades</p>
            { accountPropietary &&
                <div className='selectContainer'>
                    <AbilitySelector onSelect={(ability) => setSelectedAbility(ability)}></AbilitySelector>
                    <button className='button' onClick={hadleSubmitAbility}>Guardar</button>
                </div>
            }
            <div className='abilitiesContainer'>
                {abilitiesUsed.length > 0 ? abilitiesUsed.map((ability) => (
                        <p key={ability.id}>
                            {ability.ability}
                            { accountPropietary &&
                            <button className='deleteButton' onClick={() => handleDeleteAbility(ability.id)}>
                                <Icon icon="icomoon-free:cross" />
                            </button>
                            }
                        </p>
                    )) : (
                        <div>No hay habilidades asignadas.</div>
                    )}
            </div>
        </div>
    )
}

export default ProfileAbilities;