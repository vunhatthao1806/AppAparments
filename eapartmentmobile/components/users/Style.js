import { StyleSheet } from "react-native";

export default StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "whitesmoke",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    // width: 250
  },
  container: {
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  subject: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#212121",
    marginTop: 170,
    alignSelf: "center",
  },
  titleLogin: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#212121",
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagetext: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageOnTop: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  textLabel: {
    color: "#CCCCCC",
    fontSize: 20,
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: "rgba(60,32,22,0.5)",
    marginRight: 20,
    marginLeft: 20,
  },
  buttonLogin: {
    width: "80%",
    height: 60,
    alignSelf: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    marginTop: 21,
  },
  containerKeyBo: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  containerLogin: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  resetform: {
    marginTop: 50,
  },
});
