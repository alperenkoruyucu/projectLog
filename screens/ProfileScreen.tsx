import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUri, setAvatarUri] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        Alert.alert('Hata', 'Kullanıcı bilgisi alınamadı');
        return;
      }

      const { username, bio, avatar_url } = user.user_metadata || {};
      setUsername(username || '');
      setBio(bio || '');
      setAvatarUri(avatar_url || '');
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    if (!username || !bio) {
      Alert.alert('Hata', 'Tüm alanları doldurmalısınız.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        username,
        bio,
        avatar_url: avatarUri,
      },
    });

    if (error) {
      Alert.alert('Güncelleme Hatası', error.message);
    } else {
      Alert.alert('Başarılı', 'Profiliniz güncellendi.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Galeriye erişim izni vermeniz gerekiyor.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
      <Image
  source={{ uri: avatarUri || 'https://i.imgur.com/V4RclNb.png' }}
  style={styles.avatar}
/>
        <Text style={styles.linkText}>Profil fotoğrafını değiştir</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Biyografi"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Button title="Profili Güncelle" onPress={updateProfile} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
});
