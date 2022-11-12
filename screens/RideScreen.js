import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectRideScreen } from '../slices/navSlice'

const RideScreen = () => {
    const id = useSelector(selectRideScreen);
    console.log(id);
  return (
    <View >
        {/* Map half of screen */}
        <View style={tw`h-1/2`}>
            <Map/>
        </View>
        
        {/* Ride information half */}
        <View style={tw`h-1/2`}>
            <Text>
                INFO HERE
            </Text>
        </View>

    </View>
  )
}

export default RideScreen

const styles = StyleSheet.create({})