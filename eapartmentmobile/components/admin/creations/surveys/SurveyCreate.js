import { useMemo, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native"
import Style from "../../../complaints/Style";
// import Style from "./Style";
import MyStyle from "../../../../styles/MyStyle";
import { Divider, Icon, TextInput } from "react-native-paper";
import RadioGroup from 'react-native-radio-buttons-group';
import QuestionInput from "./QuestionInput";
import SurveyQuestion from "./SurveyQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../../configs/APIs";
import { Alert } from "react-native";

const SurveyCreate = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [questions, setQuestions] = useState([]);

    const handleAddQuestion = (questionText, options) => {
        const newQuestion = {
            id: String(questions.length + 1),
            text: questionText,
            options: options,
        };
        setQuestions([...questions, newQuestion]);
    };

    const loadCreateSurvey = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);

            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).post(endpoints["create_surveys"],
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            // console.log(res.data.id);
            
            Alert.alert("Thông báo", "Đăng ký thành công!!!");
            navigation.navigate("QuestionCreate", {'surveyId': res.data.id})
        } catch(ex){
            console.error(ex);
        }
    }

    return (
        <ScrollView>
            <View style={[Style.margin, Style.container]}>
                <View style={MyStyle.row}>
                    <Icon
                        source="pen"
                        color={'#4F6F52'} 
                        size={28}
                    />    
                    <Text style={Style.titleComplaint}>
                        Tiêu đề:
                    </Text>
                </View>
                <TextInput
                    style={Style.TextInputComplaint}
                    value={title}
                    onChangeText={title => setTitle(title)}
                    multiline={true}
                    placeholderTextColor="white"
                    textColor="white"
                    cursorColor="white"
                    underlineStyle={{ backgroundColor: "#627254" }}
                    backgroundColor="#627254"
                />
            </View>

            <View style={[Style.margin, Style.container]}>
                <View style={MyStyle.row}>
                    <Icon
                        source="pen"
                        color={'#4F6F52'} 
                        size={28}
                    />    
                    <Text style={Style.titleComplaint}>
                        Nội dung:
                    </Text>
                </View>
                <TextInput
                    style={Style.TextInputComplaint}
                    value={content}
                    onChangeText={content => setContent(content)}
                    multiline={true}
                    placeholderTextColor="white"
                    textColor="white"
                    cursorColor="white"
                    underlineStyle={{ backgroundColor: "#627254" }}
                    backgroundColor="#627254"
                />
            </View>

            <Divider/>

            <QuestionInput onAddQuestion={handleAddQuestion} />

            {questions.map((question, index) => (
                <SurveyQuestion
                    key={question.id}
                    index={`Câu hỏi ${index + 1}:`}
                    question={question.text}
                    options={question.options}
                />
            ))}

            <TouchableOpacity
                    style={[Style.margin, Style.container]}
                    onPress={loadCreateSurvey}
                >
                    <View style={{
                        backgroundColor: "#4F6F52",
                        width: '80%',
                        height: 50,
                        marginLeft: 30,
                        borderRadius: 0,
                        
                    }}>
                        <Text style={{color: "white", 
                            alignSelf: "center",
                            marginTop: 14, 
                            fontSize: 15, 
                            fontWeight: "normal"}}>Tạo khảo sát</Text>
                    </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
}

export default SurveyCreate;