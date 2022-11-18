import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
const PublishScreen = () => {
    const navigation = useNavigation();
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

    </SafeAreaView>
  )
}

export default PublishScreen

const styles = StyleSheet.create({})