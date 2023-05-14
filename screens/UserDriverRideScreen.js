import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectRideScreen } from '../slices/navSlice';
import { arrayRemove, deleteDoc, doc, getDoc, query, setDoc } from 'firebase/firestore';
import tw from 'tailwind-react-native-classnames';
import RideInformation from '../components/RideInformation';
import db from '../firebase';
import Map from '../components/Map';
import cancelTripAlert from '../components/ConfirmationAlert';

const UserDriverRideScreen = () => {
    const id = useSelector(selectRideScreen);
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
    const Delayed = ({ children, waitBeforeShow = 600 }) => {
        const [isShown, setIsShown] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsShown(true);
            }, waitBeforeShow);
            return () => clearTimeout(timer);
        }, [waitBeforeShow]);

        return isShown ? children : null;
    };
    //cancel ride -- delete firestore doc or update array if passenger
    const cancelRide = async () => {
        let alert = await cancelTripAlert()
        if (alert === true) {
            if (rideData.data().driverUserId !== currentUser.userAuthenticationInfo.id) {
                // if (alert === true) {
                //     try {

                //         await deleteDoc(doc(db, "TRIPS", id));
                //         console.log('CANCELLED');

                //     } catch (error) {
                //         console.error(error.message);
                //     }
                // }

            }  else if (rideData.data().passengersIdArray.includes(currentUser.userAuthenticationInfo.id)) {
                     
                    try {

                        const docRef = await setDoc(doc(db, 'TRIPS', id), {
                            //Remove user id to array of passengers ID to firestore. 
                            //Remember to hide the ride if array.length == 3. Also cap array.length to 3
                            passengersIdArray: arrayRemove(currentUser?.userAuthenticationInfo.id)
                        }, { merge: true });   

                    } catch (error) {
                        console.error(error.message);
                    }
                    
            }
        } 
        // await navigation.navigate("MyRideScreen");
    } 
    return (
        <View>
            <View style={tw`h-1/3`}>

                <Delayed>
                    <Map
                        key={rideData?.data().id}
                        origin={origin}
                        destination={destination}
                    />
                </Delayed>
            </View>
            <View style={tw`h-2/3 m-4`}>

                <RideInformation
                    rideData={rideData}
                    userData={userData}
                />

                <TouchableOpacity
                    style={tw`mt-5 bg-red-500 py-4 rounded-xl`}
                    onPress={() => cancelRide()}
                >
                    <Text style={tw`text-center text-white font-bold text-xl`}>
                        cancel trip
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default UserDriverRideScreen