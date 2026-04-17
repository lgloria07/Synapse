import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Input({ navigation }) {
  const [topic, setTopic] = useState('');

  const handleGenerate = () => {
    // Placeholder for future logic
    console.log('Generando apunte para:', topic);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Escribe tu tema</Text>
            <Text style={styles.subtitle}>¿Sobre qué quieres aprender hoy?</Text>
          </View>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
               <Ionicons name="create-outline" size={24} color="#3B82F6" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Ej. El ciclo de Krebs, la Revolución Mexicana, o Programación en Python..."
              placeholderTextColor="#94A3B8"
              multiline
              value={topic}
              onChangeText={setTopic}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.tipContainer}>
            <Ionicons name="bulb-outline" size={18} color="#3B82F6" />
            <Text style={styles.tipText}>
              Entre más específico seas, mejores apuntes generaremos para ti.
            </Text>
          </View>
        </ScrollView>

        {/* Action Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.generateButton, !topic && styles.buttonDisabled]} 
            onPress={handleGenerate}
            disabled={!topic}
          >
            <Text style={styles.generateButtonText}>Generar Apunte</Text>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" style={styles.ml8} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Matching home background
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },
  headerTextContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInput: {
    fontSize: 16,
    color: '#0F172A',
    lineHeight: 24,
    flex: 1,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#EEF4FF',
    padding: 12,
    borderRadius: 12,
  },
  tipText: {
    fontSize: 13,
    color: '#3B82F6',
    marginLeft: 8,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#F3F4F6',
  },
  generateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  ml8: {
    marginLeft: 8,
  },
});