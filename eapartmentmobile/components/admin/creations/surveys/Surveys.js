import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Appbar, Avatar, Button, Divider, Icon, Menu, PaperProvider } from "react-native-paper";
import Style from "../surveys/Style";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, endpoints } from "../../../../configs/APIs";
import RenderHTML from "react-native-render-html";

const Surveys = ({navigation}) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const [surveys, setSurveys] = useState([])

    const { width } = useWindowDimensions();

    const loadSurveys = async () => {
        try {
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).get(endpoints["surveys"]);  
            setSurveys(response.data);
        } catch(ex){
            console.error(ex);
        }
    }

    useEffect(() => {
        loadSurveys();
    },[])

    const maxContentLength = 100;

    return(
        <PaperProvider>
            <ScrollView>
                <Appbar.Header> 
                    <Appbar.Content title="Surveys" />
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Appbar.Action 
                            icon="dots-vertical" 
                            onPress={openMenu} 
                                
                        />}
                        style={{
                            position: 'absolute',
                            top: '12%',
                            left: '58%', 
                            // elevation: 9,
                        }}
                        >
                            <Menu.Item onPress={() => navigation.navigate("SurveyCreate")} title="Thêm khảo sát" />
                                {/* <Divider />
                            <Menu.Item onPress={() => {}} title="Xem thống kê" /> */}
                        
                    </Menu>
                </Appbar.Header>

                <View style={Style.commentsContainer}>
                    {surveys.length > 0 ? surveys.map(c => (
                        <TouchableOpacity>
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
                                                <Text style={{flexWrap: 'wrap', fontWeight: "bold", marginLeft: 5, marginBottom: 5, marginTop: -1}}>{c.count_users}</Text>
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
        </PaperProvider>
    );
}
export default Surveys;