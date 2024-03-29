import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useRef } from 'react';
import { useEffect } from 'react';

const Map = ({origin, destination}) => {
    const mapRef = useRef(null);

    useEffect(() => {
      if (!origin || !destination ) return;

            const zoomTimer = setInterval(() => {
                mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                });
                clearInterval(zoomTimer);
            }, 512);   
      
    }, [origin, destination]);

  return (
    <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}   

    >
        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
            />
        )}
        {origin?.location && (
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,            
                }}
                title="Origin"
                description={origin.description}
                identifier="origin"
            />
        )}
        {destination?.location && (
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,            
                }}
                title="Destination"
                description={destination.description}
                identifier="destination"
            />
        )}        
    </MapView>
  )
}

export default Map


const styles = StyleSheet.create({})