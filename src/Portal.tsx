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

    const handleRef = useForkRef(React.isValidElement(children) ? (children as any).ref : null, ref);
  
    if (disablePortal) {
        if (React.isValidElement(children)) {
            return React.cloneElement((children as any), {
                ref: handleRef,
            });
        }
        return children;
    }

    return ReactDOM.createPortal(children, getContainer(container) || document.body);

});

export default Portal;