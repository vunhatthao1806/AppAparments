import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Divider, Icon, TextInput } from "react-native-paper";
import QuestionInput from "./QuestionInput";
import SurveyQuestion from "./SurveyQuestion";
import { useState } from "react";
import Style from "../../../complaints/Style";
// import Style from "./Style";
import MyStyle from "../../../../styles/MyStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIs, { authAPI, endpoints } from "../../../../configs/APIs";
import { RadioGroup } from "react-native-radio-buttons-group";

const QuestionCreate = ({route}) => {
    const [questions, setQuestions] = useState([]);
    const surveyId = route.params?.surveyId;

    const [question, setQuestion] = useState('');
    const [optionText, setOptionText] = useState('');
    const [options, setOptions] = useState([]);

    const handleAddOption = () => {
        if (optionText) {
            setOptions([...options, { id: String(options.length + 1), label: optionText}]);
            setOptionText('');
        }
    };

    // const buttonCreateQuestion = () => {
    //     if (question && options.length > 0) {
    //         setQuestion('');
    //         setOptions([]);

    //         const newQuestion = {
    //             id: String(questions.length + 1),
    //             text: question,
    //             options: options,
    //         };
    //         setQuestions([...questions, newQuestion]);
    //         console.log(question);
    //     }
    // }

    const loadCreateQuestion = async () => {
        try {
            if (question && options.length > 0) {
                setQuestion('');
                setOptions([]);
    
                const newQuestion = {
                    id: String(questions.length + 1),
                    text: question,
                    options: options,
                };
                setQuestions([...questions, newQuestion]);
                console.log(newQuestion.options);
            }

            const formData = new FormData();
            formData.append("name", question);
            console.log(formData);

            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).post(endpoints["create_questions"](surveyId),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            // await loadCreateOptions(res.data.id, options);

            return res.data.id;
        } catch (ex) {
            console.error(ex);
        }
    }
    const loadCreateOptions = async (questionId, optionsArray) => {
        try {
            const formData1 = new FormData();
            formData1.append("question", questionId);

            if (optionsArray && optionsArray.length > 0) {
                optionsArray.forEach((option) => {
                    // console.log(option.label);
                    formData1.append("name", option.label);
                });}
                console.log(formData1);
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).post(endpoints["choices"],
                formData1,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            Alert.alert("Thong bao", "Dang thanh cong");
        } catch(ex){
            console.error(ex);
        }
            }

        const buttonCreateQuestion1 = async () => {
            const questionId = await loadCreateQuestion();
            await loadCreateOptions(questionId, options);
        };


    return  (
        <ScrollView>
            <Divider/>

                {questions.map((question, index) => (
                    <SurveyQuestion
                        key={question.id}
                        index={`Câu hỏi ${index + 1}:`}
                        question={question.text}
                        options={question.options}
                    />
                ))}

            <Divider/>
            <View style={styles.container}>

            <TouchableOpacity
                    style={[Style.margin, Style.container]}
                    onPress={buttonCreateQuestion1}
                >
                    <View style={{
                        backgroundColor: "#1A4D2E",
                        width: '80%',
                        height: 50,
                        marginLeft: 30,
                        borderRadius: 0,
                        
                    }}>
                        <Text style={{color: "white", 
                            alignSelf: "center",
                            marginTop: 14, 
                            fontSize: 15, 
                            fontWeight: "normal"}}>Thêm câu hỏi</Text>
                    </View>
            </TouchableOpacity>

            <TextInput
                style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    textAlignVertical: 'top',
                    marginBottom: 5
                }}
                value={question}
                onChangeText={setQuestion}
                multiline={true}
                placeholder="Nhập câu hỏi"
                placeholderTextColor="black"
                textColor="black"
                cursorColor="black"
                underlineStyle={{ backgroundColor: "#E0FBE2" }}
                backgroundColor="#E0FBE2"
            />

            <TextInput
                style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    textAlignVertical: 'top',
                    marginBottom: 5
                }}
                value={optionText}
                onChangeText={setOptionText}
                placeholder="Nhập lựa chọn"
                multiline={true}
                placeholderTextColor="black"
                textColor="black"
                cursorColor="black"
                underlineStyle={{ backgroundColor: "#E0FBE2" }}
                backgroundColor="#E0FBE2"
            />

            {/* <RadioGroup
                radioButtons={options}
                layout='row'
            /> */}

            <TouchableOpacity
                    style={[Style.margin, Style.container]}
                    onPress={handleAddOption}
                >
                    <View style={{
                        backgroundColor: "#1A4D2E",
                        width: '50%',
                        height: 50,
                        marginLeft: '60%',
                        borderRadius: 50,
                        
                    }}>
                        <Text style={{color: "white", 
                            alignSelf: "center",
                            marginTop: 14, 
                            fontSize: 15, 
                            fontWeight: "normal"}}>Thêm lựa chọn</Text>
                    </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flex: 1,
        marginLeft: 15
    },
    question: {
        fontSize: 16,
        borderStyle:'solid',
        borderWidth: 1,
        borderColor: "#17594A",
        backgroundColor: "#17594A",
        color: "white",
        padding: 8,
        width: 100,
       
    },
});

export default QuestionCreate;