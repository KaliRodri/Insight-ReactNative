import { StyleSheet, Dimensions } from 'react-native';

const modalWidth = Dimensions.get('window').width;
const modalHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalContainer: {
    height: (modalHeight * 18) / 100,
    width: (modalWidth * 75) / 100,
    backgroundColor: "#121b22",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  selectedDate: {
    fontSize: 15,
    marginBottom: 20,
    color: "#dbe3e5",
  },
  input: {
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: '#1f2c34',
    height: 26,
    fontSize: 18,
    color: "#dbe3e5",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});

export default styles;
