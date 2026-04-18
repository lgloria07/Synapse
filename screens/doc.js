import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Doc({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = () => {
    
    setSelectedFile({ name: 'Lectura_Semana_5.pdf', size: '1.2 MB' });
  };

  const handleGenerate = () => {
    console.log('Generando apunte para el archivo:', selectedFile?.name);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Subir Documento</Text>
          <Text style={styles.subtitle}>Analizaremos tu archivo para crear los mejores apuntes.</Text>
        </View>

        {/* Area de subir archivos */}
        {!selectedFile ? (
          <TouchableOpacity 
            style={styles.uploadCard} 
            onPress={handleSelectFile}
            activeOpacity={0.7}
          >
            <View style={styles.uploadIconContainer}>
              <Ionicons name="cloud-upload-outline" size={40} color="#3B82F6" />
            </View>
            <Text style={styles.uploadTitle}>Seleccionar PDF</Text>
            <Text style={styles.uploadSubtitle}>Toca para buscar en tus archivos</Text>
            <View style={styles.formatBadge}>
               <Text style={styles.formatText}>Solo PDF</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.fileSelectedCard}>
            <View style={styles.fileInfo}>
              <View style={styles.pdfIconContainer}>
                <Ionicons name="document-text" size={30} color="#EF4444" />
              </View>
              <View style={styles.flex1}>
                <Text style={styles.fileName} numberOfLines={1}>{selectedFile.name}</Text>
                <Text style={styles.fileSize}>{selectedFile.size}</Text>
              </View>
              <TouchableOpacity onPress={removeFile} style={styles.removeButton}>
                <Ionicons name="close-circle" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.infoCard}>
           <Ionicons name="shield-checkmark-outline" size={20} color="#10B981" />
           <Text style={styles.infoText}>
             Tus documentos están seguros y solo se usan para generar tus apuntes.
           </Text>
        </View>

      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.generateButton, !selectedFile && styles.buttonDisabled]} 
          onPress={handleGenerate}
          disabled={!selectedFile}
        >
          <Text style={styles.generateButtonText}>Generar Apunte</Text>
          <Ionicons name="sparkles" size={20} color="#FFFFFF" style={styles.ml8} />
        </TouchableOpacity>
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
    lineHeight: 22,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  formatBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  formatText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  fileSelectedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  fileSize: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 16,
  },
  infoText: {
    fontSize: 13,
    color: '#065F46',
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
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
  flex1: {
    flex: 1,
  },
});