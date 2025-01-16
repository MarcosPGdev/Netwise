import './project.css'
import { useGlobalState } from '../../hooks/useGlobalState';
import { Icon } from '@iconify/react/dist/iconify.js';

function Project ({projectData, resetComponent, setResetComponent}){
    const {setSelectedRoute } = useGlobalState();
    return(
        <div className='projectContainer module' id={projectData.id} onClick={() =>{ setSelectedRoute(`/projects/${projectData.id}`)}} >
                {projectData.project_image ? (
                        <div className='projectImage' style={{backgroundImage:`url('${'http://mpgdev.es'+projectData.project_image}')`}}></div>
                    ) : (
                        <div className='projectImage' style={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                            <Icon icon="tabler:photo" style={{fontSize: "5rem"}} />
                        </div>
                    )
                }
            <div className='projectName'>
                <h2>{projectData.name}</h2>
                <p>{projectData.members} miembros</p>
            </div>
            <div className='projectDescription'>
                <p>{projectData.description}</p>
            </div>
        </div>
    )
}


export default Project;