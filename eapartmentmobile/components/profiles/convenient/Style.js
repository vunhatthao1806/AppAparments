import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 8,
    },
    cardContainer: {
        width: '48%', 
        marginBottom: 8,
    },
    card: {
        flex: 1,
    },
    imageItem: {
        width: 120,
        height: 100
    },
    noneCheck: {
        backgroundColor: 'red',
        color: "white"
    },
    titleItem: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 8
    }, 
    tagItem: {
        width: 150,
        marginBottom: 10        
    },
    alignSelf: {
        alignSelf: "center", 
        marginBottom: 4
    },
    ecabinetStyle: {
        borderColor: '#ddd',  // Màu viền
        borderWidth: 1,       // Độ dày viền
        borderRadius: 5,      // Góc bo tròn viền
        padding: 1,          // Khoảng cách bên trong viền
        marginBottom: 10,     // Khoảng cách giữa các bình luận
        backgroundColor: '#fff', // Màu nền
        marginLeft: 10,
        marginRight: 10,
    }, 
    commentsContainer: {
        marginTop: 10,
    },imagecarcard: {
        width: 170,
        height: 170,
        borderRadius: 20,
      },
      titlecarcard: {
        alignSelf: "center",
        fontSize: 30,
        fontWeight: "bold",
        margin: 10,
      },
      itemcarcard: {
        margin: 10,
        fontSize: 20,
        fontWeight: "condensedBold",
      },
      input: {
        width: "90%",
        alignSelf: "center",
        marginTop: 30,
      },
      imageOnTop: {
        width: "100%",
        height: 230,
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 120,
      }, 
      tiltepayment: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: "#96B6C5",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
      },
      titletextpayment: {
        fontSize: 20,
        fontWeight: "bold",
      },
});