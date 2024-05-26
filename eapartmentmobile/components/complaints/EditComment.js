import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

const EditComment = ({route}) => {
    const [comment, setComment] = useState("");
    const commentId = route.params?.commentId;

    const loadUpdateComment = async () => {
        try {
            let res = await APIs.get(endpoints['update_comment'](commentId));
            setComment(res.data);

        } catch(ex) {
            console.error(ex);
        }
    }

    return (
        <View>
            <Text>hi</Text>
        </View>
    );
}

export default EditComment;