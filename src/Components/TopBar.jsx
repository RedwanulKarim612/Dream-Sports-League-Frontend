import * as React from 'react';
import { getImage } from '../util';
const Height = '156';

function TopBar() {
    return (
        <div style={{display: 'flex', float: 'left', backgroundColor: '#1a1a1a', height: {Height}, width: `{100%}`}}>
           
           <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <img src = {getImage('left')} alt = 'None' width={Height * 625 / 117} height={Height}></img>
                <img src = {getImage('logo')} alt = 'None' width={Height * 207 / 119} height={Height}></img>
                <img src = {getImage('right')} alt = 'None' width={Height * 625 / 117} height={Height}></img>
            </div>
        </div>
    )
}

export default TopBar;