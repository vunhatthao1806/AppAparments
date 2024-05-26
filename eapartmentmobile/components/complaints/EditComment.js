import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

const EditComment = () => {
    const [comment, setComment] = useState("");

    const loadCUpdateComment = async () => {
        try {

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