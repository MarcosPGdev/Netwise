import './communityBar.css'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import AbilitySelector from '../../selectors/abilitiesSelector';
import CommunityAbilities from '../communityAbilities/communityAbilities';
import { joinCommunity, leaveCommunity, checkUser } from '../../../api/community';
import { useParams } from 'react-router-dom';
import MessageComponent from '../../messages/messages';

function CommunityBar ({communityData, setDisplayContent}){
    const [loading, setLoading] = useState(false);
    const [resetComponent, setResetComponent] = useState(false);
    const [selectedSelector, setSelectedSelector] = useState('posts');
    const [userFlollowing, setUserFollowing] = useState(null)
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

    const handleJoinCommunity = async (id) => {
        if (loading) return;
        setLoading(true);
        try {
            const join = await joinCommunity({communityId:id});
            console.log(join);
            setResetComponent(!resetComponent);
        } catch (err) {
            console.error("Error cambiando el estado de follow:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLeaveCommunity = async (id) => {
        if (loading) return;
        setLoading(true);
        try {
            const leave = await leaveCommunity(id);
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
        <div className='module communityBarContainer'>
            <div className='communityContentContainer'>
                <div className='communityContent'>
                    <div className='communityData'>
                        <div className='communityNameDescription'>
                            <h3>{communityData.name}</h3>
                            <p style={{margin:'0px', fontSize:'.8rem'}}>{communityData.members} miembro/s</p>
                            <p>{communityData.description}</p>
                        </div>
                    </div>
                    <div className='communityData'>
                        <div className='communityAbilities'>
                            <CommunityAbilities communityAbilities={communityData.abilities} accountPropietary={communityData.accountPropietary} /> 
                        </div>
                    </div>
                    {communityData.community_image ? (
                            <div className='communityImgContainer' style={{backgroundImage:`url('${'http://mpgdev.es'+communityData.community_image}')`}}></div>
                        ) : (
                            <div className='communityImgContainer' style={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                                <Icon icon="tabler:photo" style={{fontSize: "5rem"}} />
                            </div>
                        )
                    }
                </div>
                <div className='selectorsContainer'>
                    <div className='communitySelectorContainer'>
                        <div onClick={() => {handleContentSelector('posts')}}  className={`communitySelector ${selectedSelector === 'posts' ? 'selectorSelected' : ''}`}>Publicaciones</div>
                        <div onClick={() => {handleContentSelector('events')}}  className={`communitySelector ${selectedSelector === 'events' ? 'selectorSelected' : ''}`}>Eventos</div>
                        <div onClick={() => {handleContentSelector('netwisers')}}  className={`communitySelector ${selectedSelector === 'netwisers' ? 'selectorSelected' : ''}`}>Netwisers</div>
                    </div>
                    <div className='communityInteractionsContent'>
                        {!communityData.accountPropietary && userFlollowing == 'notFollowing'  && <button className='button' onClick={() => {handleJoinCommunity(communityData.id)}}>Seguir</button>}
                        {!communityData.accountPropietary && userFlollowing == 'following' && <button className='button' onClick={() => {handleLeaveCommunity(communityData.id)}}>Dejar de seguir</button>}
                        <button className='button' onClick={() => {setInfoModalMessages(true)}}>Mensajes</button>
                    </div>
                </div>
            </div>
            {infoModalMessages && 
                <MessageComponent setInfoModalMessages={setInfoModalMessages} section='community'/>
            }
        </div>
    )
}

export default CommunityBar;