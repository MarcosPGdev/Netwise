import './event.css'

function Event ({eventData}){
    return(
        <div className='eventContainer module' onClick={() => {window.open(eventData.link)}}>
            {eventData.event_image ? (
                    <div className='eventImage' style={{backgroundImage:`url('${'http://mpgdev.es'+eventData.event_image}')`}}></div>
                ) : (
                    <div className='eventImage' style={{display:"flex", alignItems: "center", justifyContent:"center"}}>
                        <Icon icon="tabler:photo" style={{fontSize: "5rem"}} />
                    </div>
                )
            }
            <div className='eventName'>
                <h2>{eventData.name}</h2>
            </div>
            <div className='eventDescription'>
                <p>{eventData.description}</p>
            </div>
        </div>
    )
}

export default Event