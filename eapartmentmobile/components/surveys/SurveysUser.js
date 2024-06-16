import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity, RefreshControl  } from "react-native";
import MyStyle from "../../styles/MyStyle";
import { useEffect, useInsertionEffect, useState } from "react";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import { Appbar, Avatar, Button, Icon, PaperProvider } from "react-native-paper";
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
    const [refreshing, setRefreshing] = useState(false);


    const loadSurveyNew = async () => {
        setLoading(true);
        try {
            let accessToken = await AsyncStorage.getItem("access-token");
            let res = await authAPI(accessToken).get(endpoints['survey_new']);

            setSurveys(res.data);
            // console.log(res.data);
        } catch(ex){
            console.error(ex);
        }finally{
            setLoading(false);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await loadSurveyNew();
        } catch (ex) {
            console.error(ex);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadSurveyNew();
    },[]);

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
        <PaperProvider>
            <Appbar.Header style={{backgroundColor: "white"}}> 
                {/* <Appbar.BackAction onPress={() => {}} /> */}
                <Appbar.Content title="Bài khảo sát" />
                <Appbar.Action icon="clipboard-clock-outline" onPress={() => navigation.navigate('SurveysHistory')}/>
            </Appbar.Header>
            <ScrollView 
                onScroll={Scroll}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <View style={Style.commentsContainer}>
                    {surveys.length > 0 ? surveys.map(c => (
                        <TouchableOpacity onPress={() => navigation.navigate('SurveyDetail', {'surveyId': c.id})}>
                            <View key={c.id} style={[Style.commentStyle]}>
                                <View style={[Style.commentContent, {marginLeft: 10, marginTop: 5}]}>
                                    <Avatar.Image 
                                        size={40} 
                                        source={{ uri: c.user_create.avatar }} />
                                    <View style={Style.textContainer}>
                                        <View style={Style.userInfo}>
                                            <View>
                                                <Text style={Style.username}>{c.user_create.username}</Text>
                                                <Text style={{ 
                                                    fontSize: 10,
                                                    padding: 3, // Thêm padding để có không gian cho border
                                                    backgroundColor: c.active === true ? "red" : "green",
                                                    color: "white",
                                                    borderRadius: 10,
                                                    borderColor: c.active === true ? "red" : "green"
                                                }}>
                                                    {c.active === true ? "Chưa hoàn thành" : "Hoàn thành"}
                                                </Text>
                                            </View>
                                        <Text style={Style.createdDate}>{moment(c.created_date).format("DD/MM/YYYY")}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    marginTop: 10,
                                    marginLeft: 10
                                }}>
                                    <Text style={Style.commentText}>{c.title}</Text>
                                    <RenderHTML
                                        contentWidth={width}
                                        source={{ html: c.content}} 
                                        // source={{  html: `${c.content.slice(0, maxContentLength)}...` }}
                                    />
                                </View>
                                <View>
                            {/* <View style={{flexDirection: 'row', justifyContent: "flex-end", marginTop: 2}}>
                                    <Icon
                                            source="eye"
                                            color={'#DDDDDD'}
                                            size={20}
                                        />
                                    <Text style={{flexWrap: 'wrap', fontWeight: "bold", marginLeft: 10}}>{c.user_count}</Text>
                                </View> */}
                            
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
        </PaperProvider>
    );
}
export default SurveysUser;