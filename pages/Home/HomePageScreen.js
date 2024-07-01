import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const HomePage = ({ route }) => {
  const navigation = useNavigation();

  const handleProfilePress = async () => {
    const selectedCourse = await AsyncStorage.getItem("selectedCourse");
    navigation.navigate("Profile", { courseName: selectedCourse });
  };

  const handleMyCoursePress = async () => {
    const selectedCourse = await AsyncStorage.getItem("selectedCourse");

    if (selectedCourse) {
      navigation.navigate("Semestres", { course: selectedCourse });
    } else {
      navigation.navigate("Campi");
    }
  };

  return (
    <View style={styles.container}>
      <ButtonsSection
        route={route}
        navigation={navigation}
        onPressMyCourse={handleMyCoursePress}
      />
      <FloatingButton onPress={handleProfilePress} />
    </View>
  );
};

const ButtonsSection = ({ route, navigation, onPressMyCourse }) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={onPressMyCourse}>
        <Icon name="graduation-cap" size={width * 0.04} color="#dbe3e5" />
        <Text style={styles.buttonText}>Meu curso</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Horários")}
      >
        <Icon name="clock-o" size={width * 0.05} color="#dbe3e5" />
        <Text style={styles.buttonText}>Minhas aulas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Icon name="calendar" size={width * 0.04} color="#dbe3e5" />
        <Text style={styles.buttonText}>Calendário Acadêmico</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Campi")}
      >
        <Icon name="book" size={width * 0.04} color="#dbe3e5" />
        <Text style={styles.buttonText}>Selecionar curso</Text>
      </TouchableOpacity>
    </View>
  );
};

const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Icon name="user" size={width * 0.09} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: height * 0.07,
    backgroundColor: "#121b22",
  },
  centralizedContent: {
    alignItems: "center",
  },
  profileButton: {
    position: "absolute",
    bottom: height * 0.05,
    right: width * 0.05,
    backgroundColor: "#21F078",
    borderRadius: 50,
    width: width * 0.15,
    height: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  placeholderImage: {
    width: width * 0.72,
    height: height * 0.35,
    backgroundColor: "#1f2c34",
    borderRadius: 185,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#586A75",
    borderWidth: 5,
    marginBottom: height * 0.03,
  },
  placeholderText: {
    color: "#dbe3e5",
    fontSize: width * 0.04,
  },
  deleteIconContainer: {
    position: "absolute",
    top: height * 0.01,
    right: width * 0.01,
  },
  deleteIcon: {
    backgroundColor: "#fff",
    padding: width * 0.012,
    borderRadius: 45,
  },
  welcomeMessage: {
    fontSize: width * 0.05,
    marginBottom: height * 0.03,
    color: "#dbe3e5",
    textDecorationLine: "underline",
  },
  buttonsContainer: {
    justifyContent: "flex-start",
    padding: width * 0.02,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: width * 0.03,
    borderRadius: 5,
    marginBottom: height * 0.01,
    borderColor: "#586A75",
    borderBottomWidth: 1,
  },
  buttonText: {
    color: "#dbe3e5",
    fontSize: width * 0.04,
    marginLeft: width * 0.04,
  },
  modalContainer: {
    backgroundColor: "#121b22",
    padding: width * 0.05,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: width * 0.05,
    marginBottom: height * 0.02,
    color: "#dbe3e5",
  },
  modalText: {
    fontSize: width * 0.04,
    marginBottom: height * 0.015,
    color: "#dbe3e5",
  },
  floatingButton: {
    position: "absolute",
    bottom: height * 0.05,
    right: width * 0.07,
    backgroundColor: "#21F078",
    borderRadius: 50,
    width: width * 0.15,
    height: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default HomePage;
