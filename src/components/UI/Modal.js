import React, {Fragment} from 'react';
import ReactDOM  from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}/>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div>{props.children}</div>
    </div>
}

const portal = document.getElementById('overlay');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>,portal)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portal)}
        </Fragment>
    )
};

export default Modal;