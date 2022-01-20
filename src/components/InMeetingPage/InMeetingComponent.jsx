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

    const [playing, setPlaying] = useState(false);
    
    const {
        setIsCameraOpen
    } = props;

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
    
    function setupVideoFeedback() {
        if (stream) {
            const video = document.querySelector('.video-feedback');
            video.srcObject = stream;  
            video.play();
        } else {
            console.warn('No stream available');
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
        
            startButton.disabled = true;
            stopButton.disabled = false;
        
            console.log('Recording started');
        } else {
            console.warn('No stream available.');
        }
    }
    
    function stopRecording () {
        recorder.stop();
    
        startButton.disabled = false;
        stopButton.disabled = true;
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
    
        startButton.addEventListener('click', startRecording);
        stopButton.addEventListener('click', stopRecording);
    })

    const startCamera = () => {
        setIsCameraOpen(true)
        setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementById('my__camera');
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
    }

    const stopCamera = () => {
        setIsCameraOpen(false)
		setPlaying(false);
		let video = document.getElementById('my__camera');
		video.srcObject.getTracks()[0].stop();
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
            name: 'end-call',
            action: (isActive) => alert('end-call control press' + isActive),
            isActive: false,
            activeIcon: faPhoneSlash,
            disabledIcon: faPhoneSlash
        },
        {
            id: 7,
            name: 'more-options',
            action: (isActive) => alert('end-call control press' + isActive),
            isActive: false,
            activeIcon: faEllipsisH,
            disabledIcon: faEllipsisH

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
        <a class="download-video">
            <button type="button">
                Download
            </button>
        </a>
        <a class="start-recording">
            <button type="button">
                Start
            </button>
        </a>
        <a class="stop-recording">
            <button type="button">
                Stop
            </button>
        </a>
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

    const [ cameraSize, setCameraSize ] = useState({ width: 0, height: 0 })
    const [ isCameraOpen, setIsCameraOpen ] = useState(false)

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
                        {
                            isCameraOpen ? <video
                                height={cameraSize.height}
                                width={cameraSize.width}
                                muted
                                autoPlay
                                id="my__camera"
                            />
                            :
                            <div className='user-initials'>
                                me
                            </div>
                        }
                    </Col>
                    {
                        users.map((user) => (
                            <UserBox user={user}/>
                        ))
                    }
                </Row>
                <Row xs={12} className='controls-grid '>
                    <Controls setIsCameraOpen={setIsCameraOpen}/>
                </Row>
            </Col>
        </Row>
    
}

export default InMeeting;