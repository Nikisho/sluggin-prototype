import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { SocialIcon } from "@rneui/themed";
import { loginScreenImage } from '../images/images'

const LoginScreen = () => {
  const image = loginScreenImage;

  const signUpWithGoogle = ()=> {
    try {
      console.log('sign up successful!')
    } catch (error) {
      
    }
  }

  return (
    <SafeAreaView style={tw`h-full`}>
      <ImageBackground source={image} resizeMode="cover" style={tw` h-full w-full`} blurRadius={3} >


        <View style={tw`items-center p-3`}>
          <Text style={tw`font-bold text-2xl`}>
            Start riding now!
          </Text>
        </View>
        <View style={tw`items-center top-1/2 mx-5`}>

          <TouchableOpacity style={tw.style(` p-3 flex-row py-3 mb-1 items-center rounded-full bg-black w-full justify-between `)}>
            <SocialIcon
              type='google'
              iconSize={14}
              style={{
                padding: 0,
                paddingHorizontal: 0
              }}

            />
            <Text style={tw`text-white font-bold`}>Sign up with Google</Text>
            <View style={tw`px-5`}>

            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw.style(` p-3 flex-row py-3 mb-1 items-center rounded-full bg-black w-full justify-between `)}>
            <SocialIcon
              type='facebook'
              iconSize={14}
              style={{
                padding: 0,
                paddingHorizontal: 0
              }}

            />
            <Text style={tw`text-white font-bold`}>Sign up with Facebook</Text>
            <View style={tw`px-5`}>

            </View>
          </TouchableOpacity>

          <TouchableOpacity style={tw.style(` px-6 flex-row py-5 rounded-full bg-black w-full justify-between `)}>

            <Icon
              type='ionicon'
              name='mail'
              size={24}
              color='white'
            />


            <Text style={tw`font-bold text-white `}>
              Continue with email
            </Text>


            <View style={tw`px-3`}>
            </View>

          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})