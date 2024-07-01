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
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const UserProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { course, highestGradeDiscipline, lowestGradeDiscipline } = route.params || {};
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState("");
  const [courseName, setCourseName] = useState(course || "");
  const [isTextInputVisible, setIsTextInputVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [highestGrade, setHighestGrade] = useState(null);
  const [lowestGrade, setLowestGrade] = useState(null);
  const [progress, setProgress] = useState(route.params?.progress || 0);

  useEffect(() => {
    loadUserData();
    loadCourseName();
    loadGrades();
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Desculpe, precisamos da sua permissão para fazer o upload da foto de perfil.");
      }
    })();
  }, []);

  useEffect(() => {
    if (highestGradeDiscipline && lowestGradeDiscipline) {
      setHighestGrade(highestGradeDiscipline);
      setLowestGrade(lowestGradeDiscipline);
      saveGrades(highestGradeDiscipline, lowestGradeDiscipline);
    }
  }, [highestGradeDiscipline, lowestGradeDiscipline]);

  const loadUserData = async () => {
    try {
      const photoUri = await AsyncStorage.getItem("userPhoto");
      const name = await AsyncStorage.getItem("userName");

      if (photoUri) setUserPhoto(photoUri);
      if (name) {
        setUserName(name);
        setIsTextInputVisible(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const loadCourseName = async () => {
    try {
      const course = await AsyncStorage.getItem("selectedCourse");
      if (course) setCourseName(course);
    } catch (error) {
      console.error("Error loading course name:", error);
    }
  };

  const loadGrades = async () => {
    try {
      const highest = JSON.parse(await AsyncStorage.getItem("highestGradeDiscipline"));
      const lowest = JSON.parse(await AsyncStorage.getItem("lowestGradeDiscipline"));
      if (highest) setHighestGrade(highest);
      if (lowest) setLowestGrade(lowest);
    } catch (error) {
      console.error("Error loading grades:", error);
    }
  };

  const saveGrades = async (highest, lowest) => {
    try {
      await AsyncStorage.setItem("highestGradeDiscipline", JSON.stringify(highest));
      await AsyncStorage.setItem("lowestGradeDiscipline", JSON.stringify(lowest));
    } catch (error) {
      console.error("Error saving grades:", error);
    }
  };

  useEffect(() => {
    if (route.params?.progress !== undefined) {
      setProgress(route.params.progress);
      saveProgress(route.params.progress); // Salvar progresso inicial
    }
  }, [route.params?.progress]);
  
  useEffect(() => {
    loadProgress();
  }, []);
  
  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem("progress");
      if (savedProgress !== null) {
        setProgress(parseFloat(savedProgress));
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };
  
  const saveProgress = async (value) => {
    try {
      await AsyncStorage.setItem("progress", value.toString());
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress); // Salvar progresso atualizado
  };
  
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedImage = result.assets[0];
      setUserPhoto(selectedImage.uri);
      saveUserData(selectedImage.uri, userName);
      setIsTextInputVisible(false);
    }
  };

  const saveUserData = async (photoUri, name) => {
    try {
      if (photoUri) await AsyncStorage.setItem("userPhoto", photoUri);
      if (name) await AsyncStorage.setItem("userName", name);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleImageDelete = async () => {
    try {
      await AsyncStorage.removeItem("userPhoto");
      setUserPhoto(null);
    } catch (error) {
      console.error("Error deleting user photo:", error);
    }
  };

  const handleWelcomeTextPress = () => {
    setNewUserName(userName);
    toggleModal();
  };

  const handleNameInputSubmit = async () => {
    toggleModal();
    setUserName(newUserName);
    await saveUserData(userPhoto, newUserName);
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

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

        <Text style={styles.courseName}>{courseName || "Nome do curso"}</Text>

        {highestGrade && lowestGrade && (
          <View style={styles.gradeContainer}>
            <View style={styles.gradeBox}>
              <Text style={styles.gradeInfo}>Maior Nota:</Text>
              <Text style={styles.grade}>{highestGrade.grade}</Text>
              <Text style={styles.gradeName}>{highestGrade.name}</Text>
            </View>
            <View style={styles.gradeBox}>
              <Text style={styles.gradeInfo}>Menor Nota:</Text>
              <Text style={styles.grade}>{lowestGrade.grade}</Text>
              <Text style={styles.gradeName}>{lowestGrade.name}</Text>
            </View>
          </View>
        )}
      </View>

<View style={styles.progressContainer}>
 <View style={styles.progressCenter}>
  <Text style={styles.progressTitle}>Progresso Semestral</Text>

  <View style={styles.progressBox}>
  <Progress.Circle
  progress={progress}
  size={220}
  thickness={40}
  color="#21F078"
  unfilledColor="#E1E1E1"
  showsText={true}
  borderWidth={0}
  animated={false}
  textStyle={styles.progressText}
  onLayout={() => saveProgress(progress)} // Salvar progresso quando o layout é atualizado
/>

  </View>
 </View>
  <View style={styles.progressLegend}>
    <View style={[styles.legendBox, { backgroundColor: "#21F078" }]}>
     
    </View>
    <Text style={styles.legendText}>Concluído</Text>
    <View style={[styles.legendBox, { backgroundColor: "#E1E1E1" }]}>
      
    </View>
    <Text style={styles.legendText}>Em andamento</Text>
  </View>
</View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Digite seu nome de usuário</Text>
            <TextInput
              style={styles.modalTextInput}
              value={newUserName}
              onChangeText={setNewUserName}
              placeholder="Nome de usuário"
              fontSize={20}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleNameInputSubmit}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.07,
    backgroundColor: "#121b22",
    alignItems: "center",
  },
  centralizedContent: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: width * 0.31,
    height: height * 0.15,
    borderRadius: 185,
    marginBottom: height * 0.03,
    borderColor: "#21F078",
    borderWidth: 2,
  
  },
  placeholderImage: {
    width: width * 0.31,
    height: height * 0.15,
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
    fontSize: width * 0.02,
  },
  deleteIconContainer: {
    position: "absolute",
    top: height * 0.001,
    left: width * 0.3,
  },
  deleteIcon: {
    backgroundColor: "#fff",
    padding: width * 0.012,
    borderRadius: 45,
  },
  welcomeMessage: {
    fontSize: width * 0.05,
    marginBottom: height * 0.03,
    color: "#fff",
  },
  courseName: {
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    color: "#636568",
  },
  gradeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width* 1.1,
    paddingHorizontal: width * 0.1,
    marginTop: height * 0.025,
    elevation: 5,
  },
  gradeBox: {
    width: width * 0.4,
    backgroundColor: "#1f2c34",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: height * 0.005,
  },
  gradeInfo: {
    color: "#dbe3e5",
    fontSize: height * 0.02,
    marginBottom: 5,
  },
  grade: {
    color: "#dbe3e5",
    fontSize: 45,
    fontWeight: "bold",
  },
  gradeName: {
    color: "#dbe3e5",
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05,
    backgroundColor: "#1f2c34",
    borderRadius: 20,
    padding: 30,
    width: width * 0.85,
    elevation: 5,
  },
  progressCenter:{
    flexDirection: "column",
  },
  progressText:{
    color: "white",
  },
  progressTitle: {
    color: '#dbe3e5',
    fontSize: width * 0.05,
    marginBottom: height * 0.02,
  },
  progressBox: {
    alignItems: "center",
    flexDirection: "column",
  },
  progressLegend: {
    marginLeft: width * 0.1,
  },
  legendBox: {
    width: width * 0.055,
    height: height * 0.025,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width*0.01,
    marginTop: height * 0.07,
  },
  legendText: {
    color: "#dbe3e5",
    fontSize: height*0.012,
    marginTop: height * 0.002,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: "#121b22",
    padding: width * 0.05,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: width * 0.05,
    marginBottom: height * 0.02,
    color: "#dbe3e5",
  },
  modalTextInput: {
    backgroundColor: "#dbe3e5",
    padding: width * 0.03,
    borderRadius: 5,
    marginBottom: height * 0.02,
  },
  modalButton: {
    backgroundColor: "#1f2c34",
    padding: width * 0.03,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
});

export default UserProfileScreen;
