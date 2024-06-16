import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Appbar, Divider, Icon, Menu, PaperProvider, TextInput } from "react-native-paper";
import SurveyQuestion from "./SurveyQuestion";
import { useState } from "react";
import Style from "../../../complaints/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioGroup } from "react-native-radio-buttons-group";
import { authAPI, endpoints } from "../../../../configs/APIs";

const QuestionCreate = ({route, navigation}) => {
    const [questions, setQuestions] = useState([]);
    const surveyId = route.params?.surveyId;
    const [quesId, setQuesId] = useState('');

    const [question, setQuestion] = useState('');
    const [optionText, setOptionText] = useState('');
    const [options, setOptions] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);
    const [surveys, setSurveys] = useState([])

    const loadSurveys = async () => {
        try {
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).get(endpoints["surveys"]);  
            setSurveys(response.data);
        } catch(ex){
            console.error(ex);
        }
    }

    const loadCreateQuestion = async () => {
        try {
            if (question && options.length > 0 ) { 
                setQuestion('');
                setOptions([]);
    
                const newQuestion = {
                    id: String(questions.length + 1),
                    text: question,
                    options: options,
                };
                setQuestions([...questions, newQuestion]);
                console.log(newQuestion);
            }

            const formData = new FormData();
            formData.append("name", question);
            // console.log(formData);

            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).post(endpoints["create_questions"](surveyId),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            setQuesId(res.data.id);
            Alert.alert("Thong bao", "Tao cau hoi thanh cong");
            return res.data.id;
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCreateOptions = async (questionId) => {
        try {
            const formData1 = new FormData();
            formData1.append("question", questionId);
            formData1.append("name", optionText);

            // console.log(options);
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).post(endpoints["choices"],
                formData1,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            // Alert.alert("Thong bao", "Dang thanh cong");
        } catch(ex){
            console.error(ex);
        }
    }
        const buttonCreateOption = async () => {
            if (optionText) {
                setOptions([...options, { id: String(options.length + 1), label: optionText}]);
                setOptionText('');
            }
            await loadCreateOptions(quesId);
        }

        const handleShow = () => {
            if (question && options.length > 0 ) { 
                setQuestion('');
                setOptions([]);
    
                const newQuestion = {
                    id: String(questions.length + 1),
                    text: question,
                    options: options,
                };
                setQuestions([...questions, newQuestion]);
                // console.log(newQuestion);
            }
            setShowQuestions(true);
            // console.log(showQuestions); // Khi click vào nút "Show", đặt showQuestions thành true để hiển thị danh sách câu hỏi
        };

        const completeCreate = () => {
            loadSurveys();
            Alert.alert("Thông báo", "Tạo bài khảo sát hoàn tất!");
            loadSurveys();
            navigation.navigate("Surveys");
        }

    return  (
        <PaperProvider>
        <ScrollView>

            <Appbar.Header> 
                <Appbar.Content title="Surveys" />
                <Appbar.Action icon="check-decagram" onPress={completeCreate} />
            </Appbar.Header>

            {showQuestions && questions.map((question, index) => (
                <SurveyQuestion
                    key={question.id}
                    index={`Câu hỏi ${index + 1}:`}
                    question={question.text}
                    options={question.options}
                />
            ))}

            <TouchableOpacity
                    style={[Style.margin, Style.container]}
                    onPress={handleShow}
                >
                    <View style={{
                        backgroundColor: "#543310",
                        width: '80%',
                        height: 50,
                        marginLeft: 30,
                        borderRadius: 0,
                        
                    }}>
                        <Text style={{color: "white", 
                            alignSelf: "center",
                            marginTop: 14, 
                            fontSize: 15, 
                            fontWeight: "normal"}}>Show</Text>
                    </View>
            </TouchableOpacity>

            <Divider style={{marginBottom: 10}} />

            <View style={styles.container}>

                <TextInput
                    style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        textAlignVertical: 'top',
                        marginBottom: 5,
                        marginRight: 10
                    }}
                    value={question}
                    onChangeText={setQuestion}
                    multiline={true}
                    placeholder="Nhập câu hỏi"
                    placeholderTextColor="white"
                    textColor="white"
                    cursorColor="white"
                    underlineStyle={{ backgroundColor: "#543310" }}
                    backgroundColor="#543310"
                />

                <TouchableOpacity
                        style={[Style.margin, Style.container]}
                        onPress={loadCreateQuestion}
                    >
                        <View style={{
                            backgroundColor: "#543310",
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
                        marginBottom: 5,
                        marginRight: 10
                    }}
                    value={optionText}
                    onChangeText={setOptionText}
                    placeholder="Nhập lựa chọn"
                    multiline={true}
                    placeholderTextColor="white"
                    textColor="white"
                    cursorColor="white"
                    underlineStyle={{ backgroundColor: "#543310" }}
                    backgroundColor="#543310"
                />

                <RadioGroup
                    radioButtons={options}
                    layout='row'
                />

                <TouchableOpacity
                        style={[Style.margin, Style.container]}
                        onPress={buttonCreateOption}
                    >
                        <View style={{
                            backgroundColor: "#543310",
                            width: '80%',
                            height: 50,
                            marginLeft: 30,
                            borderRadius: 0,
                            
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
        </PaperProvider>
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