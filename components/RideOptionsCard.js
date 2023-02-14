import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelDate, setRideScreen } from '../slices/navSlice'
import moment from 'moment'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { collection, getDocs, query, where } from 'firebase/firestore'
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
    let dummyArray = [];
    try {

      const querySnapshot = await getDocs(query_rides_3);
      querySnapshot.forEach((document) => {

        dummyArray.push(document.data());

      });
      setRideData(dummyArray);
    } catch (error) {
      console.error(error.message)
    }
  };

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
      <View style={tw`mx-2 rounded-xl justify-center items-center h-14 bg-black`}>
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
      <View>
        <FlatList
          data={rideData}
          nestedScrollEnabled
          keyExtractor={(item) => item.id}
          renderItem={({ item:
            {
              id,
              name,
              city_origin,
              city_destination,
              departure_time,
              price_per_seat,
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
              <View style={tw`flex-row justify-between py-3`}>

                <View style={tw` items-center flex-row`}>

                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'contain',
                      borderRadius: 100
                    }}
                    source={{ uri: "https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1600" }}
                  />
                  <View style={tw`px-4`}>
                    <Text style={tw`text-lg font-semibold`}>{name}</Text>
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
