import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import { ActivityIndicator, Avatar, Button, Card, Chip, Icon, List, TextInput, Menu, Divider, PaperProvider, IconButton } from "react-native-paper";
import Style from "./Style";
import MyStyle from "../../styles/MyStyle";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../utils/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ComplaintDetail = ({route, navigation}) => {
    const [complaint, setComplaint] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [content, setContent] = useState("");
    const [liked, setLiked] = useState(false);

    const [like, setLike] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const complaintId = route.params?.complaintId;
    const { width } = useWindowDimensions();

    const [visible, setVisible] = useState(null);

    const openMenu = (id) => setVisible(id);

    const closeMenu = () => setVisible(null);

    const loadComplaint = async () => {
        try {
            let res = await APIs.get(endpoints['complaint-detail'](complaintId));
            setComplaint(res.data);
        } catch (ex){
            console.error(ex);
        }
    }

    const loadLike = async () => {
        try {
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).post(endpoints["liked"](complaintId));        
            // -----Mới thêm-----
            setLiked(!liked);
            console.log(response.data);
            setLikeCount(response.data.likeCount);
        } catch (ex){
            console.error(ex);
        }
    }

    const loadLikeCount = async () => {
        try {
            let res = await APIs.get(endpoints['get_likes'](complaintId));
            // console.log('loadLikeCount response:', res.data);
            setLikeCount(res.data);
        } catch(ex){
            console.error(ex);
        }
    } 

    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints['comments'](complaintId));
            setComments(Array.isArray(res.data) ? res.data : [])
        } catch (ex) {
            console.error(ex);
        }
    } 

    const loadAddComment = async () => {
        try {
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).post(endpoints["add_comment"](complaintId),{
                content: comment
            });  
            loadComments();
            setComment('');
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadDeleteComment = async (commentId) => {
        try {
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).delete(endpoints["delete_comment"](commentId));  
            loadComments();
        } catch (ex) {
            console.error(ex);
        }
    }
    // const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        await loadLike();
        await loadLikeCount();
    };

    const handleComment = async () => {
        await loadAddComment();
    }
 
    useEffect(() => {
        loadComplaint();
    }, [complaintId]);

    useEffect(() => {
        loadLikeCount();
    }, [complaintId]);


    const loadMoreInfo = ({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
            loadComments();
        }
    }

    return (
        <PaperProvider>
            <ScrollView onScroll={loadMoreInfo}>
                {complaint===null?<ActivityIndicator/>:<>
                {/* -----Mới thêm----- */}
                    <Card style={[Style.marginbot, {backgroundColor: 'white', borderRadius: 0}]}>
                    
                        <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                            <Avatar.Image style={Style.marginbot} size={45} source={{ uri: complaint.user.avatar }} />
                            <View style={{marginLeft: 5}}>
                                <Text style={Style.username}>{complaint.user.username}</Text>
                                <Text style={Style.createdDate}>{moment(complaint.created_date).format("DD/MM/YYYY HH:mm")}</Text>
                            </View>
                        </View>

                        <Text style={Style.title}>{complaint.title}</Text>

                        <Card.Cover source={{ uri: complaint.image }} />
                        <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                            {complaint.complaint_tag && (
                                <Chip 
                                    key={complaint.complaint_tag.id} 
                                    style={[MyStyle.margin, {backgroundColor: "#543310"}]} 
                                        icon={() => (// -----Mới thêm-----
                                            <Icon
                                                source="tag"
                                                size={20}
                                                color={'#F8F4E1'}
                                            />)}
                                                
                                        textStyle={{color: '#F8F4E1'}}
                                    >{complaint.complaint_tag.name}</Chip>
                            )}
                            {complaint.status_tag && (
                                <Chip 
                                    key={complaint.status_tag.id} 
                                    style={{
                                        ...MyStyle.margin, 
                                        ...MyStyle.statustag, 
                                        backgroundColor: complaint.status_tag.name === "Chưa xử lý" ? "#FF8F8F" : "#B0EBB4"
                                    }}
                                    >{complaint.status_tag.name}</Chip>
                            )}
                        </View>
                        <Card.Content>
                            <RenderHTML 
                                contentWidth={width} 
                                source={{ html:  complaint.content }} 
                            />
                        </Card.Content>
                    </Card>
                </>}

                <View style={[Style.commentStyle, MyStyle.row, {"justifyContent": "space-between"}]}> 
                    <View style={Style.buttonContainer}>
                        <Button 
                            icon={() => (// -----Mới thêm-----
                                <Icon
                                source={liked ? "thumb-up" : "thumb-up-outline"}
                                size={30}
                                color={'#543310'}
                                />)}
                            mode="outlined" 
                            onPress={handleLike}>
                        </Button>
                    </View>
                    <View style={Style.tags}>
                        <Text>Lượt thích: {likeCount}</Text>
                    </View>
                </View>
                
                <View style={[MyStyle.row, {"justifyContent": "space-between"}]}>
                    <TextInput style={Style.textInput} 
                        multiline={true} 
                        label={"Suy nghĩ của bạn là gì"} 
                        value={comment} 
                        onChangeText={setComment}
                        backgroundColor="#F8F4E1"
                        />
                    <View style={Style.buttonContainer}>
                        <Button style={Style.button}
                            icon={() => (// -----Mới thêm-----
                                <Icon
                                    source={"send"}
                                    size={25}
                                    color={'#543310'}
                                    />)}
                            mode="contained" 
                            onPress={handleComment}/>
                    </View>
                </View>

                <View style={Style.commentsContainer}>
                    {comments.length > 0 ? comments.map(c => (
                        <View key={c.id} style={[Style.commentStyle]}>
                            <View style={Style.commentContent}>
                                <Avatar.Image size={43} source={{ uri: c.user.avatar }} />
                                <View style={Style.textContainer}>
                                    <View style={Style.userInfo}>
                                        <Text style={Style.username}>{c.user.username}</Text>
                                        <Text style={Style.createdDate}>{moment(c.created_date).fromNow()}</Text>
                                    </View>
                                    <Text style={Style.commentText}>{c.content}</Text>
                                </View>

                                <View>
                                    <Menu
                                        visible={visible === c.id}
                                        onDismiss={closeMenu}
                                        anchor={
                                            <IconButton  onPress={() => openMenu(c.id)}  icon="dots-vertical" size={20} />}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '60%', 
                                                elevation: 4,
                                        }}
                                            >
                                            <Menu.Item style={{ padding: 10 }} onPress={() => navigation.navigate('EditComment', {'commentId': c.id})} title="Chỉnh sửa" />
                                            <Menu.Item style={{ padding: 10 }} onPress={() => loadDeleteComment(c.id)} title="Xóa" />
                                    </Menu>
                                </View>
                                
                            </View>
                            
                        </View>
                        )) :   
                        <View style={Style.noCommentContainer}>
                            <Text style={Style.noCommentText}>Chưa có bình luận nào!</Text>
                        </View>
                    }
                    
                </View>
            </ScrollView>
        </PaperProvider>
    );
}

export default ComplaintDetail;