import { useState, useEffect} from 'react';
import './department.css'
import DepartmentModal from './departmentModal/departmentModal';

function Department ({departmentData}) {
    const [showModal, setShowModal] = useState(false);
    console.log('Estado del modal:', showModal);
    return(
        <>
            <div className="module departmentContainer" style={{height:'fit-content', padding:'1rem'}} onClick={() => {setShowModal(true)}}>
                <h3>{departmentData.name}</h3>
                <p>{departmentData.description}</p>
            </div>
            {showModal && <DepartmentModal  departmentData={departmentData} setShowModal={setShowModal}/>}
        </>
    )
}

export default Department