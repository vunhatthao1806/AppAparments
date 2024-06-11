import { StyleSheet, TextInputComponent } from "react-native";
import { Line } from "react-native-svg";

export default StyleSheet.create({
    commentStyle: {
        borderColor: '#ddd',  // Màu viền
        borderWidth: 1,       // Độ dày viền
        borderRadius: 5,      // Góc bo tròn viền
        padding: 10,          // Khoảng cách bên trong viền
        marginBottom: 10,     // Khoảng cách giữa các bình luận
        backgroundColor: '#fff', // Màu nền
        marginLeft: 10,
        marginRight: 10,
        
    }, buttonContainer: {
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 5     
    },tags:{
        margin: 5,
        padding: 3,
    },textInput:{
        marginLeft: 10,
        width: '73%',
        borderColor: 'gray',
        borderWidth: 1,
        textAlignVertical: 'top', // Đảm bảo văn bản bắt đầu từ đầu ô nhập
    },button: {
        borderWidth: 1,
        borderColor: '#000', 
        flexDirection: 'row-reverse',  // Màu viền cho Button
    }, commentsContainer: {
        marginTop: 10,
    },commentContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },textContainer: {
        marginLeft: 10,
        flex: 1,
    },userInfo: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 5,
    },username: {
        fontWeight: 'bold',
        fontSize: 18
    },createdDate: {
        marginLeft: 10,
        color: 'gray',
    },commentText: {
        flexWrap: 'wrap',
        fontWeight: "bold",
    },noCommentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100, // Chiều cao đủ lớn để căn giữa
    },
    noCommentText: {
        fontSize: 16,
        color: 'grey',
    },


});