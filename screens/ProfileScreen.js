import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from '@rneui/base'
import { Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../slices/navSlice'
import { doc, getDoc, query, setDoc } from 'firebase/firestore'
import db from '../firebase'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const mobileNumber = '+44 7463 030833'
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const [userIntroduction, setUserIntroduction] = useState(null);
  const [userMobileNumber, setUserMobileNumber] = useState(null);
  const [userVehicleDescription, setUserVehicleDescription] = useState(null);
  const navigation = useNavigation();

  const getUserProfileInfoFromFirestore = async () => {
    const queryUserData = query(doc(db, 'USERS', currentUser.userAuthenticationInfo.id))
    try {
      const docRef = await getDoc(queryUserData);
      setUserIntroduction(docRef.data().user.introduction);
      setUserMobileNumber(docRef.data().user.mobile_number);
      setUserVehicleDescription(docRef.data().user.vehicle);
      console.log(userIntroduction)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserProfileInfoFromFirestore();
  }, [])

  const loadUpdatedDataToFirestore = async () => {
    try {
      const docRef = await setDoc(doc(db, 'USERS', currentUser.userAuthenticationInfo.id), {
        user: {
          introduction: userIntroduction,
          mobile_number: userMobileNumber,
          vehicle: userVehicleDescription
        }
      }, { merge: true })
    } catch (error) {
      console.error(error);
    }
  }
  // loadUpdatedDataToFirestore()
  console.log(userIntroduction)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={tw`mx-2`}>


        <View style={tw`justify-center items-center bg-black py-2 rounded-xl`}>
          <Text style={tw`text-white text-xl font-semibold`}>
            About you
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
        <View style={tw`mx-2`}>
          {/* image/name div */}
          <View style={tw`border-b flex-row p-4 justify-between items-center `}>
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                borderRadius: 100
              }}
              source={{ uri: `${currentUser.userAuthenticationInfo?.picture}` }}
            />
            <Text style={tw`font-bold text-xl`}>
              {currentUser.userAuthenticationInfo?.name}
            </Text>
          </View>

          {/* Bio div */}
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold text-lg`}>
              Introduction
            </Text>
            <Icon
              color='gray'
              size={25}
              type='ionicon'
              name="create-outline">
            </Icon>
          </View>
          <View style={tw`my-2 bg-gray-200 p-3 rounded-lg`}>
            <TextInput style={tw`text-sm`}
              editable
              multiline
              placeholder='Enter your short intro here'
              onChangeText={text => setUserIntroduction(text)}
              value={userIntroduction}
            />
          </View>

          <View style={tw`flex-row justify-between `}>
            <Text style={tw`font-semibold text-lg`}>
              Phone
            </Text>

            <Icon
              color='gray'
              size={25}
              type='ionicon'
              name="create-outline">
            </Icon>
          </View>
          <View style={tw`my-2 bg-gray-200 p-2 rounded-lg`}>
            <TextInput style={tw`text-sm font-bold`}
              editable
              multiline
              placeholder='Enter your phone number'
              onChangeText={text => setUserMobileNumber(text)}
              value={userMobileNumber}
            />
          </View>

          <View style={tw`flex-row justify-between py-2`}>
            <Text style={tw`font-semibold text-lg`}>
              Vehicle
            </Text>

            <Icon
              color='gray'
              size={25}
              type='ionicon'
              name="create-outline">
            </Icon>

          </View>

          <View style={tw`flex-row justify-between bg-gray-200 rounded-xl px-3`}>
            <TextInput style={tw`font-semibold`}
              editable
              multiline
              placeholder='What do you drive?'
              onChangeText={text => setUserVehicleDescription(text)}
              value={userVehicleDescription}
            />
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain'
              }}
              source={{ uri: "https://links.papareact.com/3pn" }}
            />
          </View>
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-2xl p-3 items-center shadow-xl top-1/4`}
            onPress={() => { loadUpdatedDataToFirestore() }}
          >
            <Text style={tw`font-bold text-white text-xl`}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ProfileScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // padding: 2,
    // flex: 0,
    justifyContent: 'space-around',
  },
});