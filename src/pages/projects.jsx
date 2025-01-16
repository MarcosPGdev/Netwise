import { useParams } from 'react-router-dom';
import ProjectBar from '../components/projectComponents/projectBar/projectBar';
import '../styles/projects.css';
import { useEffect, useState, lazy, Suspense} from 'react';
import { getProjectInfo, showDepartment, showPosts, showProjectNetwisers } from '../api/project';
import { toast } from 'react-toastify';
import Actions from '../components/actions/actions';
const Post = lazy(() => import('../components/post/post'));
import 'react-loading-skeleton/dist/skeleton.css';
import Department from '../components/department/department';
import Netwisers from '../components/netwisers/netwisers';

function Projects_Page (){
    const { id } = useParams();
    const [projectData, setProjectData] = useState({});
    const [postData, setPostData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [netwisersData, setNetwisersData] = useState([]);
    const [displayContent, setDisplayContent] = useState('posts');
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
              const project = await getProjectInfo(id);
              setProjectData(project.results);

              const posts = await showPosts(id);
              setPostData(posts.results);

              const departments = await showDepartment(id);
              setDepartmentData(departments);

              const netwisers = await showProjectNetwisers(id);
              setNetwisersData(netwisers.results);

            } catch (err) {
              toast.error(err.message);
            }
        };
        fetchProject();
    }, [])

    return (
        <div className='profileScreen'>
            <ProjectBar projectData={projectData} setDisplayContent={setDisplayContent} />
            <div className='projectScreen'>
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

                    {departmentData.length > 0 && displayContent == 'departments' &&
                        departmentData.map((departmentData, index) => {
                            return  <Suspense key={index} fallback={<div>Cargando...</div>}>
                                         <Department departmentData={departmentData}/>
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


export default Projects_Page