import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { TextInput,  Button, Avatar } from "react-native-paper";
import { View } from "react-native";
import { authAPI, endpoints } from "../../configs/APIs";
import Style from "./Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyStyle from "../../styles/MyStyle";
import { useNavigation } from "@react-navigation/native";

const EditComment = ({route}) => {
    const [comment, setComment] = useState("");
    const commentId = route.params?.commentId;
    const navigation = useNavigation();

    const loadUpdateComment = async () => {
        try {
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).patch(endpoints['update_comment'](commentId),{
                content: comment
            });
            setComment(response.data);
            console.log(response.data);
            Alert.alert("Cập nhật thành công!");

        } catch(ex) {
            console.error(ex);
        }
    }

    const handleUpdateComment = async () => {
        loadUpdateComment();
    }

    return (
        <View>
            {comment===null?<ActivityIndicator/>:<>
            <View style={[MyStyle.row, {"justifyContent": "space-between"}]}>

                    <TextInput style={Style.textInput} 
                        multiline={true} 
                        label={"Suy nghĩ của bạn là gì"} 
                        value={comment} 
                        onChangeText={setComment} />
                         {/* <Text style={Style.commentText}>{comment.content}</Text> */}
                    <View style={Style.buttonContainer}>
                        <Button style={Style.button}
                            icon="send-circle" 
                            mode="contained" 
                            onPress={handleUpdateComment}
                            />
                    </View>
                </View>
            </>}
            
        </View>
    );
}

export default EditComment;