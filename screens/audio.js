import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AudioScreen({ navigation }) {
    const [recording, setRecording] = useState(null);
    const [audioGuardado, setAudioGuardado] = useState(null);
    const [grabando, setGrabando] = useState(false);
    const [duracion, setDuracion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [intervalo, setIntervalo] = useState(null);

    // Pedir permisos al entrar a la pantalla
    useEffect(() => {
        pedirPermisos();
        return () => {
            if (intervalo) clearInterval(intervalo);
            if (recording) recording.stopAndUnloadAsync();
        };
    }, []);

    const pedirPermisos = async () => {
        const { granted } = await Audio.requestPermissionsAsync();
        if (!granted) {
            Alert.alert(
                'Permisos requeridos',
                'Necesitamos acceso al micrófono para grabar audio',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }
    };

    const iniciarGrabacion = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording: nuevaGrabacion } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            setRecording(nuevaGrabacion);
            setGrabando(true);
            setDuracion(0);

            // Contador de segundos
            const id = setInterval(() => {
                setDuracion(prev => prev + 1);
            }, 1000);
            setIntervalo(id);

        } catch (error) {
            Alert.alert('Error', 'No se pudo iniciar la grabación');
            console.log(error);
        }
    };

    const detenerGrabacion = async () => {
        try {
            clearInterval(intervalo);
            setIntervalo(null);
            setGrabando(false);

            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();

            setAudioGuardado({ uri, duracion });
            setRecording(null);

            console.log('Audio guardado en:', uri);
        } catch (error) {
            Alert.alert('Error', 'No se pudo detener la grabación');
            console.log(error);
        }
    };

    const descartarAudio = () => {
        setAudioGuardado(null);
        setDuracion(0);
    };

    const procesarAudio = async () => {
        if (!audioGuardado) {
            Alert.alert('Error', 'Primero graba un audio');
            return;
        }
        setLoading(true);

        //En teoria en esta parte de aqui se conecta con Gemini para procesar el audio 
        console.log('Procesando audio:', audioGuardado.uri);
        setLoading(false);
    };

    const formatearTiempo = (segundos) => {
        const m = Math.floor(segundos / 60).toString().padStart(2, '0');
        const s = (segundos % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Grabar Audio</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Zona de grabación */}
            <View style={styles.grabacionZona}>

                {/* Indicador de estado */}
                <View style={[styles.estadoIndicador, grabando && styles.estadoGrabando]}>
                    <Ionicons
                        name={grabando ? "radio-button-on" : "mic-outline"}
                        size={48}
                        color={grabando ? "#EF4444" : "#3B82F6"}
                    />
                </View>

                {/* Tiempo */}
                <Text style={[styles.tiempo, grabando && styles.tiempoGrabando]}>
                    {formatearTiempo(duracion)}
                </Text>

                {/* Estado texto */}
                <Text style={styles.estadoTexto}>
                    {grabando ? 'Grabando...' : audioGuardado ? 'Audio listo' : 'Listo para grabar'}
                </Text>

                {/* Botón principal grabar/detener */}
                {!audioGuardado && (
                    <TouchableOpacity
                        style={[styles.botonGrabar, grabando && styles.botonDetener]}
                        onPress={grabando ? detenerGrabacion : iniciarGrabacion}
                    >
                        <Ionicons
                            name={grabando ? "stop" : "mic"}
                            size={32}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                )}

            </View>

            {/* Card de audio grabado */}
            {audioGuardado && (
                <View style={styles.audioCard}>
                    <View style={styles.audioIconContainer}>
                        <Ionicons name="musical-notes-outline" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.audioInfo}>
                        <Text style={styles.audioNombre}>Audio grabado</Text>
                        <Text style={styles.audioDuracion}>
                            Duración: {formatearTiempo(audioGuardado.duracion)}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={descartarAudio}>
                        <Ionicons name="close-circle-outline" size={22} color="#94A3B8" />
                    </TouchableOpacity>
                </View>
            )}

            {/* Botones de acción */}
            <View style={styles.botonesContainer}>
                {audioGuardado && (
                    <>
                        <TouchableOpacity
                            style={styles.botonDescartar}
                            onPress={descartarAudio}
                        >
                            <Text style={styles.botonDescartarTexto}>Grabar de nuevo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.botonProcesar, loading && { opacity: 0.7 }]}
                            onPress={procesarAudio}
                            disabled={loading}
                        >
                            {loading
                                ? <ActivityIndicator color="#fff" />
                                : <Text style={styles.botonProcesarTexto}>Generar Apuntes</Text>
                            }
                        </TouchableOpacity>
                    </>
                )}
            </View>

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
    grabacionZona: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        borderWidth: 0.5,
        borderColor: '#E5E7EB',
        marginBottom: 24,
    },
    estadoIndicador: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#EEF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    estadoGrabando: {
        backgroundColor: '#FEE2E2',
    },
    tiempo: {
        fontSize: 48,
        fontWeight: '700',
        color: '#0F172A',
        fontVariant: ['tabular-nums'],
        marginBottom: 8,
    },
    tiempoGrabando: {
        color: '#EF4444',
    },
    estadoTexto: {
        fontSize: 15,
        color: '#94A3B8',
        marginBottom: 32,
    },
    botonGrabar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonDetener: {
        backgroundColor: '#EF4444',
    },
    audioCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 0.5,
        borderColor: '#E5E7EB',
    },
    audioIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EEF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    audioInfo: {
        flex: 1,
    },
    audioNombre: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    audioDuracion: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 2,
    },
    botonesContainer: {
        gap: 12,
    },
    botonDescartar: {
        height: 54,
        backgroundColor: '#F3F4F6',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    botonDescartarTexto: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: '600',
    },
    botonProcesar: {
        height: 54,
        backgroundColor: '#3B82F6',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonProcesarTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});