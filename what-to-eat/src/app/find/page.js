'use client'

import { useState, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

export default function Find() {
    const [position, setPosition] = useState(null);
    useEffect(() => {
        if(navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }; 
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Geolocation Error: ", error);
                    setPosition({ lat: 34.0522, lng: -118.2437 }); // LA
                },
                options
            );
        } else {
            console.error("Geolocation is not supported by this browser. ");
            setPosition({ lat: 34.0522, lng: -118.2437 }); // LA
        }
    }, []);

    
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS}>
            {/* Render if we have user's location */}
            <div style={{ height: '100vh', width: '100%' }}>
                {position ? (
                    <Map
                    defaultCenter={position}
                    defaultZoom={14}
                    mapId="what-to-eat-map"
                    >
                    
                    <AdvancedMarker position={position} />
                    </Map>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <h1>Getting your location...</h1>
                        <p>Please allow location access when prompted.</p>
                    </div>
                )}
            </div>
        </APIProvider>
    );
}

