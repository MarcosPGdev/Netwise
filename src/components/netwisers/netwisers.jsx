import './netwisers.css'; 
import { useGlobalState } from '../../hooks/useGlobalState';
import { Icon } from '@iconify/react/dist/iconify.js';

function Netwisers ({netwisersData}){
    const { selectedRoute, setSelectedRoute, homeContent, setHomeContent } = useGlobalState();
    return(
        <div className='netwiserCard'>
            <div className='netwiserImgContainer'>
                {netwisersData.user_image ? (
                    <div className='netwiserImg' style={{backgroundImage:`url('${'http://mpgdev.es'+netwisersData.user_image}')`}}></div>
                ) : (
                    <div className='netwiserImg' style={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                        <Icon icon="tabler:photo" style={{fontSize: "5rem"}} />
                    </div>
                )
            }
            </div>
            <h4><strong>@{netwisersData.username}</strong></h4>
            <p>{netwisersData.work}</p>
            <button className='netwiserButton' onClick={() =>{ setSelectedRoute(`/profile/${netwisersData.id}`); setHomeContent(null)}}>
                VER PERFIL
            </button>
        </div>
    )
}


export default Netwisers