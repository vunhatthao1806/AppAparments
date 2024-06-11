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

// const SurveyCreate = () => {
//     const [title, setTitle] = useState('');
//     const [contentSurvey, setContentSurvey] = useState('');

//     const [name, setName] = useState('');
//     const [contentQuestion, setContentQuestion] = useState('');

//     const [questions, setQuestions] = useState([]);

//     const handleAddQuestion = (questionText, options) => {
//         const newQuestion = {
//             id: String(questions.length + 1),
//             text: questionText,
//             options: options,
//         };
//         setQuestions([...questions, newQuestion]);
//     };

//     const radioButtons = useMemo(() => ([
//         {
//             id: '1', // acts as primary key, should be unique and non-empty string
//             label: 'Option 1',
//             value: 'option1'
//         },
//         {
//             id: '2',
//             label: 'Option 2',
//             value: 'option2'
//         }
//     ]), []);

//     const [selectedId, setSelectedId] = useState();

//     const handleAnswer = (questionId, answer) => {
//         console.log(`Question ID: ${questionId}, Answer: ${answer}`);
//     };


//     return (
//         <ScrollView>
//             <View style={[Style.margin, Style.container]}>
//                 <View style={MyStyle.row}>
//                     <Icon
//                         source="pen"
//                         color={'#4F6F52'} 
//                         size={28}
//                     />    
//                     <Text style={Style.titleComplaint}>
//                         Tiêu đề:
//                     </Text>
//                 </View>
//                 <TextInput
//                     style={Style.TextInputComplaint}
//                     value={title}
//                     onChangeText={title => setTitle(title)}
//                     multiline={true}
//                     placeholderTextColor="white"
//                     textColor="white"
//                     cursorColor="white"
//                     underlineStyle={{ backgroundColor: "#627254" }}
//                     backgroundColor="#627254"
//                 />
//             </View>

//             <View style={[Style.margin, Style.container]}>
//                 <View style={MyStyle.row}>
//                     <Icon
//                         source="pen"
//                         color={'#4F6F52'} 
//                         size={28}
//                     />    
//                     <Text style={Style.titleComplaint}>
//                         Nội dung:
//                     </Text>
//                 </View>
//                 <TextInput
//                     style={Style.TextInputComplaint}
//                     value={contentSurvey}
//                     onChangeText={contentSurvey => setContentSurvey(contentSurvey)}
//                     multiline={true}
//                     placeholderTextColor="white"
//                     textColor="white"
//                     cursorColor="white"
//                     underlineStyle={{ backgroundColor: "#627254" }}
//                     backgroundColor="#627254"
//                 />
//             </View>

//             <Divider/>

//             <View>
//                 <View style={[Style.margin, Style.container]}>
//                     <View style={MyStyle.row}>
//                         <Text style={Style.titleComplaint}>
//                             Câu hỏi 1:
//                         </Text>
//                     </View>
//                     <TextInput
//                         style={Style.TextInputComplaint}
//                         value={name}
//                         onChangeText={name => setName(name)}
//                         multiline={true}
//                         placeholderTextColor="white"
//                         textColor="white"
//                         cursorColor="white"
//                         underlineStyle={{ backgroundColor: "#627254" }}
//                         backgroundColor="#627254"
//                     />
//                 </View>
//             </View>

//             <QuestionInput onAddQuestion={handleAddQuestion} />

//             {questions.map((question, index) => (
//                 <SurveyQuestion
//                     key={question.id}
//                     question={`Câu hỏi ${index + 1}: ${question.text}`}
//                     options={question.options}
//                     onAnswer={(answer) => handleAnswer(question.id, answer)}
//                 />
//             ))}

//             <View>
//                 <Text>Nhập tên các lựa chọn</Text>
//                 <View>
//                     <TextInput
//                         style={{
//                             borderRadius: 50,
//                             width: '50%',
//                             marginLeft: 25,
                            
//                         }}
//                         // value={name}
//                         // onChangeText={name => setName(name)}
//                         multiline={true}
//                         placeholderTextColor="black"
//                         textColor="black"
//                         cursorColor="black"
//                         underlineStyle={{ backgroundColor: "#B0EBB4" }}
//                         backgroundColor="#C6EBC5"
//                         />
//                 </View>
//             </View>

//             <View>
//                 <RadioGroup 
//                     radioButtons={radioButtons} 
//                     onPress={setSelectedId}
//                     selectedId={selectedId}
//                     layout='row'
//                 />
//             </View>

//             <View>
//                 <TouchableOpacity 
//                     style={[Style.margin, Style.container]} 
//                     onPress={() => handleAddQuestion('', [])}>
//                     <View style={{
//                                 backgroundColor: "#C9BBCF",
//                                 width: '80%',
//                                 height: 50,
//                                 marginLeft: 30,
//                                 borderRadius: 0
//                     }}>
//                         <Text style={{color: "#627254", 
//                                     alignSelf: "center",
//                                     marginTop: 10, 
//                                     fontSize: 18, 
//                                     fontWeight: "normal"}}>Thêm câu hỏi</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// }

// export default SurveyCreate;

const SurveyCreate = () => {
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
            Alert.alert("Thông báo", "Đăng ký thành công!!!");
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