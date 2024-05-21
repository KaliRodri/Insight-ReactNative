import React, { useEffect, useReducer, useState } from "react";
import { View, Text, FlatList, StatusBar } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import useCalendar from "@atiladev/usecalendar";
import { StyleSheet, Dimensions } from "react-native";

import {
  AgendaItem,
  Header,
  ModalNewEvent,
  ModalError,
  ModalRemove,
  ModalNoCalendar,
} from "./components";
import reducer, { stateProps } from "./reducer";
import { Calendar } from "expo-calendar";

const modalWidth = Dimensions.get("window").width;

const initialState = {
  visibleModalNewEvent: false,
  visibleModalError: false,
  visibleModalRemove: false,
  visibleModalNoCalendar: false,
  eventTitle: "",
  selectedDate: undefined,
  events: undefined,
};

const calendarName = "Meu Calendário Acadêmico";

export default function AcademicCalendar() {
  const {
    getPermission,
    createCalendar,
    addEventsToCalendar,
    deleteCalendar,
    openSettings,
    getEvents,
    getCalendarId,
  } = useCalendar(calendarName, "purple", "my-expo-agenda");

  const [state, dispatch] = useReducer(reducer, initialState);
  const [granted, setGranted] = useState();

  const openModalNewEvent = () => {
    if (state.selectedDate) {
      dispatch({ type: "setVisibleModalNewEvent", payload: true });
    } else {
      dispatch({ type: "setVisibleModalError", payload: true });
    }
  };
  const closeModalNewEvent = () => {
    dispatch({ type: "setVisibleModalNewEvent", payload: false });
    dispatch({ type: "clear" });
  };

  const closeModalError = () => {
    dispatch({ type: "setVisibleModalError", payload: false });
  };

  const openModalRemove = async () => {
    const calendarId = await getCalendarId();
    if (calendarId) {
      dispatch({ type: "setVisibleModalRemove", payload: true });
    } else {
      openModalNoCalendar();
    }
  };
  const closeModalRemove = () => {
    dispatch({ type: "setVisibleModalRemove", payload: false });
  };

  const openModalNoCalendar = () => {
    dispatch({ type: "setVisibleModalNoCalendar", payload: true });
  };

  const closeModalNoCalendar = () => {
    dispatch({ type: "setVisibleModalNoCalendar", payload: false });
  };

  const askPermission = async () => {
    const isGranted = await getPermission();
    setGranted(isGranted);
  };

  useEffect(() => {
    askPermission();
  }, []);

  const createCalAndEvent = async () => {
    if (granted) {
      const calendarId = await getCalendarId();
      if (!calendarId) {
        await createCalendar();
      }

      if (state.selectedDate) {
        try {
          await addEventsToCalendar(
            state.eventTitle,
            new Date(state.selectedDate),
            new Date(state.selectedDate)
          );
          const listEvent = await getEvents();
          dispatch({ type: "setEvents", payload: listEvent });
        } catch (e) {
          // Trate os erros aqui
          console.error("Erro ao adicionar evento:", e);
        }
      }
    } else {
      openSettings();
    }
  };

  const removeCalendar = () => deleteCalendar();

  const filterPastEvents = (events) => {
    const currentDate = new Date().setHours(0, 0, 0, 0); // Data atual sem considerar a hora
    return events.filter((event) => new Date(event.startDate) >= currentDate);
  };

  useEffect(() => {
    async function loadEvents() {
      const events = await getEvents();
      const futureEvents = filterPastEvents(events); // Filtrar os eventos passados
      dispatch({ type: "setEvents", payload: futureEvents });
    }
    loadEvents();
  }, [state.events]); // Executar sempre que os eventos forem atualizados

  // Função para verificar se uma data é anterior à data atual
  const isPastDate = (date) => {
    const currentDate = new Date();
    return date < currentDate.setHours(0, 0, 0, 0);
  };

  // Função para definir estilos de acordo com a data
  const dayStyleCallback = (date) => {
    return {
      style: isPastDate(date) ? styles.pastDay : {},
      textStyle: isPastDate(date) ? styles.pastDayText : {},
    };
  };

  return (
    <View style={styles.container}>
      <Header onPressLeft={openModalRemove} onPressRight={openModalNewEvent} />
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={(evt) =>
            dispatch({ type: "setSelectedDate", payload: evt })
          }
          minDate={new Date()}
          previousTitle="Ant"
          nextTitle="Próx"
          todayBackgroundColor="#06D9C2"
          selectedDayColor="#0BC85B"
          selectedDayTextColor="#121b22"
          weekdays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
          months={[
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ]}
          textStyle={{
            color: "#dbe3e5",
          }}
          selectedDayTextStyle={{
            color: "#121b22",
          }}
          dayStyle={dayStyleCallback} // Aplica o estilo condicionalmente aos dias
        />
      </View>

      {!!state.events?.length && (
        <Text style={styles.textEvents}>Próximos Eventos</Text>
      )}

      <View style={styles.flatListContainer}>
        <FlatList
          data={state.events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AgendaItem item={item} />}
        />
      </View>

      <ModalNewEvent
        isVisible={state.visibleModalNewEvent}
        selectedDate={state.selectedDate?.toString()}
        onChangeText={(text) =>
          dispatch({ type: "setEventTitle", payload: text })
        }
        onPressAdd={() => {
          createCalAndEvent();
          closeModalNewEvent();
        }}
        onPressCancel={closeModalNewEvent}
      />

      <ModalError
        isVisible={state.visibleModalError}
        onPress={closeModalError}
      />

      <ModalNoCalendar
        isVisible={state.visibleModalNoCalendar}
        onPress={closeModalNoCalendar}
      />

      <ModalRemove
        isVisible={state.visibleModalRemove}
        calendarName={calendarName}
        onPressCancel={closeModalRemove}
        onPressContinue={() => {
          dispatch({ type: "setEvents", payload: undefined });
          removeCalendar();
          closeModalRemove();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121b22",
    alignItems: "center",
    color: "#dbe3e5",
  },
  calendarContainer: {
    marginTop: 80,
    borderRadius: 10, // Se necessário, ajuste o raio do border
  },
  pastDay: {
    backgroundColor: "#333", // Cor para dias passados
  },
  pastDayText: {
    color: "#999", // Cor do texto para dias passados
  },
  modalContainer: {
    height: "45%",
    width: (modalWidth * 75) / 100,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalErrorContainer: {
    alignItems: "center",
    height: "40%",
    width: (modalWidth * 75) / 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalRemoveContainer: {
    alignItems: "center",
    height: "43%",
    width: (modalWidth * 75) / 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  textEvents: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 40,
    fontSize: 20,
    fontWeight: "bold",
    color: "#dbe3e5",
  },
});
