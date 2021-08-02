'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var reactHooks = require('@parrotjs/react-hooks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

function getContainer(container) {
    return typeof container === 'function' ? container() : container;
}
const Portal = React__default['default'].forwardRef((props, ref) => {
    const { children, container, disablePortal = false } = props;
    const handleRef = reactHooks.useForkRef(React__default['default'].isValidElement(children) ? children.ref : null, ref);
    if (disablePortal) {
        if (React__default['default'].isValidElement(children)) {
            return React__default['default'].cloneElement(children, {
                ref: handleRef,
            });
        }
        return children;
    }
    return ReactDOM__default['default'].createPortal(children, getContainer(container) || document.body);
});

module.exports = Portal;
