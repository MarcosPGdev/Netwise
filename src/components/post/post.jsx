import './post.css'
import { Icon } from '@iconify/react';
import { valoratePost, postComment, getPostData} from '../../api/post';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Post ({postData}){
    const [postContent, setPostContent] = useState(null);
    const [commentModal, setCommentModal] = useState(false);
    const [resetComponent, setResetComponent] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPostData(postData.id);
                setPostContent(data.results);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    }, [resetComponent, postData.id]);

    const handleChangeLike = async (postId) => {
        try {
            const data = await valoratePost({ postId });
            handleResetComponent();
        } catch (error) {
            console.error('Error updating like:', error);
        }
    };
    
    const handlePostComment = async (postId, values) => {
        if (values === '') {
            toast.error('No es posible enviar un comentario vacío.');
            return;
        }
        try {
            const data = await postComment({ postId, body: values });
            handleResetComponent();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleResetComponent = () => {
        setResetComponent((prev) => !prev);
        console.log("Nuevo valor de resetComponent:", resetComponent);
    }
    if (!postContent) {
        return (
            <div className="skeletonPostContainer">
                <Skeleton 
                height={250} 
                style={{width:'100%'}}
                baseColor="rgb(220, 230, 240)"
                highlightColor="rgb(245, 248, 250)" />
            </div>
        );
    }
    return(
        <div className="module postContainer" id={postContent.id}>
            <div className='postHeader'>
                <h3>@{postContent.username}</h3>
                <div className='postActionContainer'>
                    <button className='noneButton counter' onClick={() => {setCommentModal(!commentModal)}}>
                        <Icon icon="uil:comment" />
                        <p>{postContent.comments.length}</p>
                    </button>
                    <button className='noneButton counter' onClick={() => {handleChangeLike(postContent.id)}}>
                        <Icon icon="icon-park-outline:like" />
                        <p>{postContent.likes}</p>
                    </button>
                </div>
            </div>
            <div className='postBody'>
                <div className='postText'>
                    <h3>{postContent.title}</h3>
                    <p>{postContent.body}</p>
                </div>
                <div className='postImage'>
                    {postContent.image ?
                       (<img src={'http://mpgdev.es'+postContent.image} alt="" />) :
                       (<Icon icon="tabler:photo" style={{fontSize: "5rem"}} />)
                    }
                </div>
            </div>
            {commentModal &&
                <div className='commentBox'>
                    <div className='commentContent'>
                        {postContent.comments.length > 0 ? (
                            postContent.comments.map((comment, index) => {
                                return(<div className='comment' key={index}><p>{comment.body}</p></div>)
                            })
                        ) : (
                            <div className='comment'>Se el primero en comentar</div>
                        )}
                    </div>
                    <div className="inputCommentBox">
                        <Formik
                            initialValues={{ comment: '' }}
                            onSubmit={(values, { resetForm }) => {
                                console.log('Comentario enviado:', values.comment);
                                handlePostComment(postContent.id, values.comment);
                                resetForm();
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        className="commentInput"
                                        type="text"
                                        name="comment"
                                        placeholder="Escribe tu comentario"
                                    />
                                    <button
                                        type="submit"
                                        className="commentButton"
                                    >
                                        <Icon icon="rivet-icons:plane-solid" />
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            }
        </div>
    )
}

export default Post;