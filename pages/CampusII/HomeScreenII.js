import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const courses = [
  {
    name: "Sistemas de Informação",
    icon: "desktop",
    image: require("./Sistema.jpg"),
  },
  {
    name: "Matemática",
    icon: "calculator",
    image: require("./Matematica.jpg"),
  },
  {
    name: "Ed. Física - Bacharel.",
    icon: "bicycle",
    image: require("./Fisica2.jpg"),
  },
  {
    name: "Ed. Física - Licensiat.",
    icon: "bicycle",
    image: require("./Fisica.jpg"),
  },
  {
    name: "Eng. Ambiental e Sanitária",
    icon: "leaf",
    image: require("./Engenharia2.jpg"),
  },
  {
    name: "Ciências Biológicas",
    icon: "heartbeat",
    image: require("./Biologia3.jpg"),
  },
  {
    name: "Vernáculas",
    icon: "book",
    image: require("./Portugues2.jpg"),
  },
  {
    name: "Língua Francesa e Literatura",
    icon: "book",
    image: require("./Frances.jpg"),
  },
  {
    name: "Língua Inglesa e Literatura",
    icon: "book",
    image: require("./Ingles.jpg"),
  },
  {
    name: "Pedagogia",
    icon: "book",
    image: require("./progresso.jpg"),
  },
  {
    name: "História",
    icon: "book",
    image: require("./Historia.jpg"),
  },
];

const HomeScreenII = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigation = useNavigation();
  const carouselRef = React.createRef();

  useEffect(() => {
    checkInitialCourseSelection();
  }, []);

  useEffect(() => {
    // Quando o curso selecionado mudar, encontre o índice correspondente no array de cursos
    const index = courses.findIndex((course) => course.name === selectedCourse);
    if (index !== -1) {
      // Se o índice for encontrado, defina-o como o primeiro item no carrossel
      setSelectedIndex(index);
    }
  }, [selectedCourse]);

  const checkInitialCourseSelection = async () => {
    try {
      const course = await AsyncStorage.getItem("selectedCourse");
      if (course) {
        setSelectedCourse(course);
      }
    } catch (error) {
      console.error("Error checking initial course selection:", error);
    }
  };

  const handleCoursePress = async (course) => {
    try {
      await AsyncStorage.setItem("selectedCourse", course.name);
      setSelectedCourse(course.name);
      navigation.navigate("Semestres", { course: course.name });
    } catch (error) {
      console.error("Error saving selected course:", error);
    }
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleCoursePress(item)}
        style={styles.courseCard}
      >
        <Image source={item.image} style={styles.courseImage} />
        <View style={styles.courseTextContainer}>
          <Icon
            name={item.icon}
            size={24}
            color="black"
            style={styles.courseIcon}
          />
          <Text style={styles.courseName}>{item.name}</Text>
          {selectedCourse === item.name && (
            <Icon
              name="check-circle"
              size={24}
              color="#21F078"
              style={styles.checkIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./Frame_6.png")}
          style={styles.backgroundImage}
        />
      </View>
      <Text style={styles.selectedCourseText}>Escolha seu curso abaixo:</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={courses}
          renderItem={renderCarouselItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.8}
          onSnapToItem={(index) => {
            setSelectedIndex(index);
            setSelectedCourse(courses[index].name);
          }}
          firstItem={selectedIndex}
          loop={true}
        />
        <Pagination
          dotsLength={courses.length}
          activeDotIndex={selectedIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationInactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121b22",
  },
  imageContainer: {
    flex: 1.0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselContainer: {
    flex: 0.5,
    justifyContent: "center",
  },
  courseCard: {
    backgroundColor: "#1f2c34",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    margin: screenWidth * 0.009,
    borderWidth: 1,
    borderColor: "#1f2c34",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 1,
    marginBottom: screenHeight * 0.05,
  },
  courseImage: {
    width: "100%",
    height: "75%",
    resizeMode: "cover",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  courseTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Para alinhar os ícones à direita
    padding: screenWidth * 0.025,
  },
  courseIcon: {
    color: "#dbe3e5",
    marginRight: screenWidth * 0.01,
  },
  courseName: {
    color: "#dbe3e5",
    fontSize: screenWidth * 0.045,
    fontWeight: "bold",
  },
  checkIcon: {
    marginLeft: "2%",
  },
  selectedCourseText: {
    textAlign: "center",
    marginTop: screenHeight * 0.01,
    color: "#dbe3e5",
    fontSize: screenWidth * 0.05,
  },
  paginationContainer: {
    position: "absolute",
    bottom: screenHeight * 0.0001,
    alignSelf: "center",
  },
  paginationDot: {
    width: screenWidth * 0.017,
    height: screenHeight * 0.009,
    borderRadius: 4,
    marginHorizontal: "1.7%",
    backgroundColor: "#dbe3e5",
  },
  paginationInactiveDot: {
    backgroundColor: "#C4C4C4",
  },
});

export default HomeScreenII;
