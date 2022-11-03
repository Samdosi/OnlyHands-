import react from "react";
import { TouchableOpacity, Text, navigation } from "react-native";
const Button = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
