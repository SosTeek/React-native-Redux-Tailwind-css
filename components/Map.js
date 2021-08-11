import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectOrigin, selectDestination } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "@env";


const Map = () => {
    const origin = useSelector(selectOrigin);  
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if(!origin && !destination) return;
        
        // Zoom & fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding:{top:50, right:50, bottom:50, left:50}
        })
    }, [origin, destination]);

    useEffect(()=> {
        if(!origin && !destination) return;
        const getTravelTime = async () => {
            // const URL = `https://maps.googleapis.com/maps/distancematrix/json?units=imperial&origins=${origin.description
            //             }&destinaions=${destination.description}&key=${GOOGLE_API_KEY}`
            fetch(`https://maps.googleapis.com/maps/distancematrix/json
            ?units=imperial&origins=butwal&destinations=kathmandu&key=${GOOGLE_API_KEY}`)
            .then((res) => res.json())
            .then((data) => console.log(data))
            getTravelTime();
        }
    }, [origin, destination, GOOGLE_API_KEY])
    
    return (
        <MapView
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: 27.636526, 
                longitude: 83.495933,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            <MapViewDirections
                // origin={origin.description}
                // destination={destination.description}
                origin='Nepal'
                destination='India'
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor="black"
            />
            <Marker
                coordinate={{
                    latitude: 27.636526, 
                    longitude: 83.495933,
                }}
                title="Origin"
                identifier='origin'
            />
            <Marker
                coordinate={{
                    latitude: 27.653467, 
                    longitude: 83.468446

                }}
                title="Destination"
                identifier='destination'
            />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})

