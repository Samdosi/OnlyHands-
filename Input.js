import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputcontainer,
          { borderColor: error ? "red" : isFocused ? "white" : "black" },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 28, color: "white", margin: 10 }}
        ></Icon>
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: "red", flex: 1 }}
          {...props}
        ></TextInput>
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 22, color: "white", margin: 16 }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          ></Icon>
        )}
      </View>
      {error && (
        <Text style={{ color: "red", margin: 15, fontSize: 18 }}>{error}</Text>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "gray",
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputcontainer: {
    height: 55,
    flexDirection: "row",
    marginHorizontal: 15,
    borderWidth: 0.5,
    alignContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
});
export default Input;
