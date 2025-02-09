import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { sharedStyles } from '../estilos';

// Datos de prueba
const data = [
  { time: '08:00', PM2_5: 35, PM10: 50 },
  { time: '10:00', PM2_5: 40, PM10: 55 },
  { time: '12:00', PM2_5: 45, PM10: 60 },
  { time: '14:00', PM2_5: 38, PM10: 52 },
  { time: '16:00', PM2_5: 30, PM10: 48 },
];

export default function PredictionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={sharedStyles.title}>Predicción de Calidad del Aire</Text>

      {/* Gráfico de Predicción */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tendencia del PM2.5 y PM10</Text>
        <LineChart
          data={{
            labels: data.map((item) => item.time),
            datasets: [
              { data: data.map((item) => item.PM2_5), color: () => '#FF5733' },
              { data: data.map((item) => item.PM10), color: () => '#33B5FF' },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" µg/m³"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          bezier
        />
      </View>

      {/* Lista de Predicciones */}
      <View style={styles.predictionsContainer}>
        <Text style={styles.listTitle}>Predicción por Horario</Text>
        {data.map((item, index) => (
          <View key={index} style={styles.predictionItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.value}>PM2.5: {item.PM2_5} µg/m³</Text>
            <Text style={styles.value}>PM10: {item.PM10} µg/m³</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  predictionsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
});
