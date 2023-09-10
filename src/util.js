export function getDate(dateString){
    let date = new Date(dateString);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

export function getDateAndTime(dateString){
    let date = new Date(dateString);
    let dateOnly = getDate(date);
    let hour = date.getHours();
    let min = date.getMinutes();
    if(hour===0) hour='00';
    if(min===0) min='00';
    return `${dateOnly} ${hour}:${min}`;
}

export function getImage(filename){
    // console.log(filename);
    return require(`./assets/images/${filename}.png`);
}

// create an array from GMT-12 to GMT+12

export const timeZones = ['GMT+0', 'GMT+1', 'GMT+2', 'GMT+3', 'GMT+4', 'GMT+5', 'GMT+6', 'GMT+7', 'GMT+8', 'GMT+9', 'GMT+10', 'GMT+11', 'GMT+12', 'GMT-1', 'GMT-2', 'GMT-3', 'GMT-4', 'GMT-5', 'GMT-6', 'GMT-7', 'GMT-8', 'GMT-9', 'GMT-10', 'GMT-11', 'GMT-12']

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']