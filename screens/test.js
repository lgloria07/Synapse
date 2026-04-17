import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import quizData from '../data/quizz.json';

export default function Test({ navigation }) {
  //Para saber cuantas preguntas quedan
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //Registrar la respuesta seleccionada por el ususario
  const [selected, setSelected] = useState(null);
  //Levar la cuenta de los puntos
  const [score, setScore] = useState(0);
  //Mostrar pantalla de resultados cuando se terminan las preguntas
  const [finished, setFinished] = useState(false);
  //Guardar todas las respuestas para mostrarlas en retroalimentación
  const [answers, setAnswers] = useState([]);
  //Mensaje de resultado
  const [result, setResult] = useState("");
  //Ruta de la imagen resultado 
  const [imgResult, setImgResult] = useState("");

  //Se guarda el json en una variable
  const questions = quizData.quiz;

  //Navegación a "feedback", se envían como parámetros el arreglo de respuestas seleccionado por el usuario
  const verRetroalimentacion = () => {
    navigation.navigate('feedback', {answers: answers,});
  };

  //Continuar a la siguiente pregunta (si el usuario selecciono una opción)
  const handleNext = () => {
    if (selected === null) return;

    //Actualizar el arreglo de respuestas, se guarda la pregunta, la respuesta seleccionada, la respuesta correcta y 
    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestion].pregunta,
        selectedAnswer: questions[currentQuestion].opciones[selected].texto,
        correctAnswer: questions[currentQuestion].opciones.find(op => op.correcta).texto,
        isCorrect: questions[currentQuestion].opciones[selected].correcta,
      }
    ];

    setAnswers(updatedAnswers);

    if (questions[currentQuestion].opciones[selected].correcta) {
      setScore(score + 1);
    }
    //Avanzar hasta llegar a la ultima pregunta
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };
  //Si ya no hay mas preguntas, mostrar pantalla de resultados
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    if(percentage>59){
      setResult("Buen trabajo!")
      setImgResult("../images/check.png");
    }else{
      setResult("Hay que estudiar :7")
      setImgResult("../images/x.png");
    }

    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>

          <View style={styles.resultIcon}>
            {/*  <Image source={require({imgResult})}/> */}
          </View>

          <Text style={styles.resultTitle}>Sigue practicando</Text>
          <Text style={styles.resultSubtitle}>
            Revisa los conceptos y vuelve a intentarlo
          </Text>

          <View style={styles.scoreBox}>
            <Text style={styles.score}>{percentage}%</Text>
            <Text style={styles.scoreText}>
              {score} de {questions.length} correctas
            </Text>
          </View>

          {/* BOTON RETROALIMENTACION */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={verRetroalimentacion}>
            <Text style={styles.primaryButtonText}>Ver retoalimentación</Text>
          </TouchableOpacity>

          {/* BOTON DE VOLVER A HOME */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.counter}>
          {currentQuestion + 1} de {questions.length}
        </Text>
      </View>

      {/* Barra progreso */}
      <View style={styles.progressBar}>
        <View style={[styles.progress,{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
      </View>

      {/* Pregunta */}
      <View style={styles.card}>
        <Text style={styles.question}>
          {question.pregunta}
        </Text>

        {/* Respuestas */}
        {question.opciones.map((op, index) => (
          <TouchableOpacity key={index}
            style={[
              styles.option,
              selected === index && styles.optionSelected
            ]}
            onPress={() => setSelected(index)}
          >
            <View style={styles.radio} />
            <Text style={styles.optionText}>{op.texto}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Siguiente</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 24,
    paddingTop: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:70,
  },
  counter: {
    color: '#94A3B8',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 24,
  },
  progress: {
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#0F172A',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    marginRight: 12,
  },

  optionText: {
    fontSize: 15,
  },
  nextButton: {
    backgroundColor: '#94A3B8',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  resultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  resultSubtitle: {
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  score: {
    fontSize: 40,
    fontWeight: '700',
  },
  scoreText: {
    color: '#94A3B8',
  },
  primaryButton: {
    backgroundColor: '#ad5555',
    padding: 16,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom:10,
  },
  secondaryButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});