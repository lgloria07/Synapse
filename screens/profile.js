import React from 'react';
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,Alert,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  const stats = [
    { label: 'Notas', value: '24' },
    { label: 'Promedio', value: '91%' },
    { label: 'Días racha', value: '7' },
  ];

  const accomplishments = [
    {
      id: 1,
      title: 'Primera Nota',
      sub: 'Completaste tu primera nota',
      icon: 'ribbon-outline',
    },
    {
      id: 2,
      title: 'Racha de 7 días',
      sub: 'Estudiaste 7 días seguidos',
      icon: 'trending-up-outline',
    },
    {
      id: 3,
      title: 'Estudioso',
      sub: 'Completaste 20 quizzes',
      icon: 'book-outline',
    },
  ];

  const settings = [
    {
      id: 'notif',
      title: 'Notificaciones',
      sub: 'Recordatorios de estudio',
      icon: 'notifications-outline',
    },
    {
      id: 'priv',
      title: 'Privacidad',
      sub: 'Configuración de datos',
      icon: 'shield-outline',
    },
    {
      id: 'help',
      title: 'Ayuda',
      sub: 'Centro de soporte',
      icon: 'help-circle-outline',
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: () => navigation.navigate('login'),
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = (item, isConfig = false) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        isConfig &&
        Alert.alert(
          item.title,
          `Configuración de ${item.title.toLowerCase()}`
        )
      }
      style={[
        styles.cardBase,
        isConfig ? styles.configItem : styles.achievementCard,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          isConfig ? styles.configIcon : styles.achievementIcon,
        ]}
      >
        <Ionicons
          name={item.icon}
          size={isConfig ? 22 : 24}
          color={isConfig ? '#94A3B8' : '#3B82F6'}
        />
      </View>

      <View style={styles.flex1}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSub}>{item.sub}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.title}>Perfil</Text>

        <View style={styles.profileCard}>
          <View style={styles.rowCenter}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={35} color="#FFFFFF" />
            </View>

            <View>
              <Text style={styles.name}>María González</Text>
              <Text style={styles.career}>Ingeniería en Sistemas</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {stats.map((s, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statNumber}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rendimiento</Text>

        <View style={styles.performanceCard}>
          <View style={styles.chartBox}>
            <View
              style={[
                styles.donut,
                {
                  borderColor: '#3B82F6',
                  transform: [{ rotate: '0deg' }],
                },
              ]}
            />

            <View
              style={[
                styles.donut,
                {
                  borderColor: '#A855F7',
                  borderLeftColor: 'transparent',
                  transform: [{ rotate: '230deg' }],
                },
              ]}
            />

            <View
              style={[
                styles.donut,
                {
                  borderColor: '#94A3B8',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  transform: [{ rotate: '320deg' }],
                },
              ]}
            />

            <View style={styles.hole} />
          </View>

          <View style={styles.flex1}>
            {[
              { c: '#3B82F6', l: 'Excelente', p: '65%' },
              { c: '#A855F7', l: 'Bueno', p: '25%' },
              { c: '#94A3B8', l: 'Regular', p: '10%' },
            ].map((l, i) => (
              <View key={i} style={styles.legendItem}>
                <View
                  style={[styles.dot, { backgroundColor: l.c }]}
                />
                <Text style={styles.legendText}>{l.l}</Text>
                <Text style={styles.legendPercentage}>{l.p}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Logros</Text>

        {accomplishments.map((a) => renderItem(a))}

        <Text style={styles.sectionTitle}>Configuración</Text>

        <View style={styles.configGroup}>
          {settings.map((s, i) => (
            <View key={s.id}>
              {renderItem(s, true)}
              {i < settings.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Ionicons
            name="exit-outline"
            size={20}
            color="#EF4444"
            style={styles.mr8}
          />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  career: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    width: '31%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },

  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },

  chartBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },

  donut: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 14,
    borderTopColor: 'transparent',
  },

  hole: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },

  legendText: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
  },

  legendPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },

  cardBase: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  achievementCard: {
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },

  configItem: {
    paddingVertical: 12,
  },

  iconContainer: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  achievementIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#E0EEFF',
  },

  configIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },

  cardSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },

  configGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },

  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },

  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 16,
  },

  flex1: {
    flex: 1,
  },

  mr8: {
    marginRight: 8,
  },
});