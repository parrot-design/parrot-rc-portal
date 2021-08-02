import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForkRef, setRef } from '@parrotjs/react-hooks';
import { IPortalProps } from '.';

function getContainer(container: any) {
    return typeof container === 'function' ? container() : container;
} 

const Portal = React.forwardRef((props: IPortalProps, ref) => {

    const {
        children,
        container,
        disablePortal = false
    } = props;

    const handleRef = useForkRef(React.isValidElement(children) ? (children as any).ref : null, ref)

    const [mountNode, setMountNode] = useState<any>(null);

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
                [ref as any]: handleRef,
            });
        }
        return children;
    }

    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;

});

export default Portal;