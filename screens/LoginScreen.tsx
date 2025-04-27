// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) Alert.alert('Kayıt Hatası', error.message);
      else Alert.alert('Başarılı', 'Lütfen mailinizi kontrol edin!');
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) Alert.alert('Giriş Hatası', error.message);
      else navigation.replace('Main'); // Drawer'a yönlendir
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}</Text>
      <TextInput
        placeholder="E-posta"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Şifre"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignUp ? 'Kayıt Ol' : 'Giriş Yap'} onPress={handleAuth} />
      <Text style={styles.switch} onPress={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Zaten üye misin? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8 },
  switch: { color: 'blue', marginTop: 16, textAlign: 'center' }
});
