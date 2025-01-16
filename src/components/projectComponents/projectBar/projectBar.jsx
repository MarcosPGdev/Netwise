import './ProjectBar.css'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import AbilitySelector from '../../selectors/abilitiesSelector';
import ProjectAbilities from '../projectAbilities/projectAbilities';
import { joinProject, leaveProject, checkUser } from '../../../api/project';
import { useParams } from 'react-router-dom';
import MessageComponent from '../../messages/messages';

function ProjectBar ({projectData, setDisplayContent}){
    const [loading, setLoading] = useState(false);
    const [resetComponent, setResetComponent] = useState(false);
    const [selectedSelector, setSelectedSelector] = useState('posts');
    const [userFlollowing, setUserFollowing] = useState(null);
    const [infoModalMessages, setInfoModalMessages] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        const handleCheckUser = async () => {
            try{
                const data = await checkUser(id);
                console.log(data);
                if(data.results){ 
                    setUserFollowing('following') 
                }else{
                    setUserFollowing('notFollowing')
                }
                console.log("userFlollowing")
                console.log(userFlollowing)
            }catch(error){
                console.log(error);
            }
        }
        handleCheckUser();
    }, [resetComponent]);

    const handleJoinProject = async (id) => {
        if (loading) return;
        setLoading(true);
        try {
            const join = await joinProject({projectId:id});
            console.log(join);
            setResetComponent(!resetComponent);
        } catch (err) {
            console.error("Error cambiando el estado de follow:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLeaveProject = async (id) => {
        if (loading) return;
        setLoading(true);
        try {
            const leave = await leaveProject(id);
            console.log(leave);
            setResetComponent(!resetComponent);
        } catch (err) {
            console.error("Error cambiando el estado de follow:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleContentSelector = (displayContent) => {
        setDisplayContent(displayContent);
        setSelectedSelector(displayContent);
    };

    return(
        <div className='module projectBarContainer'>
            <div className='projectContentContainer'>
                <div className='projectContent'>
                    <div className='projectData'>
                        <div className='projectNameDescription'>
                            <h3>{projectData.name}</h3>
                            <p style={{margin:'0px', fontSize:'.8rem'}}>{projectData.members} miembro/s</p>
                            <p>{projectData.description}</p>
                        </div>
                    </div>
                    <div className='projectData'>
                        <div className='projectAbilities'>
                            <ProjectAbilities projectAbilities={projectData.abilities} accountPropietary={projectData.accountPropietary} />
                        </div>
                    </div>
                    {projectData.project_image ? (
                            <div className='projectImgContainer' style={{backgroundImage:`url('${'http://mpgdev.es'+projectData.project_image}')`}}></div>
                        ) : (
                            <div className='projectImgContainer' style={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                                <Icon icon="tabler:photo" style={{fontSize: "5rem"}} />
                            </div>
                        )
                    }
                </div>
                <div className='selectorsContainer'>
                    <div className='projectSelectorContainer'>
                        <div onClick={() => {handleContentSelector('posts')}}  className={`projectSelector ${selectedSelector === 'posts' ? 'selectorSelected' : ''}`}>Publicaciones</div>
                        <div onClick={() => {handleContentSelector('departments')}}  className={`projectSelector ${selectedSelector === 'departments' ? 'selectorSelected' : ''}`}>Departamentos</div>
                        <div onClick={() => {handleContentSelector('netwisers')}}  className={`projectSelector ${selectedSelector === 'netwisers' ? 'selectorSelected' : ''}`}>Netwisers</div>
                    </div>
                    <div className='projectInteractionsContent'>
                        {!projectData.accountPropietary && userFlollowing == 'notFollowing'  && <button className='button' onClick={() => {handleJoinProject(projectData.id)}}>Seguir</button>}
                        {!projectData.accountPropietary && userFlollowing == 'following' && <button className='button' onClick={() => {handleLeaveProject(projectData.id)}}>Dejar de seguir</button>}
                        <button className='button' onClick={() => {setInfoModalMessages(true)}}>Mensajes</button>
                    </div>
                </div>
            </div>
            {infoModalMessages && 
                <MessageComponent setInfoModalMessages={setInfoModalMessages} section='project'/>
            }
        </div>
    )
}

export default ProjectBar;