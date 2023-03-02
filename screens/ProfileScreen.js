import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from '@rneui/base'
import { Modal } from 'react-native'

const ProfileScreen = () => {
  const mobileNumber = '+44 7463 030833'
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={style.inner}>
        <View style={tw`mx-4`}>

          <View style={tw`items-center bg-black py-2 rounded-xl`}>
            <Text style={tw`text-white text-xl font-semibold`}>
              About You
            </Text>
          </View>

          {/* image/name div */}
          <View style={tw`border-b flex-row p-4 justify-between items-center `}>
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                borderRadius: 100
              }}
              source={{ uri: 'https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1600' }}
            />
            <Text style={tw`font-bold text-xl`}>
              Mike
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
            >
              Hey, I'm Mike and I have to commute between Birmingham and London quite often!
              I thought it'd be fun to share the rides with someone else. I am a software engineer and I love talking about music,
              food and politics. I also have a dog and I love sushi.
              PS: NO SMOKING IN THE CAR.
            </TextInput>
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
            <TextInput style={tw`text-lg font-bold`}
              editable
              multiline
            >
              {mobileNumber}
            </TextInput>
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

          <View style={tw`flex-row justify-between items-center bg-gray-200 rounded-xl p-3`}>
            <TextInput style={tw`font-semibold`}
              editable
              multiline
            >
              Ford fiesta 2015
            </TextInput>
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain'
              }}
              source={{ uri: "https://links.papareact.com/3pn" }}
            />
          </View>
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