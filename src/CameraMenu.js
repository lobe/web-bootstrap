import React, { useState } from "react";
import { CenterModal } from 'react-spring-modal'
import 'react-spring-modal/dist/index.css'
import './App.css'

function CameraMenu(props) {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <button onClick={() => setOpen(true)}>Select Camera Device</button>
            <CenterModal
                className="cameraModal"
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                style={{
                    backgroundColor: '#F2F2F0',
                    padding: '1.5rem 2rem',
                    borderRadius: '25px',
                }}
            >
                <h1>Select Camera Device</h1>
            </CenterModal>
        </>
    )
}

export default CameraMenu;