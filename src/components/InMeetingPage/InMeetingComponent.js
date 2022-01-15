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
    faPaperPlane
} from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { map } from 'jquery';


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
    },
    {
        id: 6,
        name: 'Pepito Perez',
        avatar: null
    },
    {
        id: 7,
        name: 'Cristhian Camilo',
        avatar: null
    },
    {
        id: 8,
        name: 'Angela Saavedra',
        avatar: avatarImg
    },
    {
        id: 9,
        name: 'Pepito Perez',
        avatar: null
    }
]

const UserBox = props => {

    const { user } = props;

    return <Col xs={12} md={3} className='user-box'>
        {
            user.avatar ? 
            <img src={user.avatar} className=''/>
            :
            <div className='user-initials'>
                {user.name[0]}
            </div>
        }
        
    </Col>
}

const Controls = () => {

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