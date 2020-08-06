import React, { useState } from "react";
import { CenterModal } from 'react-spring-modal'
import 'react-spring-modal/dist/index.css'
import Select from 'react-select'
import './App.css'

function CameraMenu(props) {
    const [isOpen, setOpen] = useState(false)
    const [deviceId, setDeviceId] = useState(props.deviceId)

    React.useEffect(() => {
        setDeviceId(props.deviceId)
      }, [props.deviceId]);

    function handleChange(event) {
        props.onChange(event.target.value)
    }

    const deviceLabels = props.devices.map((device, key) => (
            <option value={device.deviceId || `Device ${key + 1}`}>{device.label || `Device ${key + 1}`}</option>
    ))

    return (
        <div class="cameraMenu">
            <select onChange={handleChange} value={deviceId} onChange={handleChange}>
                {deviceLabels}
            </select>
        </div>
    )
}

export default CameraMenu;