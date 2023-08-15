import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '250px'
  };
  
  const center = {
    lat: 4.592432,
    lng: -74.197857
  };
  
  const zoomLevel = 17; // Nivel de zoom deseado
  
  const Google = () => {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCPFG0wLhE2eZ3qfzHVS9UdnvkXh3lV7mM" // Reemplaza con tu clave de API de Google
    });
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }, []);
  
    const onUnmount = React.useCallback(function callback(map) {
      // Este callback es opcional, puedes omitirlo si no lo necesitas
    }, []);
  
    return (
      <div style={{ position: 'relative' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoomLevel} // Utilizar el nivel de zoom deseado
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    );
  };
  
  export default Google;
  