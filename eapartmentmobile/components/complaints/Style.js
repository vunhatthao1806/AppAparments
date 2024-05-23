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
        margin: 10
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
    },
    commentStyle: {
        borderColor: '#ddd',  // Màu viền
        borderWidth: 1,       // Độ dày viền
        borderRadius: 5,      // Góc bo tròn viền
        padding: 10,          // Khoảng cách bên trong viền
        marginBottom: 10,     // Khoảng cách giữa các bình luận
        backgroundColor: '#fff', // Màu nền
        marginLeft: 10,
        marginRight: 10,
    }, 
    commentsContainer: {
        marginTop: 10,
    },
    noCommentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100, // Chiều cao đủ lớn để căn giữa
    },
    noCommentText: {
        fontSize: 16,
        color: 'grey',
    },
    buttonCommnet:{
        width: 30,
        height: 30
    }, 
    textInput: {
        flex: 1,
        marginRight: 0,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 5     
    },
    button: {
        borderWidth: 1,
        borderColor: '#000', 
        flexDirection: 'row-reverse',  // Màu viền cho Button
    }
});