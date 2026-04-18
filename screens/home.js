import React, { useState, useEffect } from 'react';
import {StyleSheet,Text,TouchableOpacity,View,ScrollView,Modal,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback }  from 'react';

export default function Home({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [subjectModalVisible, setSubjectModalVisible] = useState(false);
  //Crea una lista de materias trabajadas
  const [materias, setMaterias] = useState([]);
  //Guarda la materia seleccionada
  const [selectedMateria, setSelectedMateria] = useState(null);

  const {titulo, resumen, quiz} = route.params;

  //Manejar la creación y vista del documento  prueba
  const handleDocument = () => {
    console.log(resumen);
    generarDocumento();
  }

  //Generación del documento 
  const generarDocumento = useCallback(async () => {
    //Tratando de generar el documento
    const script_local = 'https://script.google.com/macros/s/AKfycbyK4ZjzfhTVzJbO75Z0aJJ3OsO1y2IYq64EkNf-BMtpWEjdg8obVVceZFIptFi5sSMF7g/exec';

    //Creamos un objeto para manejar la solicitud de prueba
    const solicitud = {
      titulo: titulo || 'Nuevo documento',
      content: resumen||  '#HolaMundo\nEste es un documento generado por Gemini.'
    };

    try{
      const response = await fetch(script_local, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(solicitud)
      });

      console.log(response);

      const resultado = await response.json();
      console.log("Respuesta:", resultado);
      openDocument(resultado.id);

    }catch(error){
      console.log("Error al tratar de conectar con el script de google")
      console.log(error);
    }

  }, [route.params]);

  //Abrir el documento
  const openDocument = useCallback(async (id) => {
    //El ID unico del documento que debería generarse al almacenarlo dentro de Google Drive
    const fileId = id;
    //Formamos el path completo para abrir el documento
    const url = `https://docs.google.com/document/d/${id}/edit`;

    try {
      const available = await Linking.canOpenURL(url);
      if(available){
        await Linking.openURL(url);
      }
      else{
        await Linking.openURL(url);
      }
    } catch(error){
      console.log("Se ha producido un error al abrir el documento");
    }
  });

  useEffect(() => {
    if (route.params?.nuevaMateria) {
      setMaterias(prev => [...prev, route.params.nuevaMateria]);

      navigation.setParams({ nuevaMateria: null });
    }
  }, [route.params?.nuevaMateria]);

  const Profile = () =>{
    navigation.navigate('profile');
  }

  const openSubjectOptions = (materia) => {
    setSelectedMateria(materia);
    setSubjectModalVisible(true);
  }

  const realizarEvaluacion = (materia) => {
  navigation.navigate('test', { quiz: materia.quiz });
  };

  const SubirDoc = () =>{
    navigation.navigate('doc');
  }

  const SubirPrompt = () =>{
    navigation.navigate('input');
  }

  const SubirAudio = () =>{
    navigation.navigate('audio');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Saludo a usuario */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hola, María 
            </Text>
            <Text style={styles.subtitle}>
              ¿Qué estudiaremos hoy?
            </Text>
          </View>

          <TouchableOpacity onPress={Profile} style={styles.profileButton}>
            <Ionicons name="person-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Resumen de la semana */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="book-outline" size={20} color="#3B82F6" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Notas</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={20} color="#3B82F6" />
            <Text style={styles.statNumber}>0h</Text>
            <Text style={styles.statLabel}>Esta semana</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="ribbon-outline" size={20} color="#3B82F6" />
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Promedio</Text>
          </View>
        </View>

        {/* Documentos creados */}
        <Text style={styles.sectionTitle}>Apuntes Recientes</Text>

        {/* Materias */}
        {materias.map((materia, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.noteCard}
          onPress={() => openSubjectOptions(materia)}
        >
          <View>
            <Text style={styles.noteTitle}>{materia.titulo}</Text>
            <Text style={styles.noteDate}>Nuevo</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>0%</Text>
          </View>
        </TouchableOpacity>
      ))}
      </ScrollView>

      {/* Agregar contenido */}
      <TouchableOpacity
        style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={34} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal crear apuntes*/}
      <Modal
        visible={modalVisible}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            
            <View style={styles.modalBar} />

            <Text style={styles.modalTitle}>Crear Nueva Nota</Text>

            <TouchableOpacity onPress={SubirAudio} style={styles.optionCard}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="mic-outline" size={22} color="#3B82F6" />
              </View>

              <View>
                <Text style={styles.optionTitle}>Grabar Audio</Text>
                <Text style={styles.optionSubtitle}>Graba tu clase, tutoria o explicacion </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={SubirDoc} style={styles.optionCard}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="cloud-upload-outline" size={22} color="#3B82F6" />
              </View>

              <View>
                <Text style={styles.optionTitle}>Subir Documento</Text>
                <Text style={styles.optionSubtitle}>Sube tus apuntes! (PDF) </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={SubirPrompt} style={styles.optionCard}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="create-outline" size={22} color="#3B82F6" />
              </View>

              <View>
                <Text style={styles.optionTitle}>Escribir Tema</Text>
                <Text style={styles.optionSubtitle}>Escribe un prompt y generamos un apunte</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* Modal de materia */}
      <Modal visible={subjectModalVisible} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            
            <View style={styles.modalBar} />
            <Text style={styles.modalTitle}>Opciones</Text>

            <TouchableOpacity style={styles.optionCard} onPress={() => {handleDocument()}}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="document-text-outline" size={22} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Ver apuntes</Text>
                <Text style={styles.optionSubtitle}>Consulta la materia</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => realizarEvaluacion(selectedMateria)} style={styles.optionCard}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="create-outline" size={22} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Intentar evaluación</Text>
                <Text style={styles.optionSubtitle}>Realiza un quiz</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setSubjectModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginTop: 60,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    marginTop: 4,
  },

  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 36,
  },

  statCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
  },

  statLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 18,
  },

  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  noteTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
    width: 180,
    lineHeight: 24,
  },

  noteDate: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 10,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },

  badgeText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 14,
  },

  modalBar: {
    width: 40,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: 24,
  },

  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 22,
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },

  optionSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },

  cancelButton: {
    marginTop: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
});