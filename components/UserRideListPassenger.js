import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'

const UserRideListPassenger = () => {
    //Fetch the user id and render the rides that corresponds to the user id
    
  return (
    <SafeAreaView>
        <TouchableOpacity style={tw`mx-2 rounded-lg bg-blue-100 p-2 `}>
            <Text>CARD TEST</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UserRideListPassenger

const styles = StyleSheet.create({})