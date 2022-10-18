import { StyleSheet, Text, Sa, SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`justify-center bg-green-300 h-full`}>
      <View style={tw`mx-5 bg-white h-1/5 rounded-2xl`}>

        {/* textInputFrom */}
        <TouchableOpacity style={tw`h-1/2`}>

        </TouchableOpacity>

        {/* textInputWhereTo */}
        <TouchableOpacity style={tw`h-1/2 border-t`}>
            
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
