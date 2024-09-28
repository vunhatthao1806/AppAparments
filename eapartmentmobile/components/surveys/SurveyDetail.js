import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { authAPI, endpoints } from "../../configs/APIs";
import { isCloseToBottom } from "../utils/Utils";
import { RadioGroup } from "react-native-radio-buttons-group";
import SurveyQuestion from "../admin/creations/surveys/SurveyQuestion";
import { RadioButton } from "react-native-paper";
import Style from "../complaints/Style";

const SurveyDetail = ({ route, navigation }) => {
  const surveyId = route.params?.surveyId;

  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState({});

  const [surveys, setSurveys] = useState([]);
  const [surveyUserDone, setSurveyUserDone] = useState([]);

  const loadSurveysNew = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(endpoints["survey_new"]);

      setSurveys(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadSurveyUserDone = async () => {
    try {
      const formData = new FormData();
      formData.append("survey", surveyId);
      formData.append("active", "False");

      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).post(
        endpoints["survey_user_done"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSurveyUserDone(res.data);
      console.log(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(
        endpoints["questions"](surveyId)
      );
      setQuestions(res.data);
      res.data.forEach((question) => loadChoices(question.id));
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const loadChoices = async (questionId) => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authAPI(accessToken).get(
        endpoints["get_choices"](questionId)
      );
      setChoices((prevChoices) => ({
        ...prevChoices,
        [questionId]: res.data,
      }));
    } catch (ex) {
      console.error(ex);
    }
  };

  // questionId, choiceId
  const loadCreateAnswer = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let promises = [];

      for (let questionId in selectedId) {
        const choiceId = selectedId[questionId];
        const formData = new FormData();
        formData.append("survey", surveyId);
        formData.append("question", questionId);
        formData.append("choice", choiceId);

        console.log(surveyId);
        console.log(questionId);
        console.log(choiceId);
        console.log(formData);

        let request = authAPI(accessToken).post(
          endpoints["answers"],
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        promises.push(request);
      }
      await Promise.all(promises);
      Alert.alert("Thông báo", "Lưu tất cả câu trả lời thành công!");
      loadSurveyUserDone();
      loadSurveysNew();
      navigation.navigate("SurveysUser");
    } catch (ex) {
      console.error(ex);
      Alert.alert("Thông báo", "Lưu câu trả lời thất bại!");
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      questions.forEach((q) => {
        loadChoices(q.id);
      });
    }
  }, [questions]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleChoiceSelect = (questionId, choiceId) => {
    setSelectedId((prevSelectedChoices) => ({
      ...prevSelectedChoices,
      [questionId]: choiceId,
    }));
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {questions.map((q, index) => (
            <View style={styles.container} key={q.id}>
              <View>
                <Text style={styles.question}>{`Câu hỏi ${index + 1}:`} </Text>

                <View
                  style={{
                    backgroundColor: "#D2E3C8",
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      margin: 10,
                      fontSize: 16,
                    }}
                  >
                    {q.name}
                  </Text>
                </View>
              </View>

              <RadioButton.Group
                onValueChange={(newValue) => handleChoiceSelect(q.id, newValue)}
                value={selectedId[q.id] || ""}
              >
                {choices[q.id] &&
                  choices[q.id].map((choice) => (
                    <>
                      <View
                        key={choice.id}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton value={choice.id.toString()} />
                        <Text>{choice.name}</Text>
                      </View>
                    </>
                  ))}
              </RadioButton.Group>
            </View>
          ))}
        </>
      )}

      {questions.length === 0 ? (
        <>
          <View style={Style.noCommentContainer}>
            <Text style={Style.noCommentText}>
              Không có câu hỏi nào được tạo
            </Text>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={[Style.margin, Style.container]}
            onPress={loadCreateAnswer}
          >
            <View
              style={{
                backgroundColor: "#543310",
                width: "40%",
                height: 50,
                marginLeft: "30%",
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  marginTop: 14,
                  fontSize: 15,
                  fontWeight: "normal",
                }}
              >
                Hoàn thành
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    marginLeft: 15,
  },
  question: {
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#17594A",
    backgroundColor: "#17594A",
    color: "white",
    padding: 8,
    width: 100,
  },
});

export default SurveyDetail;
