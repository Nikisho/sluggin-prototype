import { StyleSheet, Text, Sa, SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Button, Icon } from 'react-native-elements';

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`justify-center bg-green-300 h-full`}>
      <View style={tw`mx-7 bg-white rounded-2xl`}>

        {/* textInputFrom */}
        <GooglePlacesAutocomplete 
            styles={{
                container: {
                    flex: 0,
                },
                textInput: {
                    fontSize: 19,
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
                },
                textInput: {
                    fontSize: 18,
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
            placeholder='where to?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}

        />
        <Button
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
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
