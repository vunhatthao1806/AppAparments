import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import MyStyle from '../../../../styles/MyStyle';

const SurveyQuestion = ({ question, options, index }) => {
    const [selectedId, setSelectedId] = useState('');
    
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.question}>{index} </Text>
                
                <View style={{
                    backgroundColor: "#D2E3C8",
                }}>
                    <Text style={{
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        fontSize: 16
                    }}>{question}</Text>
                </View>
                
            </View>
            
            <RadioGroup
                radioButtons={options}
                onPress={setSelectedId}
                selectedId={selectedId}
                layout='row'
            />
            {selectedId && <Text style={styles.selectedOption}>Bạn đã chọn: {selectedId}</Text>}
        </View>
    );
};

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

export default SurveyQuestion;