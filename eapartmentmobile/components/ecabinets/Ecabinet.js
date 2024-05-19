import { useState } from "react";
import { View } from "react-native";

const Ecabinet = () => {
    const [ecabinet, setEcabinet] = useState(null);
    const [items, setItems] = useState([]);

    const loadEcabinet = async () => {
        try{
            
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <View>

        </View>

    );
}

export default Ecabinet;