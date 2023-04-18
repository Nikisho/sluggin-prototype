import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelDate, setRideScreen } from '../slices/navSlice'
import moment from 'moment'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import db from '../firebase'

const RideOptionsCard = () => {

  const date = useSelector(selectTravelDate);
  const queriedOrigin = useSelector(selectOrigin);
  const queriedDestination = useSelector(selectDestination);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [rideData, setRideData] = useState([]);

  const query_rides_3 = query(collection(db, "TRIPS"));
  // const query_rides_1 = query(collection(db, "TRIPS"), where("departure_date", "==", `${moment(date).format("L")}`));
  // const query_rides_2 = query(collection(db, "TRIPS"), where("city_origin", "==", `${queriedOrigin.cityName}`));
  // const query_rides_3 = query(collection(db, "TRIPS"), where("city_destination", "==", `${queriedDestination.cityName}`));
  // const query_rides_4 = query(collection(db, "TRIPS"), where("selected", "==", false));

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
      console.error(error.message)
    }
  };

  //This prevents the ForEach from running infinitly, which causes infinite rerendering.
  useEffect(() => {
    pushRidesToArray();
  }, []);

  const selectRide = async (id) => {
    dispatch(setRideScreen(id));
    navigation.navigate('RideScreen');
  };

  return (
    <SafeAreaView style={tw``}>
      {/* Header */}
      <View style={tw`mx-2 rounded-xl justify-center items-center h-12 bg-black`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={tw`absolute left-4 z-50 rounded-full
          shadow-lg`}>
          <Icon name='chevron-back-outline'
            type='ionicon'
            color='white'
          />
        </TouchableOpacity>
        <Text style={tw`text-xl text-white`}>
          {moment(date).format('ddd, DD MMM')}
        </Text>
      </View>
      <View >
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={rideData}
          scrollEnabled
          keyExtractor={(item) => item.id}
          renderItem={({ item:
            {
              id,
              DriverUsername,
              city_origin,
              city_destination,
              departure_time,
              price_per_seat,
              DriverUserImage,
            } }) => (
            <TouchableOpacity style={tw`justify-between px-3 py-3 bg-white m-2 rounded-xl shadow-lg`}
              onPress={() => selectRide(id)}
            >
              <View style={tw`flex-row justify-between `}>
                <Text style={tw`font-bold`}>{city_origin}</Text>
                <Icon
                  name='arrow-forward-circle-outline'
                  style={tw` rounded-full`}
                  type='ionicon'
                  color='black'
                />
                <Text style={tw`font-bold`}>
                  {city_destination}
                </Text>
              </View>
              <View style={tw`flex-row justify-between pb-2`}>
                <Text style={tw`text-lg`}>{moment(departure_time).format('hh:mm')}</Text>
                <Text style={tw`text-lg`}>{moment(departure_time).format('hh:mm')}</Text>
              </View>
              <View style={tw`flex-row justify-between`}>

                <View style={tw` items-center flex-row`}>

                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'contain',
                      borderRadius: 100
                    }}

                    source={
                      {
                        uri: DriverUserImage
                      }
                    }
                  />
                  <View style={tw`px-4`}>
                    <Text style={tw`text-lg font-semibold`}>{DriverUsername}</Text>
                    {/* <Text>{travelTimeInformation?.duration?.text}</Text> */}

                    <View style={tw`items-center flex-row`}>
                      <Text style={tw`text-lg px-2`}>
                        4.5
                      </Text>
                      <Icon
                        name='star'
                        type='ionicon'
                        color='green'
                        size={20}
                      />
                    </View>

                  </View>

                </View>

                <View style={tw`justify-center items-center bg-black h-10 w-14`}>
                  <Text style={tw`text-lg text-white `}>
                    £{price_per_seat}
                  </Text>
                </View>

              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard
