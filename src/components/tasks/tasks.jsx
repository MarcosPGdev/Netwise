import { useEffect, useState } from 'react'
import { changeTaskState, getTaskInfo } from '../../api/project'
import './tasks.css'

function Task ({taskId}) {
    const [taskData, setTaskData] = useState(null);
    const [resetComponent, setResetComponent] = useState(false);
    useEffect(() => {
        const fetchTask = async () => {
            try{
                const data = await getTaskInfo(taskId);
                setTaskData(data.results);
            }catch(error){
                console.log(error);
            }
        }
        fetchTask();
    }, [resetComponent]);

    const handleStateChange = async () => {
        try{
            const data = await changeTaskState({taskId:taskId});
            setResetComponent(!resetComponent);
        }catch(error){
            console.log(error);
        }        
    }
    
    return(
        <>
        {taskData &&
            <div className='task'>
                <p>{taskData.text}</p>
                <input type="checkbox" checked={taskData.state !== 0} onChange={handleStateChange}/>
            </div>
        }
        </>
    )
}

export default Task