import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const dashBoard = () => {
    return (
        <div style={{display:'flex',flexDirection:'column'}}>
            <div>
                <div style={{backgroundColor:'lightgreen',padding:'50px'}}>
                    <h1 style={{textAlign:'center'}}>My Website</h1>
                    <h2 style={{textAlign:'center'}}>With a fexible layout</h2>
                </div>
                <div style={{display:'flex',flexDirection:'row',backgroundColor:'black'}}>
                    <Button>Link</Button>
                    <Button>Link</Button>
                    <Button>Link</Button>
                    <Button>Link</Button>
                </div>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{backgroundColor:'gray',paddingLeft:'20px',paddingTop:'40px',paddingRight:'80px',paddingBottom:'40px'}}>
                    <h2>About Me</h2>
                    <h4>Photo of me</h4>
                    <div style={{height:'200px',width:'200px',backgroundColor:'lightyellow'}}>
                        <img src='asd' alt='Image'/>
                    </div>
                    <h3>More Text</h3>
                    <p>Lorem ipsu dolor sit ame.</p>
                    <div style={{display:'flex', flexDirection:'column',backgroundColor:'lightyellow',height:'50px',width:'200px',border:'2px solid #333',margin:'10px'}}>
                        <img src='asd' alt='Image'/>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',backgroundColor:'lightyellow',height:'50px',width:'200px',border:'2px solid #333',margin:'10px'}}>
                        <img src='asd' alt='Image'/>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',backgroundColor:'lightyellow',height:'50px',width:'200px',border:'2px solid #333',margin:'10px'}}>
                        <img src='asd' alt='Image'/>
                    </div>
                </div>
                <div>
                    <h1>Title Heading</h1>
                    <h3>Title Description, Dec 7, 2017</h3>
                    <img src='asd' alt='Image'/>
                    <p>Some text...</p>
                    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    <h1>Title Heading</h1>
                    <h3>Title Description, Dec 7, 2017</h3>
                    <img src='asd' alt='Image'/>
                    <p>Some text...</p>
                    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                </div>
            </div>
            <div style={{backgroundColor:'lightgray'}}>
                footer
            </div>
        </div>
    )
}

export default dashBoard;