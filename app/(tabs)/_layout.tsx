import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import BarraNavegacion from '@/components/ui/BarraNavegacion';

export default function TabLayout() {
  const colorScheme = useColorScheme() || 'light'; 


  return (
    <Tabs tabBar={(props) => <BarraNavegacion{...props}/>}>
      
      {/* Pantalla Principal */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: false, 
        }}
      />

      {/* Predicciones */}
      <Tabs.Screen
        name="predicciones"
        options={{
          title: 'Predicciones',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
          headerShown: false, 
        }}
      />

      {/* Historial */}
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock.fill" color={color} />,
          headerShown: false, 
        }}
      />

      {/* Configuración */}
      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}