import React, { useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
  View, Image, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {

  const IniciarSesion = () => {
    navigation.navigate('login');
  }

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nombre });

      await setDoc(doc(db, 'users', user.uid), {
        name: nombre,
        email: email,
        createdAt: new Date(),
      });

      Alert.alert('Éxito', 'Cuenta creada exitosamente');
      navigation.replace('home');
    } catch (error) {
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);
      let mensaje = 'Ocurrió un error al registrarse';
      if (error.code === 'auth/email-already-in-use') mensaje = 'El correo ya está registrado';
      if (error.code === 'auth/invalid-email') mensaje = 'El correo no es válido';
      if (error.code === 'auth/weak-password') mensaje = 'La contraseña es muy débil';
      Alert.alert('Error', mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Image
            source={require("../images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appTitle}>Synapse</Text>
        <Text style={styles.subtitle}>Aprende más inteligente</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.welcomeTitle}>Crear Cuenta</Text>
          <Text style={styles.welcomeSubtitle}>
            Regístrate para comenzar
          </Text>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>
              Continuar con Google
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O con email</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={18}
              color="#A0AEC0"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Tu nombre"
              placeholderTextColor="#B0B7C3"
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={18}
              color="#A0AEC0"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="tu@email.com"
              placeholderTextColor="#B0B7C3"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#A0AEC0"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar contraseña</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.registerButton, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            }
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={IniciarSesion}>
              <Text style={styles.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Text style={styles.Foot}>
          Al registrarte, aceptas nuestros Términos y Política de Privacidad
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContainer: { marginBottom: 10, alignItems: 'center' },
  logoContainer: { marginTop: 60, marginBottom: 10, alignItems: 'center' },
  logoBox: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: '#3B82F6', justifyContent: 'center',
    alignItems: 'center', marginBottom: 12,
  },
  logoImage: { width: 80, height: 80 },
  appTitle: {
    fontSize: 20, fontWeight: '700',
    color: '#0F172A', marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: '#94A3B8' },
  card: {
    width: '88%', backgroundColor: '#FFFFFF',
    borderRadius: 22, paddingHorizontal: 22,
    paddingVertical: 28, borderWidth: 0.1,
  },
  welcomeTitle: {
    fontSize: 28, fontWeight: '700',
    color: '#0F172A', marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15, color: '#94A3B8', marginBottom: 24,
  },
  googleButton: {
    width: '100%', height: 52, borderWidth: 1,
    borderColor: '#E5E7EB', borderRadius: 14,
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginBottom: 24,
  },
  googleButtonText: {
    marginLeft: 10, fontSize: 15,
    fontWeight: '500', color: '#111827',
  },
  dividerContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: {
    marginLeft: 10, marginRight: 10,
    fontSize: 13, color: '#94A3B8',
  },
  label: {
    fontSize: 14, fontWeight: '500',
    color: '#111827', marginBottom: 8, marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    height: 54, borderWidth: 1,
    borderColor: '#E5E7EB', borderRadius: 14,
    paddingHorizontal: 14, marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#111827' },
  registerButton: {
    marginTop: 12, height: 54,
    backgroundColor: '#3B82F6', borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF', fontSize: 16, fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center', marginTop: 24,
  },
  loginText: { color: '#94A3B8', fontSize: 14 },
  loginLink: {
    color: '#3B82F6',
    fontSize: 14, fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, marginBottom: 50,
  },
  Foot: {
    width: '80%', textAlign: 'center',
    fontSize: 12, color: '#A1A1AA',
  },
});