import { View, Text, TouchableOpacity } from 'react-native';
import React from "react";
import tw from 'tailwind-react-native-classnames';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { selectRideScreen } from '../slices/navSlice';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import db from '../firebase';
import moment from 'moment';

const ConfirmRideDetailsScreen = () => {

  const navigation = useNavigation();
  const ride_id = useSelector(selectRideScreen);

  const [rideData, loading] = useDocument(
    doc(db, 'TRIPS', ride_id),
  );

  console.log(rideData?.data());

  const travel_date = moment(rideData?.data().departure_time).format("DD, MMM yyyy");
  const travel_departure_time = moment(rideData?.data().departure_time).format('hh:mm');
  const travel_arrival_time = moment(rideData?.data().arrival_time).format('hh:mm');
  const travel_time = moment(rideData?.data().travel_time).format('hh:mm');
  const origin_description = rideData?.data().origin_description;
  const destination_description =rideData?.data().destination_description;
  const price_per_seat = rideData?.data().price_per_seat;

  return (
    <SafeAreaView style={tw`mx-2 `} >
      <View style={tw`rounded-xl justify-center items-center h-14 bg-black`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RideScreen')}
          style={tw`absolute left-4 z-50 rounded-full
          shadow-lg`}>
          <Icon name='chevron-back-outline'
            type='ionicon'
            color='white'
          />
          
        </TouchableOpacity>
        <Text style={tw`text-white font-semibold`}>{travel_date} </Text>
      </View>

      <View style={tw`flex-row justify-between p-5 rounded-xl bg-white shadow-lg my-2 `}>
          <View>
            <Text>{origin_description}</Text>
            <Text>{travel_departure_time}</Text>

          </View>
          <View>
            <Text>{destination_description}</Text>
            <Text>{travel_arrival_time}</Text>
          </View>
      </View>

      <View style={tw`flex-row justify-between p-5 rounded-xl bg-white shadow-lg mb-2`}>
        <View style={tw`flex-row justify-center `}>
          <Icon
            type='ionicon'
            name='timer-outline'
            size={20}
          />
          <Text style={tw`px-2 font-semibold text-sm`}>{travel_time}</Text>
        </View>
        
        <Text>£ {price_per_seat}</Text>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmRideDetailsScreen