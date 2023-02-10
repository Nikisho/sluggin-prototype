import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from "react"
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const ConfirmRideDetailsScreen = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`p-3`}>
      <View style={tw`mx-2 rounded-xl justify-center items-center h-14 bg-black`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RideScreen')}
          style={tw`absolute left-4 z-50 rounded-full
          shadow-lg`}>
          <Icon name='chevron-back-outline'
            type='ionicon'
            color='white'
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmRideDetailsScreen