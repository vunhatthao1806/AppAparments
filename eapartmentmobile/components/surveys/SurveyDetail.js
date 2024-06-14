import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { authAPI, endpoints } from "../../configs/APIs";
import { isCloseToBottom } from "../utils/Utils";
import { RadioGroup } from "react-native-radio-buttons-group";
import SurveyQuestion from "../admin/creations/surveys/SurveyQuestion";

const SurveyDetail = ({route}) => {
    const surveyId = route.params?.surveyId;

    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([]);

    const [loading,setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState({});

    const loadQuestions = async () => {
        setLoading(true);
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["questions"](surveyId));
            setQuestions(res.data);
            // console.log(res.data);
        } catch(ex) {
            console.error(ex);
        }finally {
            setLoading(false);
        }
    }

    const loadChoices = async () => {
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints["choices"]);
            setChoices(res.data);
            // console.log(res.data);
        } catch(ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadQuestions();
    }, [])

    useEffect(() => {
        loadChoices();
    }, [])

    const [isExtended, setIsExtended] = useState(true);

    const Scroll = ({ nativeEvent }) => {
        const currentScrollPosition =
        Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

        setIsExtended(currentScrollPosition <= 0);

        if (!loading && page > 0 && isCloseToBottom(nativeEvent)){
            setPage(page + 1);
        }
    };

    return (
        <ScrollView onScroll={Scroll}>
            {loading ? <ActivityIndicator/> : <>
                {questions.map((question, index) => {
                    <SurveyQuestion
                        key={question.id}
                        index={`Câu hỏi ${index + 1}:`}
                        question={question.name}
                        options={choices.filter(choice => choice.question === question.id)}
                    />
                    // const filteredChoices = choices.filter(choice => choice.question === q.id);
                    // // console.log(`Filtered choices for question ${q.id}:`, filteredChoices);
                    // return (
                    //     <View style={styles.container}>
                    //         <View >
                    //             <Text style={styles.question}>{`Câu hỏi ${index + 1}:`} </Text>
                                
                    //             <View style={{
                    //                 backgroundColor: "#D2E3C8",
                    //                 marginRight: 10
                    //             }}>
                    //                 <Text style={{
                    //                     margin: 10,
                    //                     fontSize: 16
                    //                 }}>{q.name}</Text>
                    //             </View>
                                
                    //         </View>
                    //         {filteredChoices.length > 0 ? (
                    //             <>
                    //                 <RadioGroup
                    //                     radioButtons={filteredChoices.map(choice => ({
                    //                         id: choice.id.toString(),
                    //                         label: choice.name
                    //                     }))}
                    //                     layout='row'
                    //                     onPress={setSelectedId}
                    //                     selectedId={selectedId}
                    //                 />
                    //                  {selectedId && <Text style={styles.selectedOption}>Bạn đã chọn: {filteredChoices.find(choice => choice.id.toString() === selectedId)?.id}</Text>}
                    //             </>
                    //         ) : (
                    //             <Text>No choices available</Text>
                    //         )}
                    //     </View>
                    // );
                })}
            </>}
            
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


export default SurveyDetail;