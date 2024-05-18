import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, Avatar, Card, Chip, List } from "react-native-paper";
import Style from "./Style";
import MyStyle from "../../styles/MyStyle";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../utils/Utils";

const ComplaintDetail = ({route}) => {
    const [complaint, setComplaint] = useState(null);
    const [comments, setComments] = useState([]);
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
            setComments(Array.isArray(res.data) ? res.data : []);
        } catch(ex) {
            console.error(ex);
        }
    }
    

    useEffect(() => {
        loadComplaint();
    }, [complaintId]);

    useEffect(() => {
        loadComments();
    }, [complaintId]);

    // const loadMoreInfo = ({nativeEvent}) => {
    //     if (!comments && isCloseToBottom(nativeEvent)) {
    //         loadComments();
    //     }
    // }

    return (
        <View>
            <ScrollView >
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
                                //source={{html: c.content}}
                                source={{ html:  complaint.content }}
                                defaultTextProps={{ style: Style.text }} 
                            />
                        </Card.Content>
                    </Card>
                </>}

                <View >
                    {comments && comments.map(c =>
                        <List.Item key={c.id}
                            title={c.content}
                            description={moment(c.created_date).fromNow()}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default ComplaintDetail;