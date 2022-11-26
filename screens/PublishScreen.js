import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import { async } from '@firebase/util'

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

const PublishScreen = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [pricePerSeat, setPricePerSeat] = useState(5.00);
    const [originPicked, setOriginPicked] = useState(false);
    const [destinationPicked, setDestinationPicked] = useState(false);

    const handleIncrement = () => {
        if (numberOfPassengers >= 3) return;
        setNumberOfPassengers(numberOfPassengers + 1);
        
        // console.log(count);
    };

    const handleDecrement = () => {
        if (numberOfPassengers <= 1) return;
        
        setNumberOfPassengers(numberOfPassengers - 1);
    };

    const onChangeText = (text) => {
        setPricePerSeat(text.replace(/[^0-9]/g, ''))
    }

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

    const addDeparture = async (data, detail) => {
        try {
            const docRef = await setDoc(doc(db, "TRIPS", generateID), {
                origin: detail,
                originCoordinates: data,
            },  { merge: true });
            setOriginPicked(true);
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    };
    
    const addDestination = async (data, detail) => {
        try {
            const docRef = await setDoc(doc(db, "TRIPS", generateID), {
                destination: detail,
                desinationCoordinates: data,
            },  { merge: true });
            setDestinationPicked(true);
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    };

    const postRideInfoToFireStore = async () => {
        try {
            const docRef = await setDoc(doc(db, "TRIPS", generateID), {
                departureDate: date.getTime(),
                deparureTime: time.getTime(),
                numberOfPassengers: numberOfPassengers,
                pricePerSeat: pricePerSeat
            },  { merge: true })
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    };

    const disablePublishButton = () => {
        if (originPicked == false || destinationPicked == false) {
            return true;
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
        <View style={tw`my-10 mx-3`}>
            <GooglePlacesAutocomplete 
                    styles={{
                        container: {
                            flex: 0,
                            borderRadius: 20,
                            shadowOffset: {
                                width: 100,
                                height: 100
                            }
                          },
                          textInput: {
                            height: 55,
                            borderWidth: 0.5,
                            fontSize: 15,
                            paddingHorizontal: 15,
                            marginBottom: 15
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
                            height: 55,
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
            <View style={tw`flex-row mx-3 rounded-lg border p-2 bg-black mt-2 items-center h-16`}>
                <TouchableOpacity style={tw`flex-row items-center border-r border-white mr-2 w-1/2`}
                onPress={() => setShowDatePicker(true)}
                >
                    <Icon
                        name='calendar-outline'
                        type='ionicon'
                        color='white'
                        size={30}
                        
                    />   
                    <Text style={tw`px-3 font-semibold text-white text-lg`}>
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
                        <Text style={tw`px-5 text-white font-semibold text-lg`}>
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

            {/* View to pick number of passengers */}
            <View style={[tw`flex-row m-3 p-2 rounded-lg items-center`, {borderWidth: 0.3}]}>
                <View style={tw`font-bold text-2xl w-1/2 border-r h-full p-5`}>
                    <Text style={tw`font-bold text-xl`}>
                        How many 
                    </Text>
                    <Text style={tw`font-bold text-xl`}>
                        passengers?
                    </Text>
                </View>
                <View style={tw`items-center px-5`}>
                    <TouchableOpacity
                        onPress={() => {handleIncrement()}}
                    >     
                        <Icon
                            name='caret-up-outline'
                            type='ionicon'
                            color='black'
                            size={40} 
                        />
                    </TouchableOpacity> 
                    <Text style={tw`font-semibold text-2xl`}>{numberOfPassengers}</Text>

                    <TouchableOpacity
                        onPress={() => {handleDecrement()}}
                    >
                        <Icon
                            name='caret-down-outline'
                            type='ionicon'
                            color='black'
                            size={40}
                        />
                    </TouchableOpacity>        
                </View>
                <View style={tw`px-3`}>
                    <Icon
                        name='person'
                        size={40}
                    />
                </View>
            </View>  

            {/* Price per seat */}
            <View style={[tw`flex-row mx-3 mt-1 bg-black rounded-lg items-center`, {borderWidth: 0.3}]}>
                <View style={tw`p-5 border-r border-white w-1/2`}>
                    <Text style={tw`text-lg font-bold text-white`}>
                        Price per seat
                    </Text>
                </View>
                <View style={tw`flex-row p-2 px-7 items-center`}>
                    <Text style={tw`text-white font-semibold text-2xl pr-2`}>
                        £ 
                    </Text>
                    <TextInput
                        style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: '500',
                            width: 100,                            
                        }}
                        editable
                        keyboardType='number-pad'
                        maxLength={30}
                        onChangeText={text => {onChangeText(text)}}
                        value={pricePerSeat.toString()}
                    />
                </View>
            </View>         

            <View style={tw`m-5 justify-center`}>
                <TouchableOpacity 
                    style={tw`bg-white rounded-2xl p-2 items-center shadow-lg top-2/3
                    ${originPicked && destinationPicked ? '' : 'opacity-20'  }`}
                    onPress={() => {postRideInfoToFireStore()}}
                    disabled={disablePublishButton()}
                >
                    <Text style={tw`font-bold text-xl`}>
                        Publish
                    </Text>
                </TouchableOpacity>
            </View> 
    </SafeAreaView>
  )
}

export default PublishScreen

const styles = StyleSheet.create({})