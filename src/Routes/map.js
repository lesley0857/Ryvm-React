import React, { useMemo } from "react";
import { GoogleMap, Marker, DirectionsRenderer, Circle, useLoadScript } from "@react-google-maps/api";
import { useActionData } from "react-router-dom";
import './CSS_folder/Map.css';


const center = { lat: 43, lng: -80 }

function Map() {
    //const center = useMemo(() => ({ lat: 43, lng: -80 }), [])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAepZYyBoiaCCNd-SJkd7ChgHeGd3fpEbY',
        libraries: ["places"],
    });
    if (!isLoaded) return <div>Loading....</div>;
    return <div><GoogleMap zoom={10}
        center={center}
        mapContainerClassName="mapCont">
    </GoogleMap>
    </div>;
}
export default Map