import { useState } from 'react';
import Select from 'react-select';
import { getWorks } from '../../api/user/profile';
import customStyles from './selectorsStyle';

const WorkSelector = ({ onSelect }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchWorks = async (input) => {
    try {
      const response = await getWorks(input);
      const formattedOptions = response.map((work) => ({
        value: work.id,
        label: work.work,
      }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error('Error al obtener trabajos:', error);
    }
  };

  const handleInputChange = (newInput) => {
    setInputValue(newInput);
    if (newInput.length > 0) {
      fetchWorks(newInput);
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
      placeholder="Escribe para buscar trabajos"
      onChange={handleChange}
      onInputChange={handleInputChange} 
      inputValue={inputValue}
      styles={customStyles}
    />
  );
};

export default WorkSelector;
