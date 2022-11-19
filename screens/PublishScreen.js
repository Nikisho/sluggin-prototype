import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import db from '../firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

const PublishScreen = () => {
    const navigation = useNavigation();
    
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
                // id: generateID,
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
                // id: generateID,
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
        <View style={tw`m-3`}>
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
            
    </SafeAreaView>
  )
}

export default PublishScreen

const styles = StyleSheet.create({})