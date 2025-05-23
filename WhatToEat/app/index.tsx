import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Hello Expo</Text>
    </View>
  );
}

// Define Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B263B",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
  },

  text:{
    color: "#E0E1DD"
  }
})
