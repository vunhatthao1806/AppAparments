import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import Style from "../../../complaints/Style";

const QuestionInput = ({ onAddQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [optionText, setOptionText] = useState('');
    const [options, setOptions] = useState([]);

    const handleAddOption = () => {
        if (optionText) {
            setOptions([...options, { id: String(options.length + 1), label: optionText, value: optionText }]);
            setOptionText('');
        }
    };

    const handleAddQuestion = () => {
        if (questionText && options.length > 0) {
            onAddQuestion(questionText, options);
            setQuestionText('');
            setOptions([]);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                    style={[Style.margin, Style.container]}
                    onPress={handleAddQuestion}
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
                value={questionText}
                onChangeText={setQuestionText}
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

            <RadioGroup
                radioButtons={options}
                layout='row'
            />

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
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default QuestionInput;
// const handleAddOption = () => {
//     if (optionText) {
//         setOptions([...options, { id: String(options.length + 1), label: optionText, value: optionText }]);
//         setOptionText('');
//     }
// };

// const handleAddQuestion = () => {
//     if (questionText && options.length > 0) {
//         onAddQuestion(questionText, options);
//         setQuestionText('');
//         setOptions([]);
//     }
// };

// return (
//     <View style={styles.container}>
//         <Text style={styles.title}>Câu hỏi:</Text>
//         <TextInput
//             style={styles.input}
//             value={questionText}
//             onChangeText={setQuestionText}
//             placeholder="Nhập câu hỏi"
//             multiline={true}
//         />
//         <TextInput
//             style={styles.input}
//             value={optionText}
//             onChangeText={setOptionText}
//             placeholder="Nhập lựa chọn"
//             multiline={true}
//         />
//         <Button onPress={handleAddOption}>Thêm lựa chọn</Button>
//         <RadioGroup
//             radioButtons={options}
//             layout='row'
//         />
//         <Button onPress={handleAddQuestion}>Thêm câu hỏi</Button>
//     </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
// },
// title: {
//     fontSize: 18,
//     marginBottom: 10,
// },
// input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
// },
// });

// export default QuestionInput;