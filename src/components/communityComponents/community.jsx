import './community.css'
import { useGlobalState } from '../../hooks/useGlobalState';
import { Icon } from '@iconify/react/dist/iconify.js';

function Community ({communityData, resetComponent, setResetComponent}){
    const {setSelectedRoute } = useGlobalState();
    return(
        <div className='communityContainer module' id={communityData.id} onClick={() =>{ setSelectedRoute(`/communities/${communityData.id}`)}} >
            {communityData.community_image ? (
                    <div className='communityImage' style={{backgroundImage:`url('${'http://mpgdev.es'+communityData.community_image}')`}}></div>
                ) : (
                    <div className='communityImage' style={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                        <Icon icon="tabler:photo" style={{fontSize: "5rem"}} />
                    </div>
                )
            }
            <div className='communityName'>
                <h2>{communityData.name}</h2>
                <p>{communityData.members} miembros</p>
            </div>
            <div className='communityDescription'>
                <p>{communityData.description}</p>
            </div>
        </div>
    )
}


export default Community;