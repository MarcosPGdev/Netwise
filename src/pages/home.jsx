import { useState, useEffect, lazy, Suspense} from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/home.css'
import Actions from '../components/actions/actions';
import { showPosts } from '../api/post';
import { showProjects } from '../api/project';
import { showNetwisers } from '../api/user/netwisers';
const Project = lazy(() => import('../components/projectComponents/project'));
const Post = lazy(() => import('../components/post/post'));
const Netwisers = lazy(() => import('../components/netwisers/netwisers'));
const Community = lazy(() => import('../components/communityComponents/community'));

import 'react-loading-skeleton/dist/skeleton.css';
import { showCommunities } from '../api/community';

function Home_Page() {
    const location = useLocation();
    const [homeContent, setHomeContent] = useState(location.state?.homeContent || 'posts');
    const [content, setContent] = useState([]);
    const [resetComponent, setResetComponent] = useState(false);

    const handleShowContent = async () => {
        setContent([]);
        if (homeContent === "posts") {
            return await showPosts();
        }
        if (homeContent === "projects") {
            return await showProjects();
        }
        if (homeContent === "communities") {
            return await showCommunities();
        }
        if (homeContent === "netwisers") {
            return await showNetwisers();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await handleShowContent();
            setContent(data.results);
        };

        fetchData();
    }, [homeContent, resetComponent]);

    useEffect(() => {
        setHomeContent(location.state?.homeContent || "posts");
    }, [location.state?.homeContent]);

    console.log(content);

    return(
        <div className='homeScreen'>
            <div className='actionDisplay'>
                <Actions />
            </div>
            <div className='contentDisplay'>
                
                {/*<Skeleton style={{width:"200px", height:"200px"}} count={10} />*/}
                
                {homeContent == 'posts' && content.length > 0 && 
                    content.map((postData, index) => {
                        return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                    <Post postData={postData} resetComponent={resetComponent} setResetComponent={setResetComponent}/> 
                                </Suspense>
                    })
                }
                {homeContent == 'projects' && content.length > 0 && 
                    content.map((projectData, index) => {
                        return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                    <Project projectData={projectData} resetComponent={resetComponent} setResetComponent={setResetComponent}/> 
                                </Suspense>
                    })
                }
                {homeContent == 'communities' &&
                    content.map((communityData, index) => {
                        return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                    <Community communityData={communityData} resetComponent={resetComponent} setResetComponent={setResetComponent}/> 
                                </Suspense>
                    })
                }
                {homeContent == 'netwisers' && content.length > 0 && 
                    content.map((netwisersData, index) => {
                        return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                    <Netwisers netwisersData={netwisersData} key={index}/>
                                </Suspense>
                    })
                }
            </div>
        </div>
    )
}


export default Home_Page;