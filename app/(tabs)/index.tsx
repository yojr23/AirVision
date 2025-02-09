import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { sharedStyles } from '../estilos';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Text style={sharedStyles.title}>Bienvenido a Air Vision</Text>
      <Text style={styles.location}>Ubicación: Bucaramanga, Colombia</Text>

      {/* Tarjeta de Calidad del Aire */}
      <View style={styles.card}>
        <Text style={styles.aqiTitle}>Índice de Calidad del Aire</Text>
        <Text style={styles.aqiValue}>53 - Moderado</Text>
        <Text style={styles.pollutants}>PM2.5: 35 µg/m³ | O3: 70 ppb</Text>
      </View>

      {/* Botón para Predicciones */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/predicciones')}
      >
        <Text style={styles.buttonText}>Ver Predicción Detallada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  aqiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  aqiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA500',
    marginVertical: 5,
  },
  pollutants: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
