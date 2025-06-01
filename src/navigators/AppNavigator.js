import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import HelplineScreen from '../screens/HelplineScreen';
import TipsScreen from '../screens/TipsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#961806',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Mera Haq - Legal Rights for Women'}}
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen}
        options={({ route }) => ({ 
          title: route.params?.title,
          headerStyle: {
            backgroundColor: '#961806',
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

const TipsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#961806',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="DailyTips" 
        component={TipsScreen}
        options={{ title: 'Daily Legal Tips' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: '#FFA500', // Brighter orange for better visibility
          tabBarStyle: {
            backgroundColor: '#600A00', // Darker red for better contrast
            borderTopColor: '#FFD700',
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 3,
          },
          tabBarIconStyle: {
            marginBottom: -3,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Helpline') {
              iconName = focused ? 'phone' : 'phone-outline';
            } else if (route.name === 'Tips') {
              iconName = focused ? 'lightbulb' : 'lightbulb-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#961806',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Tips" 
          component={TipsStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Helpline" 
          component={HelplineScreen} 
          options={{ title: 'Helpline' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
