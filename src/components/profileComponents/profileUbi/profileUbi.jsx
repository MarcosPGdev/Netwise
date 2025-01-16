import './profileUbi.css'
import { useEffect, useState } from 'react';
import Select from "react-select";
import MapComponent from '../../maps/map';
import { patchUbi } from '../../../api/user/profile';
import { toast } from 'react-toastify';
import customStyles from '../../selectors/selectorsStyle';

const fetchLocations = async (query) => {
    console.log(query);
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=AIzaSyADYcElzhK4c_FjBZc6Jx_6cfm4sWwzJew`
    );
    const data = await response.json();
    console.log(data);
    return data.results.map((item) => ({
        label: item.formatted_address,
        value: item.geometry.location,
    }));
};

const filterOption = (option, inputValue) => {
    const label = option.label || '';
    return typeof label === 'string' && label.toLowerCase().includes(inputValue.toLowerCase());
};

function ProfileUbi({userUbi, accountPropietary}) {
    const [options, setOptions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(userUbi ? userUbi : null);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = async (input) => {
        setInputValue(input);
        if (input.length > 0) {
            try {
                const locations = await fetchLocations(input);
                setOptions(locations);
            } catch (error) {
                console.error("Error al buscar ubicaciones:", error);
            }
        } else {
            setOptions([]);
        }
    };

    const handleChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedLocation(selectedOption ? selectedOption.value : null);
    };

    const handleSubmitUbi = async (ubi) => {
        try{
            console.log("ubi");
            console.log(ubi);
            if(!ubi){
                return toast.error('No se ha seleccionado ninguna ubicación.');
            }
            const data = await patchUbi(ubi);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='module gridModuleUbi'>
            <p className='moduleTitle'>Localización</p>
            {accountPropietary &&
                <div className='selectContainer'>
                    <Select
                        placeholder="Escribe tu ubicación"
                        filterOption={filterOption}
                        options={options}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                        inputValue={inputValue}
                        styles={customStyles}
                    />
                    <button className='button' onClick={() => handleSubmitUbi(selectedLocation)}>Guardar</button>
                </div>
            }
            { selectedLocation ? (
                    <MapComponent location={selectedLocation} />
                ) : (
                    <div>Sin especificar</div>
                )
            }
        </div>
    );
}

export default ProfileUbi;
