import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectRideScreen, selectTravelTimeInformation, setRideScreen, setTravelTimeInformation } from '../slices/navSlice'
import { Icon } from '@rneui/base'
import { collection, doc } from 'firebase/firestore'
import db from '../firebase'
import {  useDocument } from 'react-firebase-hooks/firestore';
import moment from 'moment'

const RideScreen = () => {
    const id = useSelector(selectRideScreen);
    const [rideData, loading] = useDocument(
        doc(db, 'TRIPS', id),
    );
    const origin = {
            description: rideData?.data().origin_description,
            location:  rideData?.data().origin_coordinates
    }
    const destination = {
        description: rideData?.data().destination_description,
        location: rideData?.data().destination_coordinates
    }
    //TESTS////////////////////////////////////////////////////
    console.log('RIDE ID IS: ' + id);   
    console.log(origin) ;
    //Timer to delay Map component
    const Delayed = ({ children, waitBeforeShow = 500 }) => {
        const [isShown, setIsShown] = useState(false);
      
        useEffect(() => {
          const timer = setTimeout(() => {
            setIsShown(true);
          }, waitBeforeShow);
          return () => clearTimeout(timer);
        }, [waitBeforeShow]);
      
        return isShown ? children : null;
    };

    ///////////////////////////////////////////
    return (
        <View>
            {/* Map half of screen */}
            <View style={tw`h-1/3`}>

                <Delayed>
                    <Map
                        key={rideData?.data().id}
                        origin={origin}
                        destination={destination}
                    />
                </Delayed>

            </View>

            {/* Ride information half */}
            <View style={tw`h-2/3 m-4`}>

                <View style={[tw``, {
                    borderBottomWidth: 0.5
                }]}>

                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row `}>

                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',
                                    borderRadius: 100
                                }}
                                source={{ uri: 'https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1600' }}
                            />
                            <Text style={tw`text-xl font-semibold mx-3`}>
                                {rideData?.data().name}
                            </Text>
                        </View>

                        <TouchableOpacity>
                            <Icon style={tw`bg-blue-500 p-3 rounded-full`}
                                name='message'
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`flex-row mb-2 mt-3 items-center px-2`}>
                        <Text style={tw`font-bold text-lg pr-3`}>
                            4/5
                        </Text>
                        <Icon
                            name='star'
                            type='ionicon'
                            color='green'
                            size={20}
                        />
                    </View>

                </View>
                <View style={tw`py-3`}>
                    <Text style={tw`text-xl font-bold`}>
                        {rideData?.data().departure_date}
                    </Text>

                    {/* Journey Info */}
                    <View style={tw`flex-row py-8`}>

                        {/* line icon and dots */}
                        <View style={tw`items-center pr-3`}>
                            <Icon style={tw`-mb-1`}
                                name='ellipse-outline'
                                color='black'
                                type='ionicon'
                                size={20}
                            />
                            <View style={{
                                backgroundColor: 'black',
                                width: 3,
                                height: 100,
                            }}>

                            </View>

                            <Icon style={tw`-mt-1`}
                                name='ellipse-outline'
                                color='black'
                                type='ionicon'
                                size={20}
                            />
                        </View>

                        {/* Origin and departure time */}
                        <View style={tw`justify-between`}>
                            <Text style={tw`text-lg font-semibold`}>
                                {moment(rideData?.data().departure_time).format('hh:mm')} - {rideData?.data().city_origin}
                            </Text>

                            <Text style={tw`text-lg font-semibold`}>
                                {moment(rideData?.data().arrival_time).format('hh:mm')} - {rideData?.data().city_destination}
                            </Text>

                        </View>
                    </View>

                </View>

            </View>

        </View>

    )
}

export default RideScreen
