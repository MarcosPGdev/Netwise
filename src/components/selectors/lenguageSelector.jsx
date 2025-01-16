import { useState } from 'react';
import Select from 'react-select';
import { getLenguage } from '../../api/user/profile';
import customStyles from './selectorsStyle';

const LenguageSelector = ({ onSelect }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchLenguages = async (input) => {
    try {
       const response = await getLenguage(input);
       const formattedOptions = response.map((lenguage) => ({
         value: lenguage.id,
         label: lenguage.lenguage,
       }));
       setOptions(formattedOptions);
    } catch (error) {
      console.error('Error al obtener trabajos:', error);
    }
  };

  const handleInputChange = (newInput) => {
    setInputValue(newInput);
    if (newInput.length > 0) {
      fetchLenguages(newInput);
    } else {
      setOptions([]);
    }
  };

  const handleChange = (selectedOption) => {
    onSelect(selectedOption);
  };

  return (
    <Select
      options={options}
      placeholder="Buscar idiomas"
      onChange={handleChange}
      onInputChange={handleInputChange} 
      inputValue={inputValue}
      styles={customStyles}
    />
  );
};

export default LenguageSelector;
