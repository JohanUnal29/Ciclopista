import React, { useContext, useState } from 'react';
import ModalLogin from './ModalLogin.jsx';
import { BsFillPersonFill } from 'react-icons/bs';

export default function LoginWidget() {

    const [modalShow, setModalShow] = useState(false);
    return (
        <><ModalLogin show={modalShow} onHide={() => setModalShow(false)}/>

            <div className='Menu' onClick={() => setModalShow(true)}><BsFillPersonFill className="login-icon" /></div></>
    )
}
