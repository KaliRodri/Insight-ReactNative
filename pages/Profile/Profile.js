import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

const UserProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState("");
  const [isTextInputVisible, setIsTextInputVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadUserData();
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Desculpe, precisamos de permissão para acessar a câmera e a galeria."
        );
      }
    })();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setUserPhoto(selectedImage.uri);
      saveUserData(selectedImage.uri, userName);
      setIsTextInputVisible(false);
    }
  };

  const saveUserData = async (photoUri, name) => {
    try {
      if (photoUri) {
        await AsyncStorage.setItem("userPhoto", photoUri);
      }
      if (name) {
        await AsyncStorage.setItem("userName", name);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const loadUserData = async () => {
    try {
      const photoUri = await AsyncStorage.getItem("userPhoto");
      const name = await AsyncStorage.getItem("userName");

      if (photoUri !== null) {
        setUserPhoto(photoUri);
      }

      if (name !== null) {
        setUserName(name);
        setIsTextInputVisible(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleMyCoursePress = async () => {
    const selectedCourse = await AsyncStorage.getItem("selectedCourse");

    if (selectedCourse) {
      navigation.navigate("Semestres", { course: selectedCourse });
    } else {
      navigation.navigate("Campi");
    }
  };

  const handleImageDelete = async () => {
    // Lógica de exclusão da foto
    try {
      await AsyncStorage.removeItem("userPhoto");
      setUserPhoto(null);
    } catch (error) {
      console.error("Error deleting user photo:", error);
    }
  };

  const handleWelcomeTextPress = () => {
    toggleModal();
  };

  const handleNameInputSubmit = async () => {
    toggleModal();
    // Salva o nome do usuário no AsyncStorage
    await saveUserData(userPhoto, userName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centralizedContent}>
        <TouchableWithoutFeedback onPress={pickImage}>
          <View>
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>
                  Toque para escolher uma foto
                </Text>
              </View>
            )}
            {userPhoto && (
              <View style={styles.deleteIconContainer}>
                <TouchableOpacity onPress={handleImageDelete}>
                  <Icon
                    name="trash"
                    size={width * 0.04}
                    color="#FF0000"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={handleWelcomeTextPress}>
          <Text style={styles.welcomeMessage}>
            {userName || "Nome de usuário"}
          </Text>
        </TouchableOpacity>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          backdropOpacity={0.5}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Funcionalidades da Tela</Text>
            <Text style={styles.modalText}>
              Aqui você pode visualizar e editar seu perfil.
            </Text>
            <Text style={styles.modalText}>
              Toque na imagem para adicionar ou alterar sua foto de perfil.
            </Text>
            <Text style={styles.modalText}>
              Toque no nome para editar seu nome de usuário.
            </Text>
          </View>
        </Modal>
      </View>

      <ButtonsSection
        route={route}
        navigation={navigation}
        onPressMyCourse={handleMyCoursePress}
      />

      <FloatingButton onPress={toggleModal} />
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
        onPress={() => navigation.navigate("Calculadora")}
      >
        <Icon name="calculator" size={width * 0.04} color="#dbe3e5" />
        <Text style={styles.buttonText}>Minha calculadora</Text>
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
      <Icon name="info" size={width * 0.08} color="#fff" />
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
  profileImage: {
    width: width * 0.72,
    height: height * 0.35,
    borderRadius: 185,
    marginBottom: height * 0.03,
    borderColor: "#21F078",
    borderWidth: 5,
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
    right: width * 0.05,
    backgroundColor: "#21F078",
    borderRadius: 50,
    width: width * 0.15,
    height: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default UserProfileScreen;
