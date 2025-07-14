'use client';

import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import styles from '../css/find.module.css';

import FiltersPanel from "../components/FiltersPanel";

export default function Find() {
    // -- STATES --
    const [position, setPosition] = useState(null);
    const [radius, setRadius] = useState(5000);
    const [places, setPlaces] = useState([]);

    // -- GEOLOCATION LOGIC --
    useEffect(() => {
        if (navigator.geolocation) {
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
            console.error("Geolocation is not supported by this browser.");
            setPosition({ lat: 34.0522, lng: -118.2437 }); // LA
        }
    }, []);


    return (
        <main className={styles.pageContainer}>
            <div className={styles.mainCard}>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS}>

                    {/*  Filters */}
                    <div className={styles.filtersContainer}>
                        <FiltersPanel radius={radius} setRadius={setRadius} />
                    </div>
                    
                    <div className={styles.mapContainer}>
                        {position ? (
                            <Map
                                defaultCenter={position}
                                defaultZoom={14}
                                mapId="what-to-eat-map"
                                disableDefaultUI={true}
                            >
                                <AdvancedMarker position={position} />
                            </Map>
                        ) : (
                            <div className={styles.loadingState}>
                                <h1>Getting your location...</h1>
                            </div>
                        )}
                    </div>


                </APIProvider>
            </div>
        </main>
    );
}
