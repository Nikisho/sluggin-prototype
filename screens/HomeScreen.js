import { StyleSheet, Text, Sa, SafeAreaView, View, TextInput, TouchableOpacity, DatePickerIOSBase } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button } from '@rneui/base';
import { Icon } from "@rneui/themed";
import { setOrigin, setTravelDate } from '../slices/navSlice';
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
    <SafeAreaView style={tw`justify-center bg-green-200 h-full`}>
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
