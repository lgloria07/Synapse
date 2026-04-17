import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>Pagina de pergil</Text>
    </View>
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
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    marginRight: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  profileCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  career: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  statBox: {
    width: '30%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  statLabel: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },

  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    marginBottom: 24,
  },

  chart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    borderWidth:1,
    marginRight:110,
  },

  legend: {
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 6,
  },

  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },

  achievementTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },

  achievementSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },

  configCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    gap: 12,
  },

  configTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },

  configSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },

  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
  },

  logoutText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 15,
  },

});
