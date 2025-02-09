import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() || 'light'; 

  const screenOptions = {
    tabBarActiveTintColor: Colors[colorScheme].tint,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: Colors[colorScheme].background, 
      borderTopWidth: 1, 
      borderTopColor: Colors[colorScheme].tint,
      height: Platform.OS === 'ios' ? 90 : 60, // Ajusta la altura de la barra en iOS y Android
      paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    },
  };

  return (
    <Tabs screenOptions={screenOptions}>
      
      {/* Pantalla Principal */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* Predicciones */}
      <Tabs.Screen
        name="predicciones"
        options={{
          title: 'Predicciones',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
        }}
      />

      {/* Historial */}
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock.fill" color={color} />,
        }}
      />

      {/* Configuración */}
      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}