import { Add } from 'iconsax-react-native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Dialog, Divider, FAB, List, Portal, TextInput } from 'react-native-paper'
import { auth, db } from '../firebaseConfig'
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native'

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const navigation = useNavigation()
  const [chats, setChats] = useState([])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setEmail(user?.email ?? "")
    })
  }, []);

  const [isLoading, setIsLoading] = useState(false)

  const createChat = async () => {
    if(!email || !userEmail) return
    setIsLoading(true)
    const response = await addDoc(collection(db, "chats"), {
      users: [email, userEmail],
    })
    setIsLoading(false)
    setIsDialogVisible(false)
    navigation.navigate("Chat", {chatId: response.id})
  }

  const q = query(collection(db, "chats"), where("users", "array-contains", email)); 
  useEffect(() => {
    return onSnapshot(q, (querySnapshot) => {
      setChats(querySnapshot.docs)
    })
  },[email])

  return (
    <View style={{paddingLeft:5, flex:1}}>
      {
        chats.map((chat) => (
          <>
          <List.Item title={chat.data().users.find(x => x !== email)} description={(chat.data().messages ?? [])[0]?.text ?? undefined} left={() => <Avatar.Text label={chat.data().users.find(x => x !== email).split(" ").reduce((prev, current) => prev + current[0], " ")} size={56}/>} onPress={() => navigation.navigate("Chat", {chatId: chat.id})}/>
          <Divider />
          </>
        ))
      }

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
        <Dialog.Title>New Chat</Dialog.Title>
            <Dialog.Content>
              <TextInput label="Enter user email" value={userEmail} onChangeText={text => setUserEmail(text)}/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
              <Button onPress={() => createChat()} loading={isLoading}>Save</Button>
            </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <FAB onPress={() => setIsDialogVisible(true)} icon={() => <View style={{alignItems: 'center', justifyContent: 'center', marginBottom:10}}><Add size={36} /></View>} style={{position:"absolute", bottom:16, right:16}}/>
    </View>
  )
}

export default ChatList
