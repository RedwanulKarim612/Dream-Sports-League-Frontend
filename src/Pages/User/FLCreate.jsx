import {React} from "react";
import Navbar from "../../Components/Navbar";
import { FormControl, TextField, Typography } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const FieldHeader = (props)=>{
    return(
        <>
        <Typography variant="h6" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}> {props.title}
        </Typography>
        </>
    )
}

const FLCreate = () => {
    return (
        <div>
            <Navbar/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', padding: '20px'}}>
                <FormControl>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                        <FieldHeader title="League Name"/>
                        <TextField required id="outlined-required"/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Min Teams"/>
                        <TextField required id="outlined-required" type="number"/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Max Teams"/>
                        <TextField required id="outlined-required" type="number"/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Players in team"/>
                        <TextField required id="outlined-required" type="number"/>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Start Date"/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                        <DatePicker></DatePicker>
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", justifyContent: "space-between"}}>
                    <FieldHeader title="Match Time"/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker/>
                        </DemoContainer>
                    </LocalizationProvider>
                    </div>

                    <div style={{display:"flex",flexDirection:"row"}}>
                        <input type="checkbox"/>Allow Auto-join
                    </div>
                </FormControl>
            </div>
        </div>
    )
}

export default FLCreate