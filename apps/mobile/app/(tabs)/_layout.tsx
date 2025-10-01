import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalculator, faCog } from "@fortawesome/pro-solid-svg-icons";
import HapticTab from '@/components/HapticTab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          marginTop: 2,
          fontFamily: 'PublicSans_600SemiBold',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#e5e7eb',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: 'PublicSans_700Bold',
          fontSize: 18,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          headerTitle: 'TFC Calculator',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCalculator} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCog} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}