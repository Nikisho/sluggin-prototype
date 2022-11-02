import { StyleSheet, Text, Sa, SafeAreaView, View, TextInput, TouchableOpacity, DatePickerIOSBase } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button } from '@rneui/base';
import { Icon } from "@rneui/themed";
import { setOrigin } from '../slices/navSlice';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const HomeScreen = (currentDate) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      console.log(currentDate)
      setShow(false);
      setDate(currentDate);
    };
  
  return (
    <SafeAreaView style={tw`justify-center bg-gray-300 h-full`}>
        <View style={tw`mx-7 bg-white rounded-2xl`}>

            {/* textInputFrom */}
            <GooglePlacesAutocomplete 
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 15,
                    },
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en"
                }}
                placeholder='where from?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
            {/* textInputWhereTo */}
            <GooglePlacesAutocomplete 
                styles={{
                    container: {
                        flex: 0,
                        borderTopWidth: 0.3,
                        borderTopColor: "gray",
                        borderBottomWidth: 0.3,
                        borderBottomColor: "gray",

                    },
                    textInput: {
                        fontSize: 15,
                    },
                }}
                onPress={(data, details = null) => {
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    dispatch(setDestination(null))
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en"
                }}
                placeholder='where to?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}

            />
            <View style={tw`flex flex-row p-2 items-center`}>
                <Icon
                    name='calendar-outline'
                    type='ionicon'
                    size={30}
                    onPress={() => setShow(true)}
                />
                <Text style={tw`px-3 font-semibold`}>
                    {moment(date).format('ddd, DD MMM')}
                </Text>
            </View>
            <Button
                onPress={() => navigation.navigate('RideOptionsCard')}
                title="Search"
                titleStyle={{
                    fontWeight: 'semibold',
                    fontSize: 20
                }}
                containerStyle={{
                    height: 50,
                    backgroundColor: 'black',
                }}
                buttonStyle={{
                    borderBottomEndRadius: 5,
                    backgroundColor: 'black'
                }}
            />
            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    placeholder="select date"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                />
            )}           
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
