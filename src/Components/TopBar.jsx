import * as React from 'react';
import { getImage } from '../util';
const Height = '156';

function TopBar() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#1a1a1a', width: 'auto'}}>
           <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>
                <img src = {getImage('left')} alt = 'None' ></img>
                <img src = {getImage('logo')} alt = 'None' ></img>
                <img src = {getImage('right')} alt = 'None' ></img>
            </div>
        </div>
    )
}

export default TopBar;