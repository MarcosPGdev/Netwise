import { useParams } from 'react-router-dom';
import CommunityBar from '../components/communityComponents/communityBar/communityBar';
import '../styles/communities.css';
import { useEffect, useState, lazy, Suspense} from 'react';
import { getCommunityInfo, showCommunityNetwisers, showPosts } from '../api/community';
import { toast } from 'react-toastify';
import Actions from '../components/actions/actions';
const Post = lazy(() => import('../components/post/post'));
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Department from '../components/department/department';
import Event from '../components/event/event';
import Netwisers from '../components/netwisers/netwisers';

function Communities_Page (){
    const { id } = useParams();
    const [communityData, setCommuntyData] = useState({});
    const [postData, setPostData] = useState([]);
    const [netwisersData, setNetwisersData] = useState();
    const [displayContent, setDisplayContent] = useState('posts');
    
    useEffect(() => {
        const fetchCommunity = async () => {
            try {
              const community = await getCommunityInfo(id);
              setCommuntyData(community.results);
              
              const posts = await showPosts(id);
              setPostData(posts.results);

              const netwisers = await showCommunityNetwisers(id);
              setNetwisersData(netwisers.results);
              console.log(netwisers.results);

            } catch (err) {
              toast.error(err.message);
            }
        };
        fetchCommunity();
    }, [])

    return (
        <div className='profileScreen'>
            <CommunityBar communityData={communityData} setDisplayContent={setDisplayContent} />
            <div className='communitiesScreen'>
                <div className='actionDisplay'>
                    <Actions />
                </div>
                <div className='contentDisplay'>
                    {postData.length > 0 && displayContent == 'posts' &&
                        postData.map((postData, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                        <Post postData={postData} /> 
                                    </Suspense>
                        })
                    }

                    {communityData && displayContent == 'events' &&
                        communityData.events.map((data, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                        <Event eventData={data}/>
                                    </Suspense>
                        })
                    }

                    {netwisersData && displayContent == 'netwisers' &&
                        netwisersData.map((data, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                        <Netwisers netwisersData={data} />
                                    </Suspense>
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Communities_Page