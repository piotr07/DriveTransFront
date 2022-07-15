import React, {useContext, useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon';
import {SearchContext} from "../../contexts/search.context";
import {SimpleLoadingEntity} from 'types';

import 'leaflet/dist/leaflet.css';
import './Map.css';
import { SingleLoading } from "./SingleLoading";

export const Map = () => {
    const {search} = useContext(SearchContext);
    const [loadings, setLoadings] = useState<SimpleLoadingEntity[]>([]);

    useEffect(() => {

        (async () => {
            const res = await fetch(`http://localhost:3001/loading/search/${search}`);
            const data = await res.json();
            setLoadings(data);
        })();
    }, [search]);

    return (
        <div className="map">
            {/*@ToDo*/}
            {/*<h1>Search for: {search}</h1>*/}
            <MapContainer center={[52.1567838, 21.0506848]} zoom={10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
                />
                {
                    loadings.map(loading => (
                        <Marker key={loading.id} position={[loading.lat, loading.lon]}>
                            <Popup>
                                <SingleLoading id={loading.id}/>
                            </Popup>
                        </Marker>
                    ))
                }

            </MapContainer>
        </div>
    );
}