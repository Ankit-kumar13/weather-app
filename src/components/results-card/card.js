import React from 'react'

import { DegreesToDirection, Month, Weekday, Day } from '../../helpers/utils'
import { Clock } from '../clock/clock';
import './card.scss';

export const CardData = ({ data }) => {
    
    const { name } = data;
    const { country } = data.sys;
    const { temp, temp_min, temp_max, feels_like, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed, deg } = data.wind;

  return (
    <div className="card-wrapper">
      <header>
        <div>
          <img 
          src={require(`../../images/clock.png`)} 
          alt='time icon'
          />
          <Clock />
        </div>
        <h5>{Weekday}, {Month} {Day}</h5>
      </header>
      <main>
        <div className='weather-main'>
          <img 
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
          className='weather-icon'/>
          <div>
            <h2>{name}, {country}</h2>
            <h3 className='description'>{description}</h3>
          </div>
        </div>
        <div className='temp-main'>
          <h5>Feels like {`${Math.floor(feels_like - 273)}°C`}</h5>
          <h1 className='temperature'>{`${Math.floor(temp- 273)}°C`}</h1>
          <div className='hi-lo'>
            <h5>H {`${Math.floor(temp_max- 273)}°C`}</h5>
            <h5>L {`${Math.floor(temp_min- 273)}°C`}</h5>
          </div>
        </div>
      </main>
      <footer>
        <div className='weather-prop'>
          <img src={require('../../images/wind.png')} alt=''/>
          <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
        </div>
        <div className='weather-prop'>
          <img src={require('../../images/drop.png')} alt=''/>
          <h4>{humidity} %</h4>
        </div>
      </footer>
    </div>
  );
}