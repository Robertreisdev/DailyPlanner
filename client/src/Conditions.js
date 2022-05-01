import React from 'react';
import classes from './Conditions.css';
import {WiCloud} from 'react-icons/wi';
import {BsCloudSun} from 'react-icons/bs';
import {BsFillCloudDrizzleFill} from 'react-icons/bs';
import {BsCloudDrizzle} from 'react-icons/bs';
import {BsSun} from 'react-icons/bs';
import {BsCloudSnow} from 'react-icons/bs';
import {IoThunderstormOutline} from 'react-icons/io5';
import {RiMistFill} from 'react-icons/ri';




const Conditions = (props) => {
   return (
       <div>
            {props.error && <small>Please enter a valid city.</small>}
            {props.loading && <div>Loading...</div>}
            {props.responseObj.cod === 200 ?
               <div className="temp">
                   <div class="city-name">{props.responseObj.name}</div>
                   It is currently {currentTime()}
                   <div className="degree">{Math.round(props.responseObj.main.temp)}°C </div>
                   <div className="weather-icon">{weatherIcon(props.responseObj.weather[0].description)}</div>
                   {props.responseObj.weather[0].description} <br/>
                   Sunrise:                                             {timeConverter(props.responseObj.sys.sunrise)} <br/>
                   Sunset:                                              {timeConverter(props.responseObj.sys.sunset)} <br/>
                   High:                                                {Math.round(props.responseObj.main.temp_max)}°C <br/>
                   Low:                                                 {Math.round(props.responseObj.main.temp_min)}°C
               </div>
           : null
           }
       </div>
   )
}
function currentTime(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var today = new Date();
    var date = dayNames[today.getDay()]+ " " +(monthNames[today.getMonth()]) + " " + today.getDate();
    var time = today.getHours()%12 + ":" + ((today.getMinutes()).toString()).padStart(2,'0');
    var am = "am";
    if (today.getHours()>12){
        am = "pm";
    }
    var dateTime = time + am + ' on  ' + date;
    return dateTime;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = ((a.getMinutes()).toString()).padStart(2,'0');
    var am = "am";
    if (hour>12){
        hour -= 12;
        am = "pm";
    }
    var time = ' ' + hour + ':' + min + " " + am ;
    return time;
  }

function weatherIcon(weather){
    switch (weather){
        case "clear sky":
            return <BsSun/>
        case "few clouds":
            return <BsCloudSun/>
        case "scattered clouds":
            return <WiCloud/>
        case "broken clouds":
            return <WiCloud/>
        case "shower rain":
            return <BsFillCloudDrizzleFill/>
        case "rain":
            return <BsCloudDrizzle/>
        case "thunderstorm":
            return <IoThunderstormOutline/>
        case "snow":
            return <BsCloudSnow/>
        case "mist":
            return <RiMistFill/>
        default:
            break;
    }
}

export default Conditions;  