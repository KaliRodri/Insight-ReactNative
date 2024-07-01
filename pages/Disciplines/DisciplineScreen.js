import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity

} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import ToastManager, { Toast } from "toastify-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import * as Print from "expo-print"; // Importação do Expo Print

const { width, height } = Dimensions.get("window");

const DisciplinesScreen = ({ route }) => {
  const { course, semester, disciplines } = route.params;
  const navigation = useNavigation();
  
  

  const [disciplineData, setDisciplineData] = useState(() => {
    const initialData = {};
    disciplines.forEach((discipline) => {
      initialData[discipline] = {
        grade1: 0,
        grade2: 0,
        grade3: 0,
        finalGrade: 0,
        average: 0,
        status: "Pendente",
        // Adicionar os campos para armazenar as maiores e menores notas
        maxGrade: 0,
        minGrade: Infinity,
      };
    });
    return initialData;
  });
  
  const [visibleDisciplines, setVisibleDisciplines] = useState({});

  const [sliderValues, setSliderValues] = useState(() => {
    const initialSliderValues = {};
    disciplines.forEach((discipline) => {
      initialSliderValues[discipline] = {
        grade1: parseFloat(disciplineData[discipline]?.grade1) || 0,
        grade2: parseFloat(disciplineData[discipline]?.grade2) || 0,
        grade3: parseFloat(disciplineData[discipline]?.grade3) || 0,
      };
    });
    return initialSliderValues;
  });

  const calculateFinalGrade = (discipline) => {
    const sliderValuesForDiscipline = sliderValues[discipline];

    if (!sliderValuesForDiscipline) {
      console.error(
        `Slider values for discipline '${discipline}' are undefined`
      );
      return "-";
    }

    const { grade1, grade2, grade3 } = sliderValuesForDiscipline;

    if (grade1 === undefined || grade2 === undefined || grade3 === undefined) {
      console.error(
        `One or more grades for discipline '${discipline}' are undefined`
      );
      return "-";
    }

    const average = (grade1 + grade2 + grade3) / 3;

    if (isNaN(average)) {
      console.error(`Average for discipline '${discipline}' is NaN`);
      return "-";
    } else {
      return (50 - 7 * average) / 3;
    }
  };

  const updateGrades = async (
    discipline,
    grade1,
    grade2,
    grade3,
    finalGrade
  ) => {
    try {
      // Calcula a média das notas
      const average = (grade1 + grade2 + grade3) / 3;
  
      // Salvando as notas e média no AsyncStorage
      await AsyncStorage.setItem(
        `grades_${discipline}`,
        JSON.stringify({
          grade1,
          grade2,
          grade3,
          finalGrade,
          average: isNaN(average) ? "-" : average,
        })
      );
  
      // Atualizando a maior e menor nota
      await updateMaxMinGrades(discipline, grade1, grade2, grade3);
  
      console.log(`Grades and max/min grades saved for discipline: ${discipline}`);
  
      // Atualizar estado local, se necessário
      setSliderValues((prevValues) => ({
        ...prevValues,
        [discipline]: {
          grade1,
          grade2,
          grade3,
        },
      }));
  
      setDisciplineData((prevData) => ({
        ...prevData,
        [discipline]: {
          ...prevData[discipline],
          grade1,
          grade2,
          grade3,
          finalGrade,
          average: isNaN(average) ? "-" : average,
        },
      }));
    } catch (error) {
      console.error("Error saving grades and max/min grades:", error);
    }
  };
  
  
  const updateMaxMinGrades = async (discipline, grade1, grade2, grade3) => {
    try {
      // Recuperando as notas máximas e mínimas atuais
      let savedMaxGrade = parseFloat(await AsyncStorage.getItem(`maxGrade_${discipline}`)) || -Infinity;
      let savedMinGrade = parseFloat(await AsyncStorage.getItem(`minGrade_${discipline}`)) || Infinity;
  
      // Verificando e atualizando a maior nota
      if (grade1 > savedMaxGrade) savedMaxGrade = grade1;
      if (grade2 > savedMaxGrade) savedMaxGrade = grade2;
      if (grade3 > savedMaxGrade) savedMaxGrade = grade3;
  
      // Verificando e atualizando a menor nota
      if (grade1 < savedMinGrade) savedMinGrade = grade1;
      if (grade2 < savedMinGrade) savedMinGrade = grade2;
      if (grade3 < savedMinGrade) savedMinGrade = grade3;
  
      // Salvando as novas máximas e mínimas no AsyncStorage
      await AsyncStorage.setItem(`maxGrade_${discipline}`, savedMaxGrade.toString());
      await AsyncStorage.setItem(`minGrade_${discipline}`, savedMinGrade.toString());
  
      console.log(`Updated max grade: ${savedMaxGrade}`);
      console.log(`Updated min grade: ${savedMinGrade}`);
    } catch (error) {
      console.error("Error updating max/min grades:", error);
    }
  };

  const toggleStatus = async (discipline) => {
    setDisciplineData((prevData) => ({
      ...prevData,
      [discipline]: {
        ...prevData[discipline],
        status:
          prevData[discipline]?.status === "Concluída"
            ? "Pendente"
            : "Concluída",
      },
    }));

    try {
      // Salvando o status no AsyncStorage
      await AsyncStorage.setItem(
        `status_${discipline}`,
        JSON.stringify({
          status:
            disciplineData[discipline]?.status === "Concluída"
              ? "Pendente"
              : "Concluída",
        })
      );
    } catch (error) {
      console.error("Error saving status:", error);
    }
  };

  const toggleVisibility = (discipline) => {
    setVisibleDisciplines((prevVisibility) => ({
      ...prevVisibility,
      [discipline]: !prevVisibility[discipline],
    }));
  };

  // Função para calcular a disciplina com a maior nota
  const getMaxGradeDiscipline = async () => {
    try {
      let maxGrade = -Infinity;
      let maxGradeDiscipline = "";
  
      const keys = await AsyncStorage.getAllKeys();
      const gradeKeys = keys.filter(key => key.startsWith('grades_'));
  
      for (const key of gradeKeys) {
        const grades = await AsyncStorage.getItem(key);
        if (grades) {
          const { grade1, grade2, grade3 } = JSON.parse(grades);
          const maxGradeCurr = Math.max(grade1, grade2, grade3);
          if (maxGradeCurr > maxGrade) {
            maxGrade = maxGradeCurr;
            maxGradeDiscipline = key.replace('grades_', '');
          }
        }
      }
  
      return { name: maxGradeDiscipline, grade: maxGrade };
    } catch (error) {
      console.error("Error getting max grade discipline:", error);
      return { name: "", grade: "-" };
    }
  };

// Função para calcular a disciplina com a menor nota
const getMinGradeDiscipline = async () => {
  try {
    let minGrade = Infinity;
    let minGradeDiscipline = "";

    const keys = await AsyncStorage.getAllKeys();
    const gradeKeys = keys.filter(key => key.startsWith('grades_'));

    for (const key of gradeKeys) {
      const grades = await AsyncStorage.getItem(key);
      if (grades) {
        const { grade1, grade2, grade3 } = JSON.parse(grades);
        const minGradeCurr = Math.min(grade1, grade2, grade3);
        if (minGradeCurr < minGrade) {
          minGrade = minGradeCurr;
          minGradeDiscipline = key.replace('grades_', '');
        }
      }
    }

    return { name: minGradeDiscipline, grade: minGrade };
  } catch (error) {
    console.error("Error getting min grade discipline:", error);
    return { name: "", grade: "-" };
  }
};


  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const dataPromises = disciplines.map(async (discipline) => {
            const grades = await AsyncStorage.getItem(`grades_${discipline}`);
            const status = await AsyncStorage.getItem(`status_${discipline}`);

            console.log(`Loaded data for ${discipline}:`, { grades, status });

            const parsedGrades = JSON.parse(grades);
            const parsedStatus = JSON.parse(status)?.status || "Pendente";

            // Calcula a média na inicialização
            const average =
              parsedGrades &&
              (parsedGrades.grade1 +
                parsedGrades.grade2 +
                parsedGrades.grade3) /
                3;

            return {
              [discipline]: {
                ...parsedGrades,
                status: parsedStatus,
                average: isNaN(average) ? "-" : average,
              },
            };
          });

          const loadedDataArray = await Promise.all(dataPromises);
          const loadedData = Object.assign({}, ...loadedDataArray);

          console.log("Loaded data:", loadedData);

          setDisciplineData(loadedData);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      loadData();
    }, [route.params.semester]) // Adiciona o semestre como dependência para recarregar os dados ao mudar de semestre
  );

  useEffect(() => {
    // Verifique se os dados foram carregados antes de inicializar o estado sliderValues
    if (Object.keys(disciplineData).length > 0) {
      const initialSliderValues = {};
      disciplines.forEach((discipline) => {
        initialSliderValues[discipline] = {
          grade1: parseFloat(disciplineData[discipline]?.grade1) || 0,
          grade2: parseFloat(disciplineData[discipline]?.grade2) || 0,
          grade3: parseFloat(disciplineData[discipline]?.grade3) || 0,
        };
      });
      setSliderValues(initialSliderValues);
    }
  }, [disciplineData]);

  const [toastDisplayed, setToastDisplayed] = useState(false);

  const calculateProgress = () => {
    const pendingDisciplines = disciplines.filter(
      (discipline) => disciplineData[discipline]?.status !== "Concluída"
    );
    const progress = (disciplines.length - pendingDisciplines.length) / disciplines.length;
  
    if (progress === 1 && !toastDisplayed) {
      Toast.success("Parabéns, passou de semestre! 🎉");
      setToastDisplayed(true);
    }
  
    return progress;
  };
  
  

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // Resetar a variável toastDisplayed para false ao sair da tela
      setToastDisplayed(false);
    });

    return unsubscribe;
  }, [navigation]);

  const FloatingButton = ({ onPress }) => {
    return (
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <Icon name="user" size={width * 0.09} color="#fff" />
      </TouchableOpacity>
    );
  };

  const handleProfilePress = async () => {
    const maxGradeDiscipline = await getMaxGradeDiscipline();
    const minGradeDiscipline = await getMinGradeDiscipline();
  
    navigation.navigate('Profile', {
      course: await AsyncStorage.getItem("selectedCourse"),
      highestGradeDiscipline: {
        name: maxGradeDiscipline.name,
        grade: maxGradeDiscipline.grade,
      },
      lowestGradeDiscipline: {
        name: minGradeDiscipline.name,
        grade: minGradeDiscipline.grade,
      },
      progress: calculateProgress(),

    });
  };
  
  return (
    <View style={styles.view}>
      <ScrollView contentContainerStyle={styles.container}>
        {disciplines.map((discipline, index) => (
          <View key={index} style={styles.card}>
            <Pressable onPress={() => toggleVisibility(discipline)}>
              <View style={styles.disciplineTitleContainer}>
                <Text style={styles.disciplineTitle}>{discipline}</Text>
                <FontAwesome
                  name={
                    disciplineData[discipline]?.status === "Concluída"
                      ? "check-circle"
                      : "circle"
                  }
                  size={width * 0.04}
                  color={
                    disciplineData[discipline]?.status === "Concluída"
                      ? "#21F078"
                      : "black"
                  }
                  style={styles.icon}
                />
              </View>
            </Pressable>
            {visibleDisciplines[discipline] && (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.averageText}>
                    1ª Nota:{" "}
                    {Number((sliderValues[discipline]?.grade1 || 0).toFixed(1))}
                  </Text>
                  <Slider
                    style={{ flex: 1 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.1}
                    value={sliderValues[discipline]?.grade1}
                    onValueChange={(value) => {
                      setSliderValues((prevValues) => ({
                        ...prevValues,
                        [discipline]: {
                          ...prevValues[discipline],
                          grade1: value,
                        },
                      }));
                    }}
                    onSlidingComplete={(value) =>
                      updateGrades(
                        discipline,
                        value,
                        sliderValues[discipline]?.grade2,
                        sliderValues[discipline]?.grade3,
                        disciplineData[discipline]?.finalGrade
                      )
                    }
                    minimumTrackTintColor={"#21F078"}
                    maximumTrackTintColor={"#8BFFBC"}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.averageText}>
                    2ª Nota:{" "}
                    {Number((sliderValues[discipline]?.grade2 || 0).toFixed(1))}
                  </Text>
                  <Slider
                    style={{ flex: 1 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.1}
                    value={sliderValues[discipline]?.grade2}
                    onValueChange={(value) => {
                      setSliderValues((prevValues) => ({
                        ...prevValues,
                        [discipline]: {
                          ...prevValues[discipline],
                          grade2: value,
                        },
                      }));
                    }}
                    onSlidingComplete={(value) =>
                      updateGrades(
                        discipline,
                        sliderValues[discipline]?.grade1,
                        value,
                        sliderValues[discipline]?.grade3,
                        disciplineData[discipline]?.finalGrade
                      )
                    }
                    minimumTrackTintColor={"#21F078"}
                    maximumTrackTintColor={"#8BFFBC"}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.averageText}>
                    3ª Nota:{" "}
                    {Number((sliderValues[discipline]?.grade3 || 0).toFixed(1))}
                  </Text>
                  <Slider
                    style={{ flex: 1 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.1}
                    value={sliderValues[discipline]?.grade3}
                    onValueChange={(value) => {
                      setSliderValues((prevValues) => ({
                        ...prevValues,
                        [discipline]: {
                          ...prevValues[discipline],
                          grade3: value,
                        },
                      }));
                    }}
                    onSlidingComplete={(value) =>
                      updateGrades(
                        discipline,
                        sliderValues[discipline]?.grade1,
                        sliderValues[discipline]?.grade2,
                        value,
                        disciplineData[discipline]?.finalGrade
                      )
                    }
                    minimumTrackTintColor={"#21F078"}
                    maximumTrackTintColor={"#8BFFBC"}
                  />
                </View>

                <Text style={styles.averageText}>
                  Média:{" "}
                  {Math.round(
                    (disciplineData[discipline]?.average || "") * 10
                  ) / 10}
                </Text>
                <View style={styles.inputContainer}>
                  {disciplineData[discipline]?.average >= 3 &&
                    disciplineData[discipline]?.average <= 7 && (
                      <Text style={styles.averageText}>
                        Nota Final:{" "}
                        {Math.round(
                          (calculateFinalGrade(discipline) || "") * 10
                        ) / 10}
                      </Text>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={() => toggleStatus(discipline)}
                    style={[
                      styles.statusButton,
                      {
                        backgroundColor:
                          disciplineData[discipline]?.status === "Concluída"
                            ? "#21F078"
                            : "black",
                      },
                    ]}
                  >
                    <Text style={styles.buttonText}>
                      {disciplineData[discipline]?.status || "Pendente"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        ))}
        <ToastManager />
      </ScrollView>
      <View style={styles.floatingButtonContainer}>
      <FloatingButton onPress={handleProfilePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    backgroundColor: "#121b22",
  },

  disciplineTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: width * 0.02, // Adicione esta linha para criar espaço entre o texto e o ícone
  },
  card: {
    borderWidth: 1,
    borderColor: "#1f2c34",
    padding: width * 0.038,
    marginVertical: height * 0.003,
    borderRadius: width * 0.01,
    backgroundColor: "#1f2c34",
    width: width * 0.9,
    elevation: 1,
  },
  disciplineTitle: {
    fontSize: width * 0.038,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: height * 0.01,
    color: "#dbe3e5",
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.005,
  },
  input: {
    flex: 1,
    marginLeft: width * 0.02,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: width * 0.01,
    borderRadius: width * 0.01,
    height: height * 0.06,
    fontSize: width * 0.035,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  statusButton: {
    padding: width * 0.02,
    borderRadius: width * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
  icon: {
    color: "#21F078",
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },
  averageText: {
    marginTop: height * 0.005,
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "#dbe3e5",
  },
  progressBarContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  floatingButtonContainer: {
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
  pdfButton: {
    backgroundColor: "#21F078", // Cor do botão
    borderRadius: 40, // Metade da largura/altura para torná-lo circular
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Sombra para dar uma aparência de flutuação
  },
});

export default DisciplinesScreen;
