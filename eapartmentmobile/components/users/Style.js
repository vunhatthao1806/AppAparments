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
});