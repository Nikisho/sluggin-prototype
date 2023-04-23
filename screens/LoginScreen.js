import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { SocialIcon } from "@rneui/themed";
import { loginScreenImage } from '../images/images'
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { AUTH_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCurrentUser } from '../slices/navSlice'
import HomeScreen from './HomeScreen'
import db from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const image = loginScreenImage;
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: `${AUTH_CLIENT_ID}`,
    iosClientId: `${AUTH_CLIENT_ID}`,
    expoClientId: `${EXPO_CLIENT_ID}`,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.log(user)

      dispatch(setCurrentUser({
        userAuthenticationInfo: user,
        isLoggedIn: true
      }));

      const docRef = await setDoc(doc(db, "USERS", user?.id), {
        user: user
      });

    } catch (error) {
      console.error(error)
    }
  };

  if (currentUser.isLoggedIn) {

    return <HomeScreen />

  } else

    return (
      <SafeAreaView style={tw`h-full`}>
        <ImageBackground source={image} resizeMode="cover" style={tw` h-full w-full`} blurRadius={3} >

          <View style={tw`items-center p-3`}>
            <Text style={tw`font-bold text-2xl`}>
              Start riding now!
            </Text>
          </View>
          <View style={tw`items-center top-1/2 mx-5`}>

            <TouchableOpacity style={tw.style(` p-3 flex-row py-3 mb-1 items-center rounded-full bg-black w-full justify-between `)}
              onPress={() => {
                promptAsync();
              }}
              disabled={!request}
            >
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