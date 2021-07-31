import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForkRef, setRef } from '@parrotjs/react-hooks';

function getContainer(container) {
    return typeof container === 'function' ? container() : container;
}
console.log("ReactDOM", ReactDOM);
const Portal = React.forwardRef((props, ref) => {
    const { children, container, disablePortal = false } = props;
    const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);
    const [mountNode, setMountNode] = useState(null);
    useEffect(() => {
        if (!disablePortal) {
            setMountNode(getContainer(container) || document.body);
        }
    }, [disablePortal, container]);
    useEffect(() => {
        if (mountNode && !disablePortal) {
            setRef(ref, mountNode);
            return () => {
                setRef(ref, null);
            };
        }
        return undefined;
    }, [ref, mountNode, disablePortal]);
    useEffect(() => {
        if (mountNode && !disablePortal) {
            setRef(ref, mountNode);
            return () => {
                setRef(ref, null);
            };
        }
        return undefined;
    }, [ref, mountNode, disablePortal]);
    if (disablePortal) {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                [ref]: handleRef,
            });
        }
        return children;
    }
    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

export default Portal;
