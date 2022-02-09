import React, { Fragment, useEffect, useState } from 'react';
import './InMeetingComponent.css';
import { Row, Col } from "reactstrap";
import avatarImg from "../../assets/avatar.png";
import { 
    faMicrophone, 
    faMicrophoneSlash, 
    faVideo, 
    faVideoSlash, 
    faHandPaper, 
    faClosedCaptioning, 
    faDesktop, 
    faPhoneSlash,
    faLaugh,
    faPaperPlane,
    faRecordVinyl,
    faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";

let stream = null,
	audio = null,
	mixedStream = null,
	chunks = [], 
	recorder = null,
	startButton = null,
	stopButton = null,
	downloadButton = null;


    async function setupStream () {

        try {
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });
    
            audio = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });

        } catch (err) {
            console.error(err)  
        }
    }

    async function startRecording () {
        await setupStream();
    
        if (stream && audio) {

        
            mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);
            recorder = new MediaRecorder(mixedStream);
            recorder.ondataavailable = handleDataAvailable;
            recorder.onstop = handleStop;
            recorder.start(1000);
  
        
            console.log('Recording started');
        } else {
            console.warn('No stream available.');
        }
    }
    
    function stopRecording () {
        recorder.stop();
    

    }
    
    function handleDataAvailable (e) {
        chunks.push(e.data);
    }
    
    function handleStop (e) {
        const blob = new Blob(chunks, { 'type' : 'video/mp4' });
        chunks = [];
    
        downloadButton.href = URL.createObjectURL(blob);
        downloadButton.download = 'video.mp4';
        downloadButton.disabled = false;
    
        stream.getTracks().forEach((track) => track.stop());
        audio.getTracks().forEach((track) => track.stop());
    
        console.log('Recording stopped');
    }
    
    window.addEventListener('load', () => {
        startButton = document.querySelector('.start-recording');
        stopButton = document.querySelector('.stop-recording');
        downloadButton = document.querySelector('.download-video');
    
        // startButton.addEventListener('click', startRecording);
        // stopButton.addEventListener('click', stopRecording);
    })

const UserBox = props => {

    const { user } = props;

    return <Col xs={12} md={3} className='user-box'>
        {
            user.avatar ? 
            <img src={user.avatar} alt='user-box'/>
            :
            <div className='user-initials'>
                {user.name[0]}
            </div>
        }
        
    </Col>
}

const Controls = props => {
    
    const {
        setIsCameraOpen,
        openSocketConnection,
        closeSocketConnection,
        emitVideo
    } = props;

    const startCamera = () => {
        openSocketConnection();
        emitVideo();
        setIsCameraOpen(true)
    }

    const stopCamera = () => {
        closeSocketConnection()
        setIsCameraOpen(false)
	};

    const [ controls, setControls ] = useState([
        {
            id: 1,
            name: 'voice',
            action: (isActive) => alert('voice control press'),
            isActive: false,
            activeIcon: faMicrophone,
            disabledIcon: faMicrophoneSlash
        },
        {
            id: 2,
            name: 'video',
            action: (isActive) => isActive ? startCamera() : stopCamera(),
            isActive: false,
            activeIcon: faVideo,
            disabledIcon: faVideoSlash
        },
        {
            id: 3,
            name: 'raise-hand',
            action: (isActive) => alert('raise-hand control press'),
            isActive: false,
            activeIcon: faHandPaper,
            disabledIcon: faHandPaper
        },
        {
            id: 4,
            name: 'close-caption',
            action: (isActive) => alert('close-caption control press'),
            isActive: false,
            activeIcon: faClosedCaptioning,
            disabledIcon: faClosedCaptioning
        },
        {
            id: 5,
            name: 'share-screen',
            action: (isActive) => alert('share-screen control press'),
            isActive: false,
            activeIcon: faDesktop,
            disabledIcon: faDesktop
        },
        {
            id: 6,
            name: 'record-session',
            action: (isActive) => isActive ? startRecording() : stopRecording(),
            isActive: false,
            activeIcon: faRecordVinyl,
            disabledIcon: faRecordVinyl

        },
        {
            id: 7,
            name: 'more-options',
            action: (isActive) => alert('More Options' + isActive),
            isActive: false,
            activeIcon: faEllipsisH,
            disabledIcon: faEllipsisH

        },
        {
            id: 8,
            name: 'end-call',
            action: (isActive) => alert('Call ended' + isActive),
            isActive: false,
            activeIcon: faPhoneSlash,
            disabledIcon: faPhoneSlash
        }
        
        
    ])

    const handleControlClick = index => {
        let tempControls = [...controls];
        tempControls[index].isActive = !tempControls[index].isActive
        tempControls[index].action(tempControls[index].isActive)
        setControls(tempControls)
    }

    return <Fragment>
        {   
            controls.map((control, index) => (
                
                <div onClick={() => handleControlClick(index)} className={`action-button ${control.isActive ? 'active' : 'disabled'}`}>
                    <FontAwesomeIcon 
                        icon={control.isActive ? control.activeIcon : control.disabledIcon } 
                        className={control.isActive ? 'activeIcon' : 'disabledIcon' } 
                    />
                </div>
            ))
        }
    </Fragment>
}

const ChatInput = () => {
    return <div className='chat-input'>
        
        
        <FontAwesomeIcon icon={faLaugh} className='chat-input-emoji-icon' />
        <textarea name="textarea" rows="2" className='chat-input-text' />
        <FontAwesomeIcon icon={faPaperPlane}  className='chat-input-send-icon' />
    </div>
}

const ChatMessages = () => {
    const messages = [
        {
            id: 1,
            message: "message 1",
            from: "user 1"
        },
        {
            id: 2,
            message: "message 2",
            from: "user 2"
        },
        {
            id: 3,
            message: "message 3",
            from: "user 3"
        },
        {
            id: 4,
            message: "message 4",
            from: "user 4"
        }
    ]

    return <div className='chat-messages-container'>
        {   
            messages.map((m, i) => (
                <div key={i} className='chat-message-box'><strong>{m.from}: </strong>{m.message}</div>
            ))
        }
    </div>
}

const InMeeting = props => {

    const { url: meetingId } = props;
    const [ cameraSize, setCameraSize ] = useState({ width: 0, height: 0 })
    const [ isCameraOpen, setIsCameraOpen ] = useState(false)

    let socket, transmissionToken;

    useEffect(() => {

        //TODO: get userId and meetingId dynamically 
        const userinfo = JSON.parse(localStorage.getItem('user_meet'))

        const ADD_NEW_TRANSMISSION_MUTATION=`mutation
        {
            addNewTransmission(meetingData:{
                idMeeting: "${meetingId}",
                idUser: ${parseInt(userinfo.id)}
            })
            { token }
        }`

        fetch(process.env.REACT_APP_API,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({query:ADD_NEW_TRANSMISSION_MUTATION})  
        }).then((response) => {
            if (response.status >= 400) {
                console.log(response);
                throw new Error("Error fetching data");
            } else {
                return response.json();
            }
        }).then((data) =>{
            transmissionToken = data.data.addNewTransmission.token

            socket = io(process.env.REACT_APP_SOCKET_URL,{
                autoConnect: false,
                auth: {
                    token: transmissionToken,
                    usr: parseInt(userinfo.id)
                }
            });
    
            console.log(socket)
        
            socket.on('connect', function() {
                console.log('Connected');
            });
                
            socket.on('video', function(data) {
                var img = document.getElementById('play');
                img.src = data;;
            });
        
            socket.on('disconnect', function() {
                console.log('Disconnected');
            });

        });

    }, [])

    const openSocketConnection = () => {
        socket.connect()
    }

    const closeSocketConnection = () => {
        socket.disconnect()
    }

    const handleResize = () => {
        const element = document.getElementById('my__camera_container');
        const positionInfo = element.getBoundingClientRect();
        setCameraSize({ width: positionInfo.width, height: positionInfo.height })
    }

    useEffect(() => {
        const element = document.getElementById('my__camera_container');
        const positionInfo = element.getBoundingClientRect();
        setCameraSize({ width: positionInfo.width, height: positionInfo.height })
        window.addEventListener("resize", handleResize, false);
    }, [])

    async function captura(){
		let mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
		return mediaStream;
  	};
	  
    const emitVideo = () => {

        const canvasHtml = document.querySelector('#canvas');
        const imageHtml = document.querySelector('#image');
        const context = canvasHtml.getContext("2d");

        context.height = cameraSize.height;
        context.width = cameraSize.width;


        captura().then(stream => {
            imageHtml.srcObject = stream;
        });
        
        setInterval(()=>{
            const imageObj = document.getElementById('play');
            imageObj.onload = function(e) {
                context.canvas.width = imageObj.width;
                context.canvas.height = imageObj.height;
                context.drawImage(imageHtml, 0, 0,imageObj.width,imageObj.height);
            };
            socket.emit('video', canvasHtml.toDataURL('image/webp'));
        }, 100);
    };

    const users = [
        {
            id: 1,
            name: 'Cristhian Camilo',
            avatar: null
        },
        {
            id: 2,
            name: 'Angela Saavedra',
            avatar: avatarImg
        },
        {
            id: 3,
            name: 'Pepito Perez',
            avatar: null
        },
        {
            id: 4,
            name: 'Cristhian Camilo',
            avatar: null
        },
        {
            id: 5,
            name: 'Angela Saavedra',
            avatar: avatarImg
        }
    ]
    
    return <Row className='full-height'>
        
            <Col xs={12} md={2} className='chat-container'>
                <ChatMessages />
                <ChatInput/>
            </Col>
            <Col xs={12} md={10} className='right-panel'>
                <Row xs={12} className='user-grid'>
                    
                    <Col xs={12} md={3} className='user-box' id='my__camera_container'>

                    <div className={!isCameraOpen && 'hidden'}>
                        <video id="image" className='my__camera_video' height={cameraSize.height} width={cameraSize.width} autoPlay/>
                        <canvas id="canvas" className='my__camera_canvas' height={cameraSize.height} width={cameraSize.width} />
                        <img id="play" alt=""/>
                    </div>

                    <div className={`user-initials ${isCameraOpen && 'hidden'}`}>me</div>
                        
                    </Col>
                    {
                        users.map((user) => (
                            <UserBox user={user}/>
                        ))
                    }
                    
                </Row>
                <a className="download-video">
                    <button type="button">
                        Download
                    </button>
                </a>
                <Row xs={12} className='controls-grid '>
                    <Controls setIsCameraOpen={setIsCameraOpen} openSocketConnection={openSocketConnection} closeSocketConnection={closeSocketConnection} emitVideo={emitVideo}/>
                </Row>
                
            </Col>
        </Row>
    
}

export default InMeeting;