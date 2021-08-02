import React from 'react';
import ReactDOM from 'react-dom';
import { useForkRef } from '@parrotjs/react-hooks';

function getContainer(container) {
    return typeof container === 'function' ? container() : container;
}
const Portal = React.forwardRef((props, ref) => {
    const { children, container, disablePortal = false } = props;
    const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);
    if (disablePortal) {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                ref: handleRef,
            });
        }
        return children;
    }
    return ReactDOM.createPortal(children, getContainer(container) || document.body);
});

export default Portal;
