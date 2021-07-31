import React, { ReactElement } from 'react';

export { default } from './Portal';

export interface IPortalProps{ 
    children?:any;
    container?:any;
    disablePortal?:boolean;
} 