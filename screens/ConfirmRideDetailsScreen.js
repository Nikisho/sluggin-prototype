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
      </View>

      <View style={tw`flex-row justify-between p-5 rounded-xl bg-white shadow-lg my-2 `}>
          <View>
            <Text>{rideData?.data().origin_description}</Text>
            <Text>{moment(rideData?.data().departure_time).format('hh:mm')}</Text>

          </View>
          <View>
            <Text>{rideData?.data().destination_description}</Text>
            <Text>{moment(rideData?.data().arrival_time).format('hh:mm')}</Text>
          </View>
      </View>

      <View style={tw`flex-row justify-between p-5 rounded-xl bg-white shadow-lg mb-2`}>
        
      </View>
    </SafeAreaView>
  )
}

export default ConfirmRideDetailsScreen