import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [uid, setUID] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUID(user?.uid || "");
      setName(user?.displayName || "");
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!route.params?.chatId) return;
  
    const chatRef = doc(db, "chats", route.params.chatId);
    const unsubscribeChat = onSnapshot(chatRef, (snapshot) => {
      const data = snapshot.data();
      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages); // Eğer messages bir dizi ise
      } else {
        setMessages([]); // messages yoksa boş bir dizi ayarla
      }
    });
  
    return () => unsubscribeChat();
  }, [route.params?.chatId]);
  

  const onSend = async (newMessages = []) => {
    if (!route.params?.chatId) return;

    const chatRef = doc(db, "chats", route.params.chatId);
    await updateDoc(chatRef, {
      messages: GiftedChat.append(messages, newMessages),
    });
  };

  return (
    <View style={{flex:1, marginBottom:35,}}>
    <GiftedChat
      messages={messages.map(x => ({...x, createdAt: x.createdAt?.toDate()}))}
      onSend={onSend}
      user={{
        _id: uid,
        name: name,
      }}
    />
    </View>
  );
};

export default Chat;
