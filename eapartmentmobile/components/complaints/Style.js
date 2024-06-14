import { StyleSheet, TextInputComponent } from "react-native";
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
        fontSize: 25,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
     margin: {
        margin: 6
    },
     marginbot: {
        marginBottom: 10,
    },
    readMore: {
      color: "blue",
      marginTop: 8,
      textDecorationStyle: "solid"
    }, 
    tags:{
        margin: 5,
        padding: 3
    },
    // -----Mới thêm-----
      chipTextSelected: {
        color: '#F8F4E1', // Trắng kem khi được chọn
      },
      chipTextUnselected: {
        color: '#F8F4E1', // Nâu đậm khi không được chọn
      },
    // ----------
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
    button: {// -----Mới thêm-----
        backgroundColor: "#F8F4E1",
        borderWidth: 1,
        borderColor: '#000', 
        flexDirection: 'row-reverse',  // Màu viền cho Button
    }, 
    container: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        
    }, 
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        // -----Mới thêm-----
        backgroundColor: "#AF8F6F"
    },
    titleComplaint: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 3,
        marginLeft: 8,
        
    }, 
    textInput:{
        marginLeft: 10,
        width: '73%',
        borderColor: 'gray',
        borderWidth: 1,
        textAlignVertical: 'top', // Đảm bảo văn bản bắt đầu từ đầu ô nhập
    },
    justifyContent: {
        justifyContent: "space-between"
    }, 
    titleTag: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
        padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    buttonCreate: {
        margin: 10,
        borderWidth: 2,
        borderColor: '#543310', 
        padding: 10,
        // marginBottom: 10,
        alignItems:"center",
        borderRadius: 30,
        backgroundColor: "#543310"
    }, 
    textCreate: {
        fontSize: 20
    }, 
    TextInputComplaint:{
        borderColor: 'gray',
        borderWidth: 1,
        textAlignVertical: 'top', // Đảm bảo văn bản bắt đầu từ đầu ô nhập
    },
    avatar: {
        marginTop: 15
    },
    row: {
        flexDirection: "row",
    }, 
    textContent: {
        marginRight: 10
    },
    

    commentContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    username: {
        fontWeight: 'bold',
    },
    createdDate: {
        marginLeft: 10,
        color: 'gray',
    },
    commentText: {
        flexWrap: 'wrap',
    },
    iconContainer: {
        paddingLeft: 10,
    },
    menuComment: {
        marginRight: 100
    }, chipSelected:{
        backgroundColor: "#D4E7C5"
    },
    chipUnselected: {
        backgroundColor: "#99BC85"
    },
    itemCreate: {
        
        width: '80%',
        height: 50,
        marginLeft: 30,
        borderRadius: 0
    },
    textCreate: {
        color: "white", 
        alignSelf: "center",
        marginTop: 10, 
        fontSize: 18, 
        fontWeight: "bold"
    }
});