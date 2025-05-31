import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppNavigator from './src/navigators/AppNavigator';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#961806' }}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}
