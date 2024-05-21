import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Table, Row } from "react-native-table-component";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TabelaDiaria = ({ dia }) => {
  const horarios = [
    "07:30 - 8h:20",
    "8h:20 - 9h:10",
    "9h:10 - 10h:00",
    "10h:00 - 10h:50",
    "10h:50 - 11h:40",
    "11h:40 - 12h:30",
    "13h:30 - 14h:20",
    "14h:20 - 15h:10",
    "15h:10 - 16h:00",
    "16h:00 - 16h:50",
    "16h:50 - 17h:40",
    "17h:40 - 18h:30",
    "18h:30 - 19h:20",
    "19h:20 - 20h:10",
    "20h:10 - 21h:00",
    "21h:00 - 21h:50",
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [disciplinaAtual, setDisciplinaAtual] = useState({
    horario: "",
    disciplina: "",
  });
  const [disciplinaExcluir, setDisciplinaExcluir] = useState({
    horario: "",
    disciplina: "",
  });

  const [materiasPorDia, setMateriasPorDia] = useState({
    S: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
    T: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
    Q: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
    Qu: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
    Se: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
    Sa: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
    D: {
      "07:30": "",
      "08:20": "",
      "9:10": "",
      "10:00": "",
      "10:50": "",
      "11:40": "",
      "12:30": "",
      "13:30": "",
      "14:20": "",
      "15:10": "",
      "16:00": "",
      "16:50": "",
      "17:40": "",
      "18:30": "",
      "19:20": "",
      "20:10": "",
      "21:00": "",
      "21:50": "",
    },
  });

  const [coresPorMateria, setCoresPorMateria] = useState({});

  useEffect(() => {
    const carregarMateriasSalvas = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem("materiasPorDia");
        if (dadosSalvos) {
          setMateriasPorDia(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarMateriasSalvas();
  }, []);

  useEffect(() => {
    const disciplinas = Object.values(materiasPorDia[dia] || {});

    disciplinas.forEach((materia) => {
      if (!coresPorMateria[materia]) {
        setCoresPorMateria((prevCores) => ({
          ...prevCores,
          [materia]: getRandomColor(),
        }));
      }
    });
  }, [dia, materiasPorDia]);

  const getRandomColor = () => {
    let color;

    do {
      color = getRandomHexColor();
    } while (isColorTooLight(color));

    return color;
  };

  const getRandomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const isColorTooLight = (color) => {
    // Extrair os componentes RGB da cor
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Calcular a luminância da cor (uma fórmula ajustada para corresponder melhor à percepção humana)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Definir um limite inferior para a luminância
    const luminanceThreshold = 200; // Valor ajustável para determinar a luminância

    // Verificar se a luminância está acima do limiar
    return luminance > luminanceThreshold;
  };

  const abrirModal = (horario) => {
    setDisciplinaAtual({
      horario,
      disciplina: materiasPorDia[dia][horario] || "",
    });
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setDisciplinaAtual({ horario: "", disciplina: "" });
  };

  const abrirModalExcluir = (horario) => {
    setDisciplinaExcluir({
      horario,
      disciplina: materiasPorDia[dia][horario] || "",
    });
    setModalExcluirVisible(true);
  };

  const fecharModalExcluir = () => {
    setModalExcluirVisible(false);
  };

  const adicionarDisciplina = () => {
    const updatedMateriasPorDia = {
      ...materiasPorDia,
      [dia]: {
        ...materiasPorDia[dia],
        [disciplinaAtual.horario]: disciplinaAtual.disciplina,
      },
    };
    setMateriasPorDia(updatedMateriasPorDia);
    setModalVisible(false);
    setDisciplinaAtual({ horario: "", disciplina: "" });
    AsyncStorage.setItem(
      "materiasPorDia",
      JSON.stringify(updatedMateriasPorDia)
    );
  };

  const excluirDisciplina = (horario, disciplina) => {
    const updatedMateriasPorDia = {
      ...materiasPorDia,
      [dia]: {
        ...materiasPorDia[dia],
        [horario]: "",
      },
    };

    // Remova a cor associada à disciplina excluída
    const updatedCoresPorMateria = { ...coresPorMateria };
    delete updatedCoresPorMateria[disciplina];

    setMateriasPorDia(updatedMateriasPorDia);
    setCoresPorMateria(updatedCoresPorMateria);

    setModalExcluirVisible(false);

    AsyncStorage.setItem(
      "materiasPorDia",
      JSON.stringify(updatedMateriasPorDia)
    );
  };

  const renderTabela = () => {
    const disciplinasDia = materiasPorDia[dia];

    return (
      <Table borderStyle={{ borderWidth: 1, borderColor: "#CFCFCF" }}>
        {horarios.map((horario, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => abrirModal(horario)}
            onLongPress={() => abrirModalExcluir(horario)}
          >
            <Row
              data={[horario, disciplinasDia[horario] || ""]}
              style={[
                styles.row,
                {
                  backgroundColor:
                    disciplinasDia[horario] &&
                    coresPorMateria[disciplinasDia[horario]]
                      ? coresPorMateria[disciplinasDia[horario]]
                      : "#1f2c34",
                },
              ]}
              textStyle={[
                styles.text,
                { color: disciplinasDia[horario] ? "white" : "#dbe3e5" },
              ]}
            />
          </TouchableOpacity>
        ))}
      </Table>
    );
  };

  return (
    <View style={styles.container}>
      {renderTabela()}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Disciplina</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a disciplina"
              placeholderTextColor="#586A75"
              value={disciplinaAtual.disciplina}
              onChangeText={(text) =>
                setDisciplinaAtual({
                  ...disciplinaAtual,
                  disciplina: text,
                })
              }
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={fecharModal}
                style={styles.modalButtonClose}
              >
                <Text style={styles.modalButtonTextClose}>Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={adicionarDisciplina}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalExcluirVisible}
        onRequestClose={fecharModalExcluir}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir Disciplina</Text>
            <Text style={styles.modalText}>Deseja excluir a disciplina:</Text>
            <Text style={styles.modalText}>{disciplinaExcluir.disciplina}</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={fecharModalExcluir}
                style={styles.modalButtonClose}
              >
                <Text style={styles.modalButtonTextClose}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  excluirDisciplina(
                    disciplinaExcluir.horario,
                    disciplinaExcluir.disciplina
                  )
                }
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp("4%"),
    paddingTop: hp("1%"),
    backgroundColor: "#121b22",
  },
  row: {
    height: hp("5%"),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#60696E",
  },
  text: {
    textAlign: "center",
    fontSize: hp("1.7%"),
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: "#121b22",
    borderRadius: wp("2%"),
    padding: wp("5%"),
    alignItems: "center",
    elevation: wp("1%"),
  },
  modalTitle: {
    fontSize: hp("2.7%"),
    marginBottom: hp("2%"),
    color: "#dbe3e5",
  },
  modalText: {
    fontSize: hp("2.5%"),
    marginBottom: hp("1%"),
    color: "#dbe3e5",
  },
  input: {
    height: hp("6%"),
    borderColor: "#586A75",
    borderWidth: 1,
    marginBottom: hp("2%"),
    padding: wp("2%"),
    width: wp("80%"),
    fontSize: hp("2%"),
    borderRadius: 5,
    color: "#dbe3e5",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("80%"),
  },
  modalButton: {
    backgroundColor: "#1f2c34",
    padding: wp("4%"),
    borderRadius: wp("1%"),
    width: wp("35%"),
  },
  modalButtonClose: {
    backgroundColor: "#121b22",
    padding: wp("2.8%"),
    borderRadius: wp("1%"),
    width: wp("35%"),
    borderWidth: 1,
    borderColor: "#586A75",
  },
  modalButtonText: {
    color: "#dbe3e5",
    textAlign: "center",
    fontSize: hp("2%"),
  },
  modalButtonTextClose: {
    color: "#dbe3e5",
    textAlign: "center",
    fontSize: hp("2%"),
    paddingTop: wp("1%"),
  },
});

export default TabelaDiaria;
