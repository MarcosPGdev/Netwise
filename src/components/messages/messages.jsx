import { Icon } from '@iconify/react/dist/iconify.js'
import './messages.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { sendProjectMessage, showProjectMessages } from '../../api/project';
import { sendCommunityMessage, showCommunityMessages } from '../../api/community';
import { sendUserMessage, showUserMessages } from '../../api/user/profile';
import { toast } from 'react-toastify';

function MessageComponent ({setInfoModalMessages, section}) {
    const { id } = useParams();
    const [messagesData, setMessagesData] = useState(false);
    const [componentReseter, setComponentReseter] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            var data;
            if(section == 'project'){
                data = await showProjectMessages(id);
                console.log(data)
            }else if(section == 'community'){
                data = await showCommunityMessages(id);
            }else if(section == 'private'){
                data = await showUserMessages(id);
            }
            setMessagesData(data.results);
        }
        fetchMessages();
    }, [componentReseter]);

    const handleSubmitMessage = async (values) => {
        try{
            if(values.message == ''){
                return
            }
            if(section == 'project'){
                values.projectId = id;
                const data = await sendProjectMessage(values);
            }else if(section == 'community'){
                values.communityId = id;
                const data = await sendCommunityMessage(values);
            }else if(section == 'private'){
                values.receptorId = id;
                const data = await sendUserMessage(values);
            }
            setComponentReseter(!componentReseter)
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='containerModal'>
            <div className='modal'>
                <div className='modalHeader'>
                    <h2>Mensajería</h2>
                    <button className='closeButton' onClick={() => {setInfoModalMessages(false)}}>
                        <Icon icon="icomoon-free:cross" />
                    </button>
                </div>
                <div className='messageModalBody'>
                    <div className='messageBox'>
                        <div className='messageContainer'>
                            {messagesData.length > 0 ? (
                                messagesData.map((message, index) => {
                                    if(message.propiety == 1){
                                        return(<div className='message' style={{alignSelf:'end'}}  key={index}><p>{message.body}</p></div>)
                                    }else{
                                        return(<div className='message' style={{alignSelf:'start'}} key={index}><p>{message.body}</p></div>)
                                    }
                                })
                            ) : (
                                <div className='message'>Se el primero en escribir</div>
                            )}
                        </div>
                        <div className='messageInputContainer'>
                            <div className="inputmessageBox">
                                <Formik
                                    initialValues={{ message: '' }}
                                    onSubmit={(values, { resetForm }) => {
                                        console.log('Comentario enviado:', values.message);
                                        handleSubmitMessage(values);
                                        resetForm();
                                    }}
                                >
                                    {({ handleSubmit }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Field
                                                className="messageInput"
                                                type="text"
                                                name="message"
                                                placeholder="Escribe un mensaje"
                                            />
                                            <button
                                                type="submit"
                                                className="messageButton"
                                            >
                                                <Icon icon="rivet-icons:plane-solid" />
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 


export default MessageComponent