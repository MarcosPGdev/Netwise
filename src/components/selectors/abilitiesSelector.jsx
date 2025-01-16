import { useState } from 'react';
import Select from 'react-select';
import { getAbilities } from '../../api/user/profile';
import customStyles from './selectorsStyle';

const AbilitySelector = ({ onSelect }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchAbilities = async (input) => {
    try {
       const response = await getAbilities(input);
       const formattedOptions = response.map((ability) => ({
         value: ability.id,
         label: ability.ability,
       }));
       setOptions(formattedOptions);
    } catch (error) {
      console.error('Error al obtener trabajos:', error);
    }
  };

  const handleInputChange = (newInput) => {
    setInputValue(newInput);
    if (newInput.length > 0) {
      fetchAbilities(newInput);
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
      placeholder="Buscar habilidades"
      onChange={handleChange}
      onInputChange={handleInputChange} 
      inputValue={inputValue}
      styles={customStyles}
    />
  );
};

export default AbilitySelector;
