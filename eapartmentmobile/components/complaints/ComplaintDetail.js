import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, Avatar, Button, Card, Chip, List, TextInput } from "react-native-paper";
import Style from "./Style";
import MyStyle from "../../styles/MyStyle";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../utils/Utils";

const ComplaintDetail = ({route}) => {
    const [complaint, setComplaint] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const complaintId = route.params?.complaintId;
    const { width } = useWindowDimensions();

    const loadComplaint = async () => {
        try {
            let res = await APIs.get(endpoints['complaint-detail'](complaintId));
            setComplaint(res.data);
        } catch (ex){
            console.error(ex);
        }
    }

    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints['comments'](complaintId));
            setComments(Array.isArray(res.data) ? res.data : [])
            // console.info(res.data);
        } catch (ex) {
            console.error(ex);
        }
    } 

    useEffect(() => {
        loadComplaint(); 
    }, [complaintId]);

    const loadMoreInfo = ({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
            loadComments();
        }
    }

    return (
        <View>
            <ScrollView onScroll={loadMoreInfo}>
                {complaint===null?<ActivityIndicator/>:<>
                    <Card style={Style.marginbot}>
                        
                        <Text style={Style.title}>{complaint.title}</Text>

                        <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                            <Avatar.Image style={Style.marginbot} size={43} source={{ uri: complaint.user.avatar }} />
                            <View >
                                <Text style={Style.username}>{complaint.user.username}</Text>
                                <Text style={Style.createdDate}>{moment(complaint.created_date).format("DD/MM/YYYY HH:mm")}</Text>
                            </View>
                        </View>

                        <Card.Cover source={{ uri: complaint.image }} />
                        <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                            {complaint.complaint_tag && (
                                <Chip key={complaint.complaint_tag.id} style={MyStyle.margin} icon="vacuum">{complaint.complaint_tag.name}</Chip>
                            )}
                            {complaint.status_tag && (
                                <Chip key={complaint.status_tag.id} style={[MyStyle.margin, MyStyle.statustag]} selectedColor="white" >{complaint.status_tag.name}</Chip>
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
                            icon="thumb-up-outline" 
                            mode="outlined" 
                            onPress={() => console.log('Pressed')}>Like</Button>
                    </View>
                    <View style={Style.margin}>
                        <Text>View</Text>
                    </View>
                </View>
                
                <View style={[MyStyle.row, {"justifyContent": "space-between"}]}>
                    <TextInput style={Style.textInput} 
                        multiline={true} 
                        label={"Suy nghĩ của bạn là gì"} 
                        value={content} 
                        onChangeText={setContent} />
                    <View style={Style.buttonContainer}>
                        <Button style={Style.button}
                            icon="send-circle" 
                            mode="contained" 
                            onPress={() => console.log('Pressed')}/>
                    </View>
                </View>

                <View style={Style.commentsContainer}>
                    {comments.length > 0 ? comments.map(c => (
                            <List.Item
                                style={Style.commentStyle}
                                key={c.id}
                                title={c.user.username}
                                description={c.content}
                                left={() => <Avatar.Image size={43} source={{ uri: c.user.avatar }} />}
                                right={() => <Text>{moment(c.created_date).fromNow()}</Text>}
                            />
                        )) :   
                        <View style={Style.noCommentContainer}>
                            <Text style={Style.noCommentText}>Chưa có bình luận nào!</Text>
                        </View>}
                </View>
            </ScrollView>
        </View>
    );
}

export default ComplaintDetail;