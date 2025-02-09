import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sharedStyles } from '../estilos';

export default function SettingsScreen() {
  const [location, setLocation] = useState('Bucaramanga');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const saveSettings = async () => {
    try {
      const settings = {
        location,
        notifications,
        darkMode,
      };
      await AsyncStorage.setItem('settings', JSON.stringify(settings));
      alert('Configuraciones guardadas');
    } catch (error) {
      console.error('Error guardando configuraciones:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={sharedStyles.title}>Configuración</Text>

      {/* Selección de Ubicación */} 
      <Text style={styles.label}>Ubicación:</Text>
      <Picker
        selectedValue={location}
        style={styles.picker}
        onValueChange={(itemValue) => setLocation(itemValue)}
      >
        <Picker.Item label="Bucaramanga" value="Bucaramanga" />
        <Picker.Item label="Bogotá" value="Bogotá" />
        <Picker.Item label="Medellín" value="Medellín" />
        <Picker.Item label="Cali" value="Cali" />
      </Picker>

      {/* Notificaciones */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Notificaciones:</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      {/* Modo Claro/Oscuro */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Modo Oscuro:</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Botón de Guardar */}
      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },

  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
