import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedProps
} from 'react-native-reanimated';

const API_URL = 'https://airvision-model-api.onrender.com';


// Creamos componentes animados
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function PredictionsScreen() {
  // Estado para el selector de hora
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Estado de inputs
  const [inputs, setInputs] = useState({
    LLUVIA_CIUDAD: '',
    NO2_CIUDAD: '',
    O3_CIUDAD: '',
    TEMPERATURA_CIUDAD: '',
    PM10_CIUDAD: '',
  });

  // Estado de resultados
  const [results, setResults] = useState<{
    prediccion_temperatura?: number;
    prediccion_pm10?: number;
    cluster_lluvia?: number;
  }>({});

  // Estado para mensajes
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Valores animados
  const circleRadius = useSharedValue(30);
  const pathStrokeWidth = useSharedValue(4);
  const rectHeight = useSharedValue(20);

  // Configuración de animaciones
  React.useEffect(() => {
    circleRadius.value = withRepeat(
      withTiming(25, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    
    pathStrokeWidth.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    
    rectHeight.value = withRepeat(
      withTiming(15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  // Props animadas
  const animatedCircleProps = useAnimatedProps(() => ({
    r: circleRadius.value
  }));

  const animatedPathProps = useAnimatedProps(() => ({
    strokeWidth: pathStrokeWidth.value
  }));

  const animatedRectProps = useAnimatedProps(() => ({
    height: rectHeight.value
  }));

  // Manejar cambio en inputs
  const handleInputChange = (field: string, value: string) => {
    setInputs({ ...inputs, [field]: value });
  };

  // Manejar cambio de hora
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Función para llamar a la API
  const handlePredict = async () => {
    // Validar campos
    for (const key in inputs) {
      if (inputs[key as keyof typeof inputs].trim() === '') {
        setInfoMsg(`Por favor completa el campo ${key}`);
        return;
      }
    }

    setLoading(true);
    setInfoMsg('Enviando datos y generando predicción...');

    try {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const horaDecimal = hours + minutes / 60;

      const body = {
        HORA: horaDecimal.toFixed(2),
        LLUVIA_CIUDAD: parseFloat(inputs.LLUVIA_CIUDAD),
        NO2_CIUDAD: parseFloat(inputs.NO2_CIUDAD),
        O3_CIUDAD: parseFloat(inputs.O3_CIUDAD),
        TEMPERATURA_CIUDAD: parseFloat(inputs.TEMPERATURA_CIUDAD),
        PM10_CIUDAD: parseFloat(inputs.PM10_CIUDAD),
      };

      const response = await fetch(`${API_URL}/predict/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setInfoMsg(`Error: ${errorData.detail || 'Fallo en la predicción'}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResults(data);
      setInfoMsg('Predicción exitosa! Aquí tienes los resultados:');
    } catch (error) {
      setInfoMsg('Error: No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Interpretar resultados
  const interpretResult = (value?: number, type: 'temp' | 'pm10' | 'rain' = 'temp') => {
    if (value === undefined) return 'No disponible';
    
    switch(type) {
      case 'temp':
        if (value < 15) return 'Frío ⛄';
        if (value < 25) return 'Agradable 😊';
        return 'Caluroso 🔥';
      case 'pm10':
        if (value < 20) return 'Bueno ✅';
        if (value < 50) return 'Regular ⚠️';
        return 'Malo ❌';
      case 'rain':
        if (value === 0) return 'Sin lluvia ☀️';
        if (value === 1) return 'Lluvia ligera 🌧️';
        return 'Lluvia intensa ⛈️';
      default:
        return value.toString();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Predicciones Inteligentes</Text>
        <Text style={styles.description}>
          Ingresa los datos para obtener predicciones de calidad del aire.
        </Text>

        {/* Selector de hora */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora del día</Text>
          <TouchableOpacity 
            style={styles.timeInput}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timeText}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* Inputs para otros datos */}
        {Object.entries(inputs).map(([key, val]) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{key.replace(/_/g, ' ')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={val}
              onChangeText={(text) => handleInputChange(key, text)}
              placeholder={`Ingrese ${key.replace(/_/g, ' ')}`}
            />
          </View>
        ))}

        <Button title="Obtener Predicción" onPress={handlePredict} />

        {loading && <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />}

        {infoMsg !== '' && (
          <Text style={[styles.infoMsg, loading ? { color: '#999' } : { color: '#333' }]}>
            {infoMsg}
          </Text>
        )}

        {/* Resultados */}
        {(results.prediccion_temperatura !== undefined ||
          results.prediccion_pm10 !== undefined ||
          results.cluster_lluvia !== undefined) && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Temperatura</Text>
              <Text style={styles.resultValue}>
                {results.prediccion_temperatura?.toFixed(1)}°C
              </Text>
              <Text style={styles.resultInterpretation}>
                {interpretResult(results.prediccion_temperatura, 'temp')}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Calidad del Aire (PM10)</Text>
              <Text style={styles.resultValue}>
                {results.prediccion_pm10?.toFixed(1)} µg/m³
              </Text>
              <Text style={styles.resultInterpretation}>
                {interpretResult(results.prediccion_pm10, 'pm10')}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Pronóstico de Lluvia</Text>
              <Text style={styles.resultValue}>
                {results.cluster_lluvia === 0 ? 'No' : 'Sí'}
              </Text>
              <Text style={styles.resultInterpretation}>
                {interpretResult(results.cluster_lluvia, 'rain')}
              </Text>
            </View>
          </View>
        )}

        {/* SVG animado */}
        <View style={styles.svgContainer}>
          <Svg height="120" width="120" viewBox="0 0 100 100">
            <AnimatedCircle 
              cx="50" 
              cy="50" 
              stroke="#3498db" 
              strokeWidth="4" 
              fill="lightblue"
              animatedProps={animatedCircleProps}
            />
            <AnimatedPath
              d="M 35 50 L 65 50"
              stroke="#2980b9"
              strokeLinecap="round"
              animatedProps={animatedPathProps}
            />
            <AnimatedRect
              x="45"
              y="40"
              width="10"
              fill="#3498db"
              rx="3"
              ry="3"
              animatedProps={animatedRectProps}
            />
          </Svg>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 40, // Espacio extra para evitar que la barra de navegación tape contenido
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#34495e',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#34495e',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  infoMsg: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3498db',
    marginBottom: 4,
  },
  resultInterpretation: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '500',
  },
  svgContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});