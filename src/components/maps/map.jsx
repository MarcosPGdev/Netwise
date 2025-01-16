import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ location }) => {
    const [map, setMap] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(location);
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '10px'
    };

    const onLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    useEffect(() => {
        if (location) {
            setSelectedLocation(location);
        }
    }, [location]);

    return (
        <>
            { !location ? (
                <div>Ubicación sin definir</div>
            ) : (
                <LoadScript googleMapsApiKey="">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={selectedLocation}
                        zoom={13}
                        onLoad={onLoad}
                    >
                        <Marker
                            position={selectedLocation}
                            onClick={() => setShowInfoWindow(true)}
                        />
                        {showInfoWindow && (
                            <InfoWindow
                                position={selectedLocation}
                                onCloseClick={() => setShowInfoWindow(false)}
                            >
                                <div>
                                    <h4>Ubicación seleccionada</h4>
                                    <p>{`Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
                )
            }
        </>
    );
};

export default MapComponent;
