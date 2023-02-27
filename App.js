import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import RideOptionsCard from './components/RideOptionsCard';
import RideScreen from './screens/RideScreen';
import PublishScreen from './screens/PublishScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height "}
          style={{ flex: 1 }}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='RideOptionsCard'
                component={RideOptionsCard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='RideScreen'
                component={RideScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='PublishScreen'
                component={PublishScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                  headerShown: false,
                }}
             
              />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});