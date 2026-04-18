import React from 'react';
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Feedback({ route, navigation }) {
  const { answers } = route.params;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      {/*  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Retroalimentación</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {answers.map((item, index) => (
          <View key={index} style={styles.card}>
            
            <Text style={styles.question}>
              {index + 1}. {item.question}
            </Text>

            <View style={[styles.answerBox, item.isCorrect ? styles.correctBox : styles.incorrectBox,]}>
              <Text
                style={[
                  styles.answerText,
                  item.isCorrect ? styles.correctText : styles.incorrectText,
                ]}
              >
                Tu respuesta: {item.selectedAnswer}
              </Text>
            </View>

            {!item.isCorrect && (
              <View style={styles.correctAnswerBox}>
                <Text style={styles.correctAnswerLabel}>
                  Respuesta correcta:
                </Text>
                <Text style={styles.correctAnswerText}>
                  {item.correctAnswer}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },

  question: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 14,
  },

  answerBox: {
    borderRadius: 14,
    padding: 14,
  },

  correctBox: {
    backgroundColor: '#ECFDF5',
  },

  incorrectBox: {
    backgroundColor: '#FEF2F2',
  },

  answerText: {
    fontSize: 15,
    fontWeight: '500',
  },

  correctText: {
    color: '#059669',
  },

  incorrectText: {
    color: '#DC2626',
  },

  correctAnswerBox: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  correctAnswerLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
  },

  correctAnswerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
});