import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Pantalla de Subida de Audio
 * Aquí el usuario selecciona audios de su celular para que la IA los analice
 * y genere los apuntes de forma automática.
 */
export default function Audio({ navigation }) {
  // Estado para guardar el archivo que el usuario seleccione
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * Esta función simula que el usuario elige un archivo.
   * En una app real, aquí usaríamos expo-document-picker.
   */
  const handleSelectFile = () => {
    // Simulamos que seleccionó un audio con éxito
    setSelectedFile({
      name: 'Grabacion_Clase_Historia.mp3',
      size: '4.5 MB',
      duration: '12:45',
      type: 'audio/mpeg'
    });
  };

  /**
   * Lógica para mandar a generar los apuntes después de subir el audio.
   */
  const handleGenerate = () => {
    if (selectedFile) {
      console.log('Generando apuntes para el audio:', selectedFile.name);
      // Aquí iría la integración con el servidor o la IA
    }
  };

  /**
   * Función para quitar el archivo seleccionado y volver a empezar.
   */
  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 
        El KeyboardAvoidingView sirve para que el teclado no nos tape
        los botones o el contenido importante de la pantalla.
      */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flex1}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Encabezado - Botón de atrás circular con su sombrita */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>

          {/* Título de la pantalla y una breve explicación */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Subir Audio</Text>
            <Text style={styles.subtitle}>
              Sube tus grabaciones y las convertiremos en apuntes bien estructurados.
            </Text>
          </View>

          {/* Renderizado condicional: si no hay archivo, mostramos la zona de carga */}
          {!selectedFile ? (
            /* Tarjeta de Carga - Aparece si no se ha elegido nada */
            <TouchableOpacity 
              style={styles.uploadCard} 
              onPress={handleSelectFile}
              activeOpacity={0.6}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons name="mic-outline" size={40} color="#3B82F6" />
              </View>
              <Text style={styles.uploadTitle}>Seleccionar Audio</Text>
              <Text style={styles.uploadSubtitle}>
                Toca aquí para buscar grabaciones en tu dispositivo
              </Text>
              <View style={styles.formatBadge}>
                 <Text style={styles.formatText}>MP3, M4A, WAV</Text>
              </View>
            </TouchableOpacity>
          ) : (
            /* Tarjeta de Archivo Seleccionado - Muestra el audio que se va a procesar */
            <View style={styles.fileSelectedCard}>
              <View style={styles.fileRow}>
                <View style={styles.audioIconContainer}>
                  <Ionicons name="musical-notes" size={30} color="#3B82F6" />
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {selectedFile.name}
                  </Text>
                  <Text style={styles.fileMeta}>
                    {selectedFile.size} • {selectedFile.duration}
                  </Text>
                </View>
                <TouchableOpacity onPress={removeFile} style={styles.removeButton}>
                  <Ionicons name="close-circle" size={26} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              
              {/* Representación visual de las ondas del audio para que se vea premium */}
              <View style={styles.waveformContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i) => (
                  <View 
                    key={i} 
                    style={[
                      styles.waveBar, 
                      { height: Math.floor(Math.random() * 20) + 10 }
                    ]} 
                  />
                ))}
              </View>
            </View>
          )}

          {/* Tarjeta con información extra sobre la IA */}
          <View style={styles.infoCard}>
             <View style={styles.infoIconWrapper}>
                <Ionicons name="flash-outline" size={20} color="#F59E0B" />
             </View>
             <Text style={styles.infoText}>
               Nuestra IA transcribirá el audio solito y sacará los puntos más importantes de tu clase.
             </Text>
          </View>
        </ScrollView>

        {/* Pie de página - Botón de acción siempre fijo abajo */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.generateButton, 
              !selectedFile && styles.buttonDisabled
            ]} 
            onPress={handleGenerate}
            disabled={!selectedFile}
            activeOpacity={0.8}
          >
            <Text style={styles.generateButtonText}>Generar Apunte</Text>
            <Ionicons name="sparkles" size={20} color="#FFFFFF" style={styles.ml8} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Aquí definimos todos los estilos para que la pantalla se vea moderna y limpia
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Fondo gris clarito como el del Home
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 110, // Espacio extra para que el botón de abajo no tape nada
  },

  // Estilo del botón de "Atrás"
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

  // Contenedor del título y subtítulo
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

  // Estilo de la tarjeta de subida (la que tiene bordes punteados)
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
    textAlign: 'center',
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

  // Estilo cuando ya seleccionaste un archivo
  fileSelectedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  fileMeta: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },

  // Animación de las barras de audio
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    gap: 4,
  },
  waveBar: {
    width: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },

  // Tarjeta de información/avisos
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.1)',
  },
  infoIconWrapper: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
    lineHeight: 18,
  },

  // Botón azul de abajo
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