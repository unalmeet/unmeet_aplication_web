import React, { Fragment, useState } from 'react';
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
    faRecordVinyl
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

const Controls = () => {

    const videoElement = document.getElementsByTagName("video")[0];
    const downloadLink = document.getElementById('download');

    let active = false
    let stream;
    let mimeType;

    const handleRecord = function () {
        // startRecord()

        // $('.btn-info').prop('disabled', true);
        //$('#stop').prop('disabled', false);
        //$('#download').css('display', 'none')

        let recordedChunks = [];
        
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }

            if (!active){
                mediaRecorder.stop();
                active = false
            } 
            
        };

        mediaRecorder.onstop = function () {
            alert('onsttop')
            const blob = new Blob(recordedChunks, {
                type: mimeType
            });
            recordedChunks = []
            const filename = window.prompt('Enter file name');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${filename || 'recording'}.webm`;
            
            // stopRecord();
            // $('.btn-info').prop('disabled', false);
            // $('#stop').prop('disabled', true);
            // $('#download').css('display', 'block')
            
            videoElement.srcObject = null;
        };

        mediaRecorder.start(200);
    };

    async function recordScreen() {
        mimeType = 'video/webm';

        if(!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
            return window.alert('Screen Record not supported!')
        }

        stream = null;

        let displayStream = await navigator.mediaDevices.getDisplayMedia({video: {cursor: "motion"}, audio: {'echoCancellation': true}});

        if(window.confirm("Record audio with screen?")){
            const audioContext = new AudioContext();

            const voiceStream = await navigator.mediaDevices.getUserMedia({ audio: {'echoCancellation': true}, video: false });
            const userAudio = audioContext.createMediaStreamSource(voiceStream);
            
            const audioDestination = audioContext.createMediaStreamDestination();
            userAudio.connect(audioDestination);

            if(displayStream.getAudioTracks().length > 0) {
                const displayAudio = audioContext.createMediaStreamSource(displayStream);
                displayAudio.connect(audioDestination);
            }

            const tracks = [...displayStream.getVideoTracks(), ...audioDestination.stream.getTracks()]
            stream = new MediaStream(tracks);
            handleRecord()
        } else {
            stream = displayStream;
            handleRecord();
        };
        videoElement.srcObject = stream;
    }

    const handleRecordScreen = () => {
        if(!active){
            active = true
            recordScreen()
        } else {
            handleRecord()
        }
    }

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
            action: (isActive) => alert('video control press'),
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
            name: 'record-screen',
            action: (isActive) => handleRecordScreen(isActive),
            isActive: false,
            activeIcon: faRecordVinyl,
            disabledIcon: faRecordVinyl
        },
        {
            id: 7,
            name: 'end-call',
            action: (isActive) => alert('end-call control press' + isActive),
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

        <a id="download">
            <button type="button">
                Download
            </button>
        </a>

        <video autoplay="" height="480" width="640" muted="" className='hidden'></video>

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
            message: "message 4 fsd fsd sfd ds fsdf dsf dsf dsf sf",
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
                    {
                        users.map((user) => (
                            <UserBox user={user}/>
                        ))
                    }
                </Row>
                <Row xs={12} className='controls-grid '>
                    <Controls/>
                </Row>
            </Col>
        </Row>
    
}

export default InMeeting;