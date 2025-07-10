'use client'

import { useState, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Find() {
    const [position, setPosition] = useState(null);
    // Get User's Location

    useEffect(() => {
        if(navigator.geolocation) {
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
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser. ");
            setPosition({ lat: 34.0522, lng: -118.2437 }); // LA
        }
    }, []);


    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS}>
            <Map
            style={{width: '100vw', height: '100vh'}}
            defaultCenter={{lat: 34.0522, lng: -118.2437}}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}

            />
        </APIProvider>
    )
}

