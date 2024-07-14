import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar as NativeStatusBar } from 'react-native';
import ListTodo from './components/ListTodo';


const statusBarHeight = NativeStatusBar.currentHeight;
// console.log(statusBarHeight);

export default function App() {
  return (
    <View style={styles.container}>
      <ListTodo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
});
