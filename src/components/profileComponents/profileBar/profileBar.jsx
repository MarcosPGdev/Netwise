import './ProfileBar.css'
import UserTools from '../userTools/userTools';
import { Icon } from '@iconify/react/dist/iconify.js';
import { changeFollowState } from '../../../api/user/netwisers';
import { useState } from 'react';
import MessageComponent from '../../messages/messages';

function ProfileBar ({userInfo, displayContent, setDisplayContent, componentReseter, setComponentReseter, accountPropietary}){
    const [loading, setLoading] = useState(false);
    const [infoModalMessages, setInfoModalMessages] = useState(false);
    
    const handleChangeFollow = async (id) => {
        if (loading) return;
        setLoading(true);
    
        try {
            const followState = await changeFollowState(id);
            console.log(followState);
            setComponentReseter(!componentReseter);
        } catch (err) {
            console.error("Error cambiando el estado de follow:", err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className='module barContainer'>
            {userInfo &&
            <>
            
            <div className='userContent'>
                <div className='userData'>
                    <img src={'http://mpgdev.es'+userInfo.user_image} alt="img" />
                    <p className='userName'>@{userInfo.username}</p>
                </div>
                {!accountPropietary && !userInfo.isFollowed &&
                    <div className='followerTool'>
                        <button className='button' onClick={() => {setInfoModalMessages(true)}}>Mensajes</button>
                        <button className='button' onClick={() => {handleChangeFollow(userInfo.id)}}>Seguir</button>
                    </div>
                }
                {!accountPropietary && userInfo.isFollowed &&
                    <div className='followerTool'>
                        <button className='button' onClick={() => {setInfoModalMessages(true)}}>Mensajes</button>
                        <button className='button' onClick={() => {handleChangeFollow(userInfo.id)}}>Dejar de seguir</button>
                    </div>
                }
            </div>
            <div className='profileSelectorContainer'>
                <div className={`profileSelector ${displayContent === 'profile' ? 'selectorSelected' : ''}`} onClick={() => {setDisplayContent('profile')}}>Perfil</div>
                <div className={`profileSelector ${displayContent === 'posts' ? 'selectorSelected' : ''}`} onClick={() => {setDisplayContent('posts')}}>Publicaciones</div>
                <div className={`profileSelector ${displayContent === 'communities' ? 'selectorSelected' : ''}`} onClick={() => {setDisplayContent('communities')}}>Comunidades</div>
                <div className={`profileSelector ${displayContent === 'projects' ? 'selectorSelected' : ''}`} onClick={() => {setDisplayContent('projects')}}>Proyectos</div>
                <div className={`profileSelector ${displayContent === 'netwisers' ? 'selectorSelected' : ''}`} onClick={() => {setDisplayContent('netwisers')}}>Netwisers</div>
            </div>
            </>
}
            {infoModalMessages && 
                <MessageComponent setInfoModalMessages={setInfoModalMessages} section='private'/>
            }
        </div>
    )
}

export default ProfileBar;