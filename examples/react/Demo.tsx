import React , { useEffect, useRef }from 'react';
import { Button } from '@material-ui/core';
import Portal from '../../src';
import "./index.css";

const Demo=()=>{

    const ref=useRef(null);

    useEffect(()=>{
        console.log("Demoeffect")
    },[])

    return (
        <div>
            <Portal ref={ref} disablePortal>
                <div>我在body以外</div>
            </Portal>
        </div>
    )
}

export default Demo;