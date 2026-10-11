import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Type } from '@/constants/typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import useLoginAccountStore from '@/store/loginAccountStore';

export default function TabLayout() {
  const { colors } = useAppTheme();
  const { accountLoginData } = useLoginAccountStore();
  const insets = useSafeAreaInsets();
  // A numeric tab bar height replaces the navigator's built-in inset.
  // On Android that inset is the 3-button (or gesture) navigation bar.
  const androidNavInset = Platform.OS === 'android' ? insets.bottom : 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarLabelStyle: {
          fontSize: Type.caption.fontSize,
          fontWeight: '500',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: (Platform.OS === 'ios' ? 88 : 64) + androidNavInset,
          paddingTop: 6,
          ...(Platform.OS === 'android' ? { paddingBottom: androidNavInset } : {}),
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shippinghistory"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'time' : 'time-outline'} color={color} />
          ),
          href: (accountLoginData.role === 'USER' ? '/shippinghistory' : null) as any,
        }}
      />
      <Tabs.Screen
        name="adminorderdetail"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cube' : 'cube-outline'} color={color} />
          ),
          href:
            (accountLoginData.role === 'AGENT' || accountLoginData.role === 'SUB_AGENT'
              ? '/adminorderdetail'
              : null) as any,
        }}
      />
      <Tabs.Screen
        name="superRegisterRequestTab"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
          ),
          href: (accountLoginData.role === 'SUPERADMIN' ? '/superRegisterRequestTab' : null) as any,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
