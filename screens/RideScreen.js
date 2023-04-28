import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectDestination, selectRideScreen, selectTravelTimeInformation, setRideScreen, setTravelTimeInformation } from '../slices/navSlice'
import { Icon } from '@rneui/base'
import { arrayUnion, collection, doc, getDoc, query, setDoc } from 'firebase/firestore'
import db from '../firebase'
import { useDocument } from 'react-firebase-hooks/firestore';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import FadeInView from '../components/FadeInView'

const RideScreen = () => {

    const id = useSelector(selectRideScreen);
    const [selectedButtonPressed, setSelectedButtonPressed] = useState(false);
    const navigation = useNavigation();
    const currentUser = useSelector(selectCurrentUser);
    const [rideData, setRideData] = useState(null);
    const [userData, setUserData] = useState(null);
    const extractFirestoreData = async () => {
        try {
            const queryRideData = query(doc(db, 'TRIPS', id));
            const docRef = await getDoc(queryRideData);
            if (docRef.exists()) {
                setRideData(docRef);
            };
            const queryUserData = query(doc(db, 'USERS', docRef?.data().driverUserId));
            const userDocRef = await getDoc(queryUserData);
            if (userDocRef.exists()) {
                setUserData(userDocRef);
            }

        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        extractFirestoreData();
    }, []);
    const origin = {
        description: rideData?.data().origin_description,
        location: rideData?.data().origin_coordinates
    }
    console.log(origin)
    const destination = {
        description: rideData?.data().destination_description,
        location: rideData?.data().destination_coordinates
    }
    // console.table(origin, destination)
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

    const selectRide = async () => {
        console.log('ride selected');
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const docRef = await setDoc(doc(db, 'TRIPS', id), {
            selected: true,
            //Add user id to array of passengers ID to firestore. 
            //Remember to hide the ride if array.length == 3. Also cap array.length to 3
            passengersIdArray: arrayUnion(currentUser?.userAuthenticationInfo.id,)
        }, { merge: true });
        setSelectedButtonPressed(true)
        await delay(3000);
        //publisher gets notification ride was selected
    };

    ///////////////////////////////////////////
    return (
        <View>
            <View style={tw`${selectedButtonPressed ? 'opacity-20' : ''}`}>

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

                    <View style={[tw`py-3`, {
                        borderBottomWidth: 0.5
                    }]}>

                        <View style={tw`flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center `}>
                                {/* wait for image to load from firestore before displaying  */}
                                {userData?.data().user.picture && (
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            resizeMode: 'contain',
                                            borderRadius: 100
                                        }}
                                        source={{ uri: userData?.data().user.picture }}
                                    />
                                )}

                                <Text style={tw`text-xl font-semibold mx-3`}>
                                    {userData?.data().user.name}
                                </Text>
                            </View>

                            <TouchableOpacity>
                                <Icon style={tw`bg-blue-500 p-3 rounded-xl`}
                                    name='message'
                                    color='white'
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={tw`flex-row mb-2 mt-3 items-center px-2`}>
                        <Text style={tw`font-bold text-lg pr-3`}>
                            4/5
                        </Text>
                        <Icon
                            name='star'
                            type='ionicon'
                            color='green'
                            size={20}
                        />
                    </View> */}

                    </View>
                    <View style={tw`py-3`}>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-xl font-bold`}>
                                {moment(rideData?.data().departure_time).format("DD, MMM yyyy")}
                            </Text>
                            <Text style={tw`text-white bg-black text-lg py-2 px-3`}>
                                £{rideData?.data().price_per_seat}
                            </Text>
                        </View>
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

                    <TouchableOpacity
                        style={tw`mt-5 bg-black py-4 rounded-xl`}
                        onPress={() => selectRide().then(() => navigation.navigate('HomeScreen'))}
                    >
                        <Text style={tw`text-center text-white font-bold text-xl`}>
                            Select
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
            {selectedButtonPressed && (
                <FadeInView

                    style={{
                        position: 'absolute',
                        top: '40%',
                        right: '38%',

                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        backgroundColor: '#78b13f',

                    }}>
                    <Icon
                        name='checkmark-outline'
                        type='ionicon'
                        size={60}
                        style={tw`pt-4`}
                    />
                </FadeInView>
            )}

        </View>
    )
}

export default RideScreen

const styles = StyleSheet.create({

    onSelectOpcatiy: {
        opacity: 1,
        transition: 'opacity',
    }

})