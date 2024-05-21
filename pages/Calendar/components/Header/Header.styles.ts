import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 90,
    left: 0,
    paddingHorizontal: 15,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:"#121b22",
  },
  text: {
    color: '#dbe3e5',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default styles;
