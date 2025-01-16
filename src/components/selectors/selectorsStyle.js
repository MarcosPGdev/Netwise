const customStyles = {
    container: (provided) => ({
        ...provided,
        width: '77%',
        maxWidth: '77%',
    }),
    control: (base, state) => ({
        ...base,
        backgroundColor: 'rgb(var(--color-background))',
        border: 'none',
        padding: '10px',
        marginTop: '.3rem',
        borderRadius: '10px',
        outline: 'none',
        color: 'rgb(var(--color-black))',
        fontFamily: 'Montserrat',
        boxSizing: 'border-box',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: state.isFocused
            ? '-2px -2px 8px 1px rgb(var(--color-primary)), 2px 2px 8px 1px rgb(var(--color-secondary))'
            : 'none', // Controla el efecto de focus
        '&:hover': {
            backgroundColor: 'rgb(var(--color-light-blue))',
        },
        padding: '0.3rem',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#007bff' : 'white',
        color: state.isFocused ? 'white' : '#000',
        padding: '10px 15px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#0056b3',
            color: '#ffffff',
        },
    }),
    singleValue: (base) => ({
        ...base,
        color: 'rgb(var(--color-black))',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#999',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: '#007bff',
    }),
};

export default customStyles;
