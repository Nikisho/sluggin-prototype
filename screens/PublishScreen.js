import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import db from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import Geocoder from 'react-native-geocoding';

//generates a random ID to be reused to update the doc as ride info is added
const makeid = function (length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
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

    //CREATE MUTABLE VARIABLES FOR THE ORIGIN AND DESTTINATION
    const [originDescription, setOriginDescription] = useState(null);
    const [originCoordinates, setOriginCoordinates] = useState(null);
    const [destinationDescription, setDestinationDescription] = useState(null);
    const [destinationCoordinates, setDestinationCoordinates] = useState(null);
    const [publishButtonPressed, setPublishButtonPressed] = useState(false);

    const minimumPricePerSeat = 5;
    const minimumNumberOfPassenger = 1;
    const maxNumberOfPassenger = 3;

    const addPassenger = () => {
        if (numberOfPassengers >= maxNumberOfPassenger) return;
        setNumberOfPassengers(numberOfPassengers + 1);
    };

    const removePassenger = () => {
        if (numberOfPassengers <= minimumNumberOfPassenger) return;
        setNumberOfPassengers(numberOfPassengers - 1);
    };

    const incrementPrice = () => {
        if (pricePerSeat >= 99) return;
        setPricePerSeat(pricePerSeat + 1);
    };

    const decrementPrice = () => {
        if (pricePerSeat <= minimumPricePerSeat) return;

        setPricePerSeat(pricePerSeat - 1)
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTimePicker = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowTimePicker(false);
        setTime(currentTime);
        console.log(currentTime.getTime())
    };

    const addDeparture = (data, detail) => {
        try {
            setOriginDescription(detail);
            setOriginCoordinates(data);
            setOriginPicked(true);

        } catch (e) {

            console.error('Error setting origin: ', e);
        }
    };
    const addDestination = (data, detail) => {
        try {
            setDestinationDescription(detail);
            setDestinationCoordinates(data);
            setDestinationPicked(true);
        } catch (e) {

            console.error('Error setting destination: ', e);
        }
    };

    //HERE WE GET THE CITY NAME OF THE DEPARTURE POINT AND
    //DESTINATION TO ADD TO FIRESTORE AND MATCH THEM WITH
    //THE RIGHT QUERIES.
    //HOWEVER THE IDEAL SCENARIO WOULD BE TO CALCULATE THE DISTANCE BETWEEN THE PICK UP POINT
    //AND THE ORIGIN QUIERIED BY THE USER AND SIMILARLY FOR THE EDROP OFF POINT.
    //I.E A USER MAY BE ABLE TO TRAVEL A FEW MILES FROM THE ORIGIN/DESTINATION 
    // REGARDLESS OF WHICH CITY THEY'RE QUIERYING FROM. HOWEVER i CAN'T BE BOTHERED 
    // TO IMPLEMENT THIS RIGHT NOW!
    const getLocality = async (coordinates) => {

        if (!coordinates) return;

        Geocoder.init(GOOGLE_MAPS_APIKEY);

        //AWAIT RESPONSE FROM GEOCODER
        const geocoderObject = await Geocoder.from({
            lat: coordinates.lat,
            lng: coordinates.lng
        });

        //GET CITY NAME
        const locality = geocoderObject.results[0].address_components[2].long_name;
        return locality;
    };

    const getTravelTime = async () => {

        try {
            const fetchedData = await fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?
                                units=imperial
                                &origins=${originDescription}&destinations=${destinationDescription}&key=${GOOGLE_MAPS_APIKEY}`
            );
            const toJason = await fetchedData.json();
            const arrival_time = (toJason?.rows[0].elements[0].duration.value * 1000) + time.getTime();
            console.log(moment(arrival_time).format('hh:mm'));
            return arrival_time;

        } catch (error) {

            console.error(error.message);
        }
    };

    //LOAD RIDE DATA TO FIRESTORE (MERGE = TRUE TO KEEP EXISTING DATA)
    const postRideInfoToFireStore = async () => {

        try {

            const arrival_time = await getTravelTime();
            const originLocality = await getLocality(originCoordinates);
            const destinationLocality = await getLocality(destinationCoordinates);
            const docRef = await setDoc(doc(db, "TRIPS", generateID), {

                //TURN DATA AND TIME TO NUMERIC VARS AND MAKE STRING VARS UPPERCASE
                id: generateID,
                arrival_time: arrival_time,
                departure_date: moment(date).format("L"),
                departure_time: time.getTime(),
                origin_description: originDescription,
                origin_coordinates: originCoordinates,
                destination_description: destinationDescription,
                destination_coordinates: destinationCoordinates,
                number_of_passengers: numberOfPassengers,
                price_per_seat: pricePerSeat,
                city_origin: originLocality,
                city_destination: destinationLocality,

            }, { merge: true });

            //MAYBE ADD A FUNCTION HERE TO DISPLAY LOADING PAGE
            //CHANGE NAVIGATION ETC
            setPublishButtonPressed(true);

        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    };

    //DISABLE THE PUBLISH BUTTON IF ORIGIN OR DESTINATION AREN'T CHOSEN
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
                    onPress={(data, detail = null) => {
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
                    onPress={() => { setShowTimePicker(true) }}>
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
            <View style={[tw`flex-row m-3 p-2 rounded-lg items-center`, { borderWidth: 0.3 }]}>
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
                        onPress={() => { addPassenger() }}
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
                        onPress={() => { removePassenger() }}
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
            <View style={[tw`flex-row mx-3 p-2 mt-1 bg-black rounded-lg items-center`, { borderWidth: 0.3 }]}>
                <View style={tw`p-5 border-r border-white w-1/2`}>
                    <Text style={tw`text-lg font-bold text-white`}>
                        Price per seat
                    </Text>
                </View>
                <View style={tw` pl-5 pr-3 items-center`}>
                    <TouchableOpacity
                        onPress={() => { incrementPrice() }}
                    >
                        <Icon
                            name='add-outline'
                            type='ionicon'
                            color='white'
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { decrementPrice() }}
                    >
                        <Icon
                            name='remove-outline'
                            type='ionicon'
                            color='white'
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
                <View style={tw`border-white border rounded-2xl p-3`}>
                    <Text style={tw`text-white font-semibold text-2xl`}>
                        £ {pricePerSeat}
                    </Text>
                </View>
            </View>

            <View style={tw`m-5 justify-center`}>
                <TouchableOpacity
                    style={tw`bg-blue-500 rounded-2xl p-3 items-center shadow-xl top-1/2
                    ${originPicked && destinationPicked ? '' : 'opacity-20'}`}
                    onPress={() => { postRideInfoToFireStore() }}
                    disabled={disablePublishButton()}
                >
                    <Text style={tw`font-bold text-white text-xl`}>
                        Publish
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PublishScreen