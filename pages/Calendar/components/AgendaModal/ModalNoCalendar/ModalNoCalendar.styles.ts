import { StyleSheet, Dimensions } from 'react-native';

const modalWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalNoCalendarContainer: {
    alignItems: 'center',
    height: '45%',
    width: (modalWidth * 75) / 100,
    backgroundColor: "#121b22",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  textMessage: {
    fontSize: 20,
    color: "#dbe3e5",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default styles;
