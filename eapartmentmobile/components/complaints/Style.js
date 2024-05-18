import { StyleSheet } from "react-native";
import { Line } from "react-native-svg";

export default StyleSheet.create({
    searchbar: {
        marginBottom: 5,
        marginRight: 5
    },
    cates: {
        fontSize: 25,
        fontWeight: "bold"
    }, 
    cardContent: {
        // Đảm bảo rằng nội dung card không bị cắt xén và có thể xuống dòng
        overflow: 'hidden',
        flex: 1,
        alignSelf: 'stretch'
    },
    text: {
        // Đảm bảo văn bản có thể xuống dòng và hiển thị đúng
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        overflow: 'hidden',
        fontSize: 19
    },
    title: {
        margin: 8,
        // color: 'blue',
        fontSize: 25,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
     margin: {
        margin: 10
    },
     marginbot: {
        marginBottom: 10
    },
    readMore: {
      color: "blue",
      marginTop: 8,
      textDecorationStyle: "solid"
    }, 
    tags:{
        margin: 6
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5
    },
    createdDate: {
        fontSize: 15,
        fontStyle: "italic",
        marginLeft: 5
    },
    marginTitle: {
        marginTop: 30
    }
});