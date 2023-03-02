import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const MyRidesScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={tw`mx-2 rounded-xl justify-center items-center h-12 bg-black`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={tw`absolute left-4 z-50 rounded-full shadow-lg`}>
                    <Icon name='chevron-back-outline'
                        type='ionicon'
                        color='white'
                    />
                </TouchableOpacity>
                <Text style={tw`text-xl text-white`}>
                    Your rides
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default MyRidesScreen

const styles = StyleSheet.create({})