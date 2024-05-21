import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabelaDiaria from "./Diaria";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const TabelaHorarios = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [materias, setMaterias] = useState({});
  const [diaSelecionado, setDiaSelecionado] = useState("S");
  const diasSemana = ["D", "S", "T", "Q", "Qu", "Se", "Sa"];

  useEffect(() => {
    loadMaterias();
  }, []);

  const loadMaterias = async () => {
    try {
      const storedMaterias = await AsyncStorage.getItem("materias");
      if (storedMaterias) {
        setMaterias(JSON.parse(storedMaterias));
      }
    } catch (error) {
      console.error("Erro ao carregar matérias:", error);
    }
  };

  const saveMaterias = async () => {
    try {
      await AsyncStorage.setItem("materias", JSON.stringify(materias));
    } catch (error) {
      console.error("Erro ao salvar matérias:", error);
    }
  };

  const renderHorarios = () => {
    return diasSemana.map((dia, index) => (
      <View key={index} style={styles.horarioContainer}>
        <TouchableOpacity onPress={() => setDiaSelecionado(dia)}>
          <Text
            style={
              dia === diaSelecionado
                ? styles.diaSelecionado
                : styles.diaSemanaText
            }
          >
            {dia}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabelaContainer}>
        {diaSelecionado && <TabelaDiaria dia={diaSelecionado} />}
      </View>
      <View style={styles.diasSemanaContainer}>{renderHorarios()}</View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      ></Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "#121b22",
  },
  tabelaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // 100% of the screen width
  },
  horarioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"), // 1% of the screen height
    width: wp("14%"), // 14% of the screen width
  },
  diasSemanaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    padding: wp("2.5%"), // 5% of the screen width
    paddingTop: 0,
    paddingBottom: wp("3%"), // 3% of the screen width
  },
  diaSemanaText: {
    borderWidth: 2,
    borderColor: "#1f2c34",
    padding: wp("3%"), // 4% of the screen width
    borderRadius: wp("2%"), // 2% of the screen width
    backgroundColor: "#121b22",
    color: "#dbe3e5",
    fontSize: wp("3%"), // 3% of the screen width
    fontWeight: "bold",
  },
  diaSelecionado: {
    borderWidth: 2,
    borderColor: "#1f2c34",
    padding: wp("3%"),
    borderRadius: wp("2%"),
    backgroundColor: "#1f2c34",
    color: "#dbe3e5",
    fontSize: wp("3%"),
    fontWeight: "bold",
  },
});

export default TabelaHorarios;
