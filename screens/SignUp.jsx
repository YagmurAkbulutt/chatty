import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Subheading, TextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
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
const auth = getAuth();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation()

  const createAccount = async () => {
      console.warn("hiiiiiii");
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        navigation.popToTop()
        
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    };

  return (
    <View style={{margin:16}}>
      {!!error && (
        <Subheading style={{color:"red", textAlign:"center", marginBottom:16}}>{error}</Subheading>)
      }
      <TextInput label="Name" value={name} onChangeText={(text) => setName(text)}/>
      <TextInput label="Email" value={email} onChangeText={(text) => setEmail(text)} style={{marginTop:12}} keyboardType='email-address'/>
      <TextInput label="Password" value={password} onChangeText={(text) => setPassword(text)} style={{marginTop:12}} secureTextEntry/>
      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:16}}>
      <Button compact onPress={() => navigation.navigate("SignIn")}>SIGN IN</Button>
      <Button mode='contained' onPress={() => createAccount()} loading={isLoading}>SIGN UP</Button>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})