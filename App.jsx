import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from './screens/Chat'
import ChatList from './screens/ChatList'
import Settings from './screens/Settings'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Messages2, Setting2 } from 'iconsax-react-native'
import { DefaultTheme, Provider } from 'react-native-paper'
import { useEffect } from 'react'
import { LogBox } from 'react-native';
// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import {getAuth} from "firebase/auth"
import "firebase/firestore"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYayY3LC6LeO6vYASb9z02l4kqVqUMnPY",
  authDomain: "chatty-e60b1.firebaseapp.com",
  projectId: "chatty-e60b1",
  storageBucket: "chatty-e60b1.firebasestorage.app",
  messagingSenderId: "725668493165",
  appId: "1:725668493165:web:4296276fc8cc7333760c64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore(app)

LogBox.ignoreAllLogs();


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const navigation = useNavigation()
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(!user){
        navigation.navigate("SignUp")

      }
    })
  }, [])
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return route.name === "Chatlist" ? <Messages2 color={color} size={size} /> : <Setting2 color={color} size={size} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Chatlist" component={ChatList} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
};

// const theme = {
//   ...DefaultTheme,
//   roundness:2,
//   colors:{
//     ...DefaultTheme.colors,
//     primary: "#2196f3",
//     accent: "#e91e63"
//   }
// }

const App = () => {
  return (
    <NavigationContainer>
      <Provider > {/*theme={theme} */}
      <Stack.Navigator>
        <Stack.Screen name='Main' component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name='Chat' component={Chat}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{presentation:"fullScreenModal"}}/>
        <Stack.Screen name='SignIn' component={SignIn} options={{presentation:"fullScreenModal"}}/>
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App

