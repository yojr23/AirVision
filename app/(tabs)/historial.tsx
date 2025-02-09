import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { sharedStyles } from '../estilos';

// Datos de prueba
const historyData = [
  { date: '2024-02-10', PM2_5: 32, PM10: 48 },
  { date: '2024-02-09', PM2_5: 40, PM10: 55 },
  { date: '2024-02-08', PM2_5: 38, PM10: 52 },
  { date: '2024-02-07', PM2_5: 30, PM10: 45 },
  { date: '2024-02-06', PM2_5: 35, PM10: 50 },
];

export default function HistoryScreen() {
  const [selectedDate, setSelectedDate] = useState(historyData[0].date);
  const selectedData = historyData.find((item) => item.date === selectedDate);

  return (
    <ScrollView style={styles.container}>
      <Text style={sharedStyles.title}>Historial de Calidad del Aire</Text>

      {/* Selector de Fecha */}
      <View style={styles.dateSelector}>
        {historyData.map((item) => (
          <TouchableOpacity
            key={item.date}
            style={[styles.dateButton, selectedDate === item.date && styles.activeDate]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gráfico Histórico */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tendencia de los Últimos Días</Text>
        <LineChart
          data={{
            labels: historyData.map((item) => item.date.slice(5)), // Solo día/mes
            datasets: [
              { data: historyData.map((item) => item.PM2_5), color: () => '#FF5733' },
              { data: historyData.map((item) => item.PM10), color: () => '#33B5FF' },
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
          }}
          bezier
        />
      </View>

      {/* Datos del Día Seleccionado */}
      {selectedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.listTitle}>Datos para {selectedDate}</Text>
          <Text style={styles.value}>PM2.5: {selectedData.PM2_5} µg/m³</Text>
          <Text style={styles.value}>PM10: {selectedData.PM10} µg/m³</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDate: {
    backgroundColor: '#007AFF',
  },
  dateText: {
    color: '#333',
    fontWeight: 'bold',
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
  dataContainer: {
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
  value: {
    fontSize: 16,
    color: '#555',
  },
});