import { StyleSheet } from "react-native";

export default StyleSheet.create({
    searchbar: {
        margin: 5,
        fontSize: 12
    },
    cates: {
        fontSize: 20,
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
        fontSize: 15
    },
    title: {
        margin: 10,
        color: 'blue',
        fontSize: 25,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    }
});