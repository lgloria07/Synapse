import React from 'react';
import {ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Register({navigation}) {

    const IniciarSesion = () =>{
        navigation.navigate('login');
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Image
              source={require("../images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Eslogan */}
          <Text style={styles.appTitle}>Synapse</Text>
          <Text style={styles.subtitle}>Aprende más inteligente</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Cuadro principal */}
          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Crear Cuenta</Text>
            <Text style={styles.welcomeSubtitle}>
              Regístrate para comenzar
            </Text>

            {/* Conectarse con Google */}
            <TouchableOpacity style={styles.googleButton}>
              <Image style={styles.GoogleImage} resizeMode="contain" source={require('../images/google.webp')}/>
              <Text style={styles.googleButtonText}>
                Continuar con Google
              </Text>
            </TouchableOpacity>

            {/* Otra opción (email) */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>O con email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Nombre */}
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
              />
            </View>

            {/* Email */}
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
              />
            </View>

            {/* Contraseña */}
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="#A0AEC0"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#B0B7C3"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Confirmar Contraseña */}
            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#A0AEC0"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#B0B7C3"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Crear Cuenta */}
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            </TouchableOpacity>

            {/* Iniciar Sesión */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={IniciarSesion}>
                <Text style={styles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Pie de página */}
        <View style={styles.footerContainer}>
          <Text style={styles.Foot}>
            Al registrarte, aceptas nuestros Términos y Política de Privacidad
          </Text>
        </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 10,
    alignItems: 'center',
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  card: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 28,
    borderWidth: 0.1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    marginBottom: 24,
  },
  googleButton: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 13,
    color: '#94A3B8',
  },
  GoogleImage: {
      width: 20,
      height: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  registerButton: {
    marginTop: 12,
    height: 54,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  loginLink: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:50,
  },
  Foot: {
    width: '80%',
    textAlign: 'center',
    fontSize: 12,
    color: '#A1A1AA',
  },
});