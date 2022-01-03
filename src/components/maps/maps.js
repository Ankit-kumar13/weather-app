import React from "react";
import GoogleMapReact from 'google-map-react';
import "./maps.scss";

const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

export default function Maps({ data }) {
  return (
    <div className="google-maps">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCKASCicowrv8yAMCf1de8f2v67ynkh6Jk",
          language: "en",
          region: "US"
        }}
        center={{ lat: data && data.coord ? data.coord.lat : 24.79686000, lng: data && data.coord ? data.coord.lon : 85.00385000 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >

        <Marker lat={data && data.coord ? data.coord.lat : 24.79686000} lng={data && data.coord ? data.coord.lon : 85.00385000} 
        />
      </GoogleMapReact>
    </div>
  );
}

const Marker = data => {

  return  <>
  <div className="pin"></div>
  <div className="pulse"></div>
  </>
}




