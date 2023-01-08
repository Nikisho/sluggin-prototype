import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectRideScreen, selectTravelTimeInformation, setRideScreen, setTravelTimeInformation } from '../slices/navSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { collection, doc, getDoc, query } from 'firebase/firestore'
import db from '../firebase'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import moment from 'moment'
import { GOOGLE_MAPS_APIKEY } from "@env";

const RideScreen = () => {
    const dispatch = useDispatch();
    const id = useSelector(selectRideScreen);
    const [arrivalTime, setArrivalTIme] = useState();

    const [rideData, loading] = useDocument(
        doc(db, 'TRIPS', id),
    );
    
    const ride_origin = rideData != undefined ? rideData?.data().origin_description : null;
    const ride_destination = rideData != undefined ? rideData?.data().origin_destination : null;
    const ride_departure_time = rideData?.data().departure_time
    //Needs to be calculated on publish not here!!!!
    useEffect(() => {
        if (!ride_origin || !ride_destination) return;

        const getTravelTime = async () => {
            fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial
            &origins=${ride_origin}&destinations=${
                ride_destination}&key=${GOOGLE_MAPS_APIKEY}`
            )
            .then((res) => res.json())
            .then((data) => {

                //dispatching travel info to redux, is this needed?
                dispatch(setTravelTimeInformation(data?.rows[0].elements[0]))

                //adding number of seconds to departure time to get arrival time to display on screen
                const arrival_time = (data?.rows[0].elements[0].duration.value * 1000 ) + ride_departure_time ;
                setArrivalTIme(arrival_time);
            });
        };

        getTravelTime();

    }, [ride_destination, ride_origin, GOOGLE_MAPS_APIKEY]);

    //TEST////////////////////////////////////////////////////
    console.log('RIDE ID IS: ' + id);    

    ////////////////////////////////////////////
    const data =
    {
        id: 3,
        name: 'Jasmine',
        image: 'https://pps.whatsapp.net/v/t61.24694-24/120646598_196308208541947_5722960055077306099_n.jpg?ccb=11-4&oh=01_AdQ1YfZKrb6CdOixG-xJYjr4KxdwQhj4Ebjc94OB8pk2Xg&oe=637AA942',
        origin: 'Washington DC',
        destination: 'Brooklyn, NY',
        departureTime: '10:10',
        arrivalTime: '13:40',
        reviews: '4.8',
        price: '14'

    };

    return (
        <View>
            {/* Map half of screen */}
            <View style={tw`h-1/3`}>

                {/* <Map
                /> */}
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
                            {data?.reviews}/5
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
                                {moment(ride_departure_time).format('hh:mm')} - {rideData?.data().city_origin}
                            </Text>

                            <Text style={tw`text-lg font-semibold`}>
                                {moment(arrivalTime).format('hh:mm')} - {rideData?.data().city_destination}
                            </Text>

                        </View>
                    </View>

                </View>

            </View>

        </View>

    )
}

export default RideScreen
