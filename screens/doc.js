import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    Alert, ActivityIndicator
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DocScreen({ navigation }) {
    const [archivo, setArchivo] = useState(null);
    const [loading, setLoading] = useState(false);

    const abrirExplorador = async () => {
        try {
            const resultado = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf'],  // solo PDFs por ahora
                copyToCacheDirectory: true,
            });

            if (!resultado.canceled) {
                const archivo = resultado.assets[0];
                setArchivo(archivo);
                console.log('Archivo seleccionado:', archivo.name);
                console.log('URI:', archivo.uri);
                console.log('Tamaño:', archivo.size);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo abrir el explorador de archivos');
            console.log(error);
        }
    };

    const procesarDocumento = async () => {
        if (!archivo) {
            Alert.alert('Error', 'Primero selecciona un documento');
            return;
        }
        setLoading(true);
        // Aquí David conectará con Gemini para procesar el PDF
        console.log('Procesando:', archivo.name);
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Subir Documento</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Zona de subida */}
            <TouchableOpacity style={styles.uploadZone} onPress={abrirExplorador}>
                <Ionicons name="cloud-upload-outline" size={48} color="#3B82F6" />
                <Text style={styles.uploadTitle}>Seleccionar archivo</Text>
                <Text style={styles.uploadSubtitle}>PDF • Toca para explorar</Text>
            </TouchableOpacity>

            {/* Archivo seleccionado */}
            {archivo && (
                <View style={styles.archivoCard}>
                    <View style={styles.archivoIconContainer}>
                        <Ionicons name="document-text-outline" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.archivoInfo}>
                        <Text style={styles.archivoNombre} numberOfLines={1}>
                            {archivo.name}
                        </Text>
                        <Text style={styles.archivoTamaño}>
                            {(archivo.size / 1024).toFixed(1)} KB
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setArchivo(null)}>
                        <Ionicons name="close-circle-outline" size={22} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            )}

            {/* Botón procesar */}
            <TouchableOpacity
                style={[styles.botonProcesar, !archivo && styles.botonDeshabilitado]}
                onPress={procesarDocumento}
                disabled={!archivo || loading}
            >
                {loading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.botonTexto}>Generar Apuntes</Text>
                }
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    uploadZone: {
        backgroundColor: '#EEF4FF',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#BFDBFE',
        borderStyle: 'dashed',
        paddingVertical: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    uploadTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0F172A',
        marginTop: 16,
    },
    uploadSubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        marginTop: 6,
    },
    archivoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 0.5,
        borderColor: '#E5E7EB',
    },
    archivoIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EEF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    archivoInfo: {
        flex: 1,
    },
    archivoNombre: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    archivoTamaño: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 2,
    },
    botonProcesar: {
        height: 54,
        backgroundColor: '#3B82F6',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonDeshabilitado: {
        backgroundColor: '#BFDBFE',
    },
    botonTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});