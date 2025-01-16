import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { getInfo, getPosts, getProjects, getCommunities, getNetwisers} from '../api/user/profile';
import '../styles/profile.css'
import ProfileBar from '../components/profileComponents/profileBar/profileBar';
import ProfileInfo from '../components/profileComponents/profileInfo/profileInfo';
import ProfileUbi from '../components/profileComponents/profileUbi/profileUbi';
import ProfileAbilities from '../components/profileComponents/profileAbilities/profileAbilities';
import ProfileInterests from '../components/profileComponents/profileInterests/profileInterests';
import ProfileLenguages from '../components/profileComponents/profileLenguages/profileLenguages';
import ProfileExperience from '../components/profileComponents/profileExperience/profileExperience';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const Project = lazy(() => import('../components/projectComponents/project'));
const Post = lazy(() => import('../components/post/post'));
const Netwisers = lazy(() => import('../components/netwisers/netwisers'));
const Community = lazy(() => import('../components/communityComponents/community'));
import 'react-loading-skeleton/dist/skeleton.css';

function Profile_Page(){
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [userCommunities, setUserCommunities] = useState(null);
    const [userProjects, setUserProjects] = useState(null);
    const [userNetwisers, setUserNetwisers] = useState(null);
    const [componentReseter, setComponentReseter] = useState(false);
    const [accountPropietary, setAccountPropietary] = useState(false);
    const [displayContent, setDisplayContent] = useState('profile'); 
    const [resetComponent, setResetComponent] = useState(false); 
    const { id } = useParams();

    const memoizedUbi = useMemo(() => {
        return userData?.userInfo?.ubi;
    }, [userData?.userInfo?.ubi]);
    
    useEffect(() => {
        if(!id){
          setAccountPropietary(true);
        }
        const fetchUserProfile = async () => {
          try {
            const profileInfo = await getInfo(id);
            setUserData(profileInfo);

            const profilePosts = await getPosts(id);
            setUserPosts(profilePosts);

            const profileProjects = await getProjects(id);
            setUserProjects(profileProjects);
           
            const profileCommunities = await getCommunities(id);
            setUserCommunities(profileCommunities);

            const profileNetwisers = await getNetwisers(id);
            setUserNetwisers(profileNetwisers);

          } catch (err) {
            toast.error(err.message);
          }
        };
    
        fetchUserProfile(userData);
      }, [componentReseter, id]);

    return(
        <div className='profileScreen'>
            {userData && <ProfileBar userInfo={userData.userInfo} displayContent={displayContent} setDisplayContent={setDisplayContent} componentReseter={componentReseter} setComponentReseter={setComponentReseter}  accountPropietary={accountPropietary}></ProfileBar>}
            {userData && displayContent == 'profile' &&
                <div className='userGridContent'>
                    <ProfileInfo userInfo={userData.userInfo} componentReseter={componentReseter} setComponentReseter={setComponentReseter} accountPropietary={accountPropietary}/>
                    <ProfileUbi userUbi={memoizedUbi}  accountPropietary={accountPropietary}/>
                    <ProfileAbilities userAbilities={userData.userInfo.abilities} componentReseter={componentReseter} setComponentReseter={setComponentReseter}  accountPropietary={accountPropietary}/>
                    <ProfileInterests userInfo={userData.userInfo} componentReseter={componentReseter} setComponentReseter={setComponentReseter} accountPropietary={accountPropietary} />
                    <ProfileLenguages userLenguages={userData.userInfo.lenguages} componentReseter={componentReseter} setComponentReseter={setComponentReseter}  accountPropietary={accountPropietary}/>
                    <ProfileExperience userInfo={userData.userInfo} componentReseter={componentReseter} setComponentReseter={setComponentReseter} accountPropietary={accountPropietary}/>
                </div>
            }

            {userPosts && displayContent == 'posts' &&
                <div className='profileContentDisplay'>
                    {
                        userPosts.map((postData, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                        <Post postData={postData} resetComponent={resetComponent} setResetComponent={setResetComponent}/> 
                                    </Suspense>
                        })
                    }
                </div>
            }

            {userProjects && displayContent == 'projects' &&
                <div className='profileContentDisplay'>
                    {
                        userProjects.map((projectData, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                        <Project projectData={projectData} resetComponent={resetComponent} setResetComponent={setResetComponent}/> 
                                    </Suspense>
                        })
                    }
                </div>
            }

            {userCommunities && displayContent == 'communities' &&
                <div className='profileContentDisplay'>
                    {
                        userCommunities.map((communityData, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                        <Community communityData={communityData} resetComponent={resetComponent} setResetComponent={setResetComponent}/> 
                                    </Suspense>
                        })
                    }
                </div>
            }
            
            {userNetwisers && displayContent == 'netwisers' &&
                <div className='profileContentDisplay'>
                    {
                        userNetwisers.map((netwisersData, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                      <Netwisers netwisersData={netwisersData} key={index}/>
                                    </Suspense>
                        })
                    }
                </div>
            }
        </div>
    )
}


export default Profile_Page;