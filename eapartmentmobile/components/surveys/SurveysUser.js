import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native";
import MyStyle from "../../styles/MyStyle";
import { useEffect, useInsertionEffect, useState } from "react";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import { Avatar, Button, Icon } from "react-native-paper";
import Style from "../admin/creations/surveys/Style";
import { isCloseToBottom } from "../utils/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHTML from "react-native-render-html";
import moment from "moment/moment";

const SurveysUser = ({navigation}) => {
    const [surveys, setSurveys] = useState([]);
    const { width } = useWindowDimensions();

    const [page, setPage] = useState(1)
    const [loading,setLoading] = useState(false);

    const loadSurveys = async () => {
        if (page > 0) {
            setLoading(true);
            let url = `${endpoints["surveys"]}?page=${page}`;
            try {
                accessToken = await AsyncStorage.getItem("access-token");
                let response = await authAPI(accessToken).get(url);

                // console.log(response.data);
                if (page === 1)
                    setSurveys(response.data.results);
                else
                setSurveys(current => {
                    return [...current, ...response.data.results] //chen them du lieu vao trang hien tai
                });
                if (!response.data.next)
                    setPage(0);
            } catch(ex){
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        loadSurveys();
    },[page]);

    const maxContentLength = 100;

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
            <View style={Style.commentsContainer}>
                {surveys.length > 0 ? surveys.map(c => (
                    <TouchableOpacity onPress={() => navigation.navigate('SurveyDetail', {'surveyId': c.id})}>
                        <View key={c.id} style={[Style.commentStyle]}>
                            <View style={Style.commentContent}>
                                <Avatar.Image 
                                    // style={{marginTop: '-20%'}} 
                                    size={50} 
                                    source={{ uri: c.user_create.avatar }} />
                                <View style={Style.textContainer}>
                                    <View style={Style.userInfo}>
                                        <Text style={Style.username}>{c.user_create.username}</Text>
                                        <Text style={Style.createdDate}>{moment(c.created_date).format("DD/MM/YYYY")}</Text>
                                    </View>
                                    <Text style={Style.commentText}>{c.title}</Text>
                                </View>
                            </View>
                            <View style={{
                                marginTop: 10,
                                marginLeft: 10
                            }}>
                                <RenderHTML
                                            contentWidth={width} 
                                            source={{  html: `${c.content.slice(0, maxContentLength)}...` }}
                                        />
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: "flex-end", marginTop: 2}}>
                                            <Icon 
                                                source="eye"
                                                color={'#DDDDDD'}
                                                size={20}
                                            />
                                            <Text style={{flexWrap: 'wrap', fontWeight: "bold", marginLeft: 5, marginBottom: 5, marginTop: -1}}>{c.user_count}</Text>
                                </View>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                    )) :   
                    <View style={Style.noCommentContainer}>
                        <Text style={Style.noCommentText}>Chưa có bài khảo sát nào!</Text>
                    </View>
                }
                    
            </View>
        
        </ScrollView>
        
    );
}

export default SurveysUser;