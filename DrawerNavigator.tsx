// DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import GameUploader from './screens/GameUploader';
import { View, Text, Button } from 'react-native';
import { supabase } from './lib/supabase'; // supabase dosya yoluna göre ayarla
import { useNavigation } from '@react-navigation/native';
import GameListScreen from './screens/GameListScreen';

const Drawer = createDrawerNavigator();

function LogoutScreen() {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Çıkış Yapmak İstiyor Musunuz?</Text>
      <Button title="Çıkış Yap" onPress={handleLogout} color="red" />
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      <Drawer.Screen name="Games" component={GameListScreen} options={{ title: 'Oyunlar' }} />
      <Drawer.Screen name="Uploader" component={GameUploader} options={{ title: 'Oyunları ekle' }} />
      <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Çıkış Yap' }} />
    </Drawer.Navigator>
  );
}
