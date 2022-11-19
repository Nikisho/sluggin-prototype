import { StyleSheet, Text, Sa, SafeAreaView, View, TextInput, TouchableOpacity, DatePickerIOSBase } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button } from '@rneui/base';
import { Icon } from "@rneui/themed";
import { setDestination, setOrigin, setTravelDate } from '../slices/navSlice';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate ) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        dispatch(setTravelDate(currentDate.toDateString()))
        console.log(date.toDateString()+' LOOKHERE')
    };
  
  return (
    <SafeAreaView style={tw`h-full`}>
        <View style={tw`top-1/3 mx-7 bg-white shadow-lg rounded-xl p-3`}>

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
                onPress={(data, details=null)=> {
                    dispatch(
                      setDestination({
                        location: details.geometry.location,
                        description: data.description,
                      })
                    );
                    // navigation.navigate('RideOptionsCard');
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
            <TouchableOpacity 
                onPress={() => setShow(true)}
                style={tw`flex flex-row p-2 items-center`}>
                    <Icon
                        name='calendar-outline'
                        type='ionicon'
                        size={30}
                        
                    />
                    <Text style={tw`px-3 font-semibold`}>
                        {moment(date).format('ddd, DD MMM')}
                    </Text>
            </TouchableOpacity>
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
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                />
            )}           
        </View>
      <View style={[tw`flex-row justify-between absolute bottom-0 bg-white w-full h-20 p-3 px-10`, {borderTopWidth: 0.5}]}>
        <TouchableOpacity>
            <Icon
                name='home'
                size={40}
            />
            <Text>
                Home
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('PublishScreen')}
        >
            <Icon
                name='add-circle'
                size={40}
            />
            <Text>
                Submit
            </Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon
                name='person'
                size={40}
            />
            <Text>
                Account
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
