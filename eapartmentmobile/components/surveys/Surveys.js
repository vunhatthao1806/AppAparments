import { View, Text } from "react-native";
import MyStyle from "../../styles/MyStyle";
import { useEffect, useInsertionEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { Button } from "react-native-paper";

const Surveys = () => {
    const [surveys, setSurveys] = useState("");

    const loadSurveys = async () => {
        try{
            let res = await APIs.get(endpoints['surveys']);
            setSurveys(res.data);
        } catch (ex) {
            console.error(ex);
        } 
    }

    useEffect(() => {
        loadSurveys();
    }, [])

    return (
        <View style={MyStyle.container}>
            
        </View>
        
    );
}

export default Surveys;