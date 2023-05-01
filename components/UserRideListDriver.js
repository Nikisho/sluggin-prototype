import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../slices/navSlice';
import RideList from './RideList';

const UserRideListDriver = () => {
    const currentUser = useSelector(selectCurrentUser)
    const query_rides_3 = query(collection(db, "TRIPS"), where("driverUserId", "==", currentUser.userAuthenticationInfo.id));
    console.log(currentUser.userAuthenticationInfo.id);
    const [rideData, setRideData] = useState([]);

    const pushRidesToArray = async function () {
        let rawFirestoreDataArray = [];
        let rideDataArray = [];
        try {
            const querySnapshot = await getDocs(query_rides_3);
            querySnapshot.forEach(async (document) => {
                //Temporary array to push the data from firstore
                rawFirestoreDataArray.push(document.data());

            });
            //After extracting the data use a normal for loop
            //to match the documents id with the driver's id. 
            for (const documentData of rawFirestoreDataArray) {
                //in the USERS collection, each document represents a user 
                //Each doc ID is the user's Id, we then match the doc id to the
                //driverUserId is the TRIPS document
                const docRef = doc(db, "USERS", documentData.driverUserId);
                const docSnap = await getDoc(docRef);
                documentData.DriverUserImage = docSnap.data().user.picture;
                documentData.DriverUsername = docSnap.data().user.name;
                rideDataArray.push(documentData);
            }
            setRideData(rideDataArray);
        } catch (error) {
            console.error(error.message);
        }
    };

    //This prevents the ForEach from running infinitly, which causes infinite rerendering.
    useEffect(() => {
        pushRidesToArray();
    }, []);
    return (
        <View>
            <RideList 
                RideData={rideData}
            />
        </View>
    )
}

export default UserRideListDriver

const styles = StyleSheet.create({})