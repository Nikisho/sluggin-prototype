import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectRideScreen, setRideScreen } from '../slices/navSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { collection, doc, getDoc, query } from 'firebase/firestore'
import db from '../firebase'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const RideScreen = () => {

    const id = useSelector(selectRideScreen);
    console.log(id);
    const [rideData, loading] = useDocument(
        doc(db, 'TRIPS', id),
    );

    console.log(rideData?.data());
    
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
                {/* <Map/> */}
            </View>

            {/* Ride information half */}
            <View style={tw`h-2/3 m-4`} key={data.id}>

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
                                source={{ uri: data?.image }}
                            />
                            <Text style={tw`text-xl font-semibold mx-3`}>
                                {data?.name}
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
                        {data.departure_date}
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
                                {data.departure_time} - {data.city_origin}
                            </Text>
                            <Text style={tw`text-lg font-semibold`}>
                                11:40 - Birmingham
                            </Text>

                        </View>
                    </View>

                </View>

            </View>

        </View>

    )
}

export default RideScreen
