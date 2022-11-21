import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import db from '../firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const PublishScreen = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onChange = ( event, selectedDate ) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTimePicker = ( event, selectedTime ) => {
        const currentTime = selectedTime;
        setShowTimePicker(false);
        setTime(currentTime);
        console.log(currentTime.getTime())
    };

    //generates a random ID to be reused to update the doc as ride info is added
    const makeid = function(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    const generateID = makeid(9);

    const addDeparture = async (data, detail) => {
        try {
            const docRef = await setDoc(doc(db, "TRIPS", generateID), {
                origin: detail,
                originCoordinates: data,
            },  { merge: true })
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    };

    const addDestination = async (data, detail) => {
        try {
            const docRef = await setDoc(doc(db, "TRIPS", generateID), {
                destination: detail,
                desinationCoordinates: data,
            },  { merge: true })
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    };

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
        {/* Header */}
        <View style={tw`justify-center items-center bg-black py-3 mx-2 rounded-xl`}>
            <Text style={tw`text-white text-xl font-semibold`}>
                Your Trip
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={tw`absolute left-4 z-50 rounded-full
                shadow-lg`}>
                <Icon name='chevron-back-outline'
                    type='ionicon'
                    color='white'
                />
            </TouchableOpacity>
        </View>
        {/* Trip info */}
        <View style={tw`mt-3 mx-3`}>
            <GooglePlacesAutocomplete 
                    styles={{
                        container: {
                            flex: 0,
                            borderRadius: 20,
                          },
                          textInput: {
                            height: 45,
                            borderWidth: 0.5,
                            fontSize: 15,
                            paddingHorizontal: 15,
                          },
                    }}
                    onPress={(data, detail=null) => {
                        addDeparture(detail.geometry.location, data.description);
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    placeholder='Where from'
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />
                <GooglePlacesAutocomplete 
                    styles={{
                        container: {
                            flex: 0,
                            borderRadius: 20,
                          },
                          textInput: {
                            height: 45,
                            borderWidth: 0.5,
                            fontSize: 15,
                            paddingHorizontal: 15,
                          },
                    }}
                    onPress={(data, detail = null) => {
                        addDestination(detail.geometry.location, data.description);
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    placeholder='Where To'
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />
            </View>
            <View style={tw`flex-row mx-3 rounded-lg border p-2 bg-black items-center`}>
                <TouchableOpacity style={tw`flex-row items-center border-r border-white mr-2 w-1/2`}
                onPress={() => setShowDatePicker(true)}
                >
                    <Icon
                        name='calendar-outline'
                        type='ionicon'
                        color='white'
                        size={30}
                        
                    />   
                    <Text style={tw`px-3 font-semibold text-white`}>
                        {/* {moment(date).format('ddd, DD MMM')} */}
                        {moment(date).format('ddd, DD MMM')}
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-row items-center`}
                onPress={() => { setShowTimePicker(true)}}>
                        <Icon
                            name='time-outline'
                            color='white'
                            type='ionicon'
                            size={30}
                        />
                        <Text style={tw`px-3 text-white font-semibold`}>
                            {moment(time).format('HH:mm')}
                        </Text>
                        {showTimePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='time'
                            is24Hour={true}
                            onChange={onChangeTimePicker}
                        />
                    )}
                </TouchableOpacity>             
            </View>            
    </SafeAreaView>
  )
}

export default PublishScreen

const styles = StyleSheet.create({})