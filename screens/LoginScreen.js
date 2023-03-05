import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'

const LoginScreen = () => {
  return (
    <SafeAreaView style={tw`h-full`}>
        <View style={tw`items-center h-1/2`}>
            <Text>
                test
            </Text>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})