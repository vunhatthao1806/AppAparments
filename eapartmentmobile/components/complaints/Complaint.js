import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import MyStyle from "../../styles/MyStyle";
import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, Card, Chip, List, Searchbar } from "react-native-paper";
import Style from "./Style";
import moment from "moment";
import { Image } from "react-native";
import RenderHTML from 'react-native-render-html';

const  Complaint = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading,setLoading] = useState(false);
    const [q, setQ] = useState("");
    const { width } = useWindowDimensions();

    const loadComplaints = async () => {
        try {
            let res = await APIs.get(endpoints['complaints']);
            setComplaints(res.data);
        } catch (ex) {
            console.error(ex);
        } 
    }
    const [showFullContent, setShowFullContent] = useState(false);

    const handleToggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const maxContentLength = 100; // Giới hạn số lượng ký tự để hiển thị trước khi bấm "Đọc thêm"

    
    useEffect(() => {
        loadComplaints();
    }, []);

    return (
        <View style={MyStyle.container}>
            <Text style={Style.cates}>COMPLAINTS</Text>
            <View>
                <Searchbar style={Style.searchbar} placeholder="Search" onChangeText={(t) => search(t, setQ)} value={q} />
            </View>

            <ScrollView>
            {complaints===null?<ActivityIndicator/>:<>
            {complaints.map(c =>
            <Card>
                <Text style={Style.title}>{c.title}</Text>
                <Card.Cover source={{ uri: c.image }} />

                <Card.Content style={Style.cardContent}>
                <View>
                    {complaints.status_tag.map(t => (
                        <Chip key={t.id}>{t.name}</Chip>
                    ))}
                </View>
                    <RenderHTML
                        contentWidth={width} 
                        source={{ html: showFullContent ? c.content : c.content.slice(0, maxContentLength) }}
                        defaultTextProps={{ style: Style.text }} 
                    />
                    {!showFullContent && c.content.length > maxContentLength && (
                    <TouchableOpacity onPress={handleToggleContent}>
                        <Text style={Style.readMore}>Đọc thêm</Text>
                    </TouchableOpacity>
                    )}
                    {showFullContent && (
                        <TouchableOpacity onPress={handleToggleContent}>
                            <Text style={Style.readMore}>Thu gọn</Text>
                        </TouchableOpacity>
                    )}
                </Card.Content>
            </Card> )}
            </>}
            </ScrollView>

            <ScrollView>
                {complaints.map(c =>
                    <List.Item  key={c.id} title={c.title} description={moment(c.created_date).fromNow()} left={() => 
                    <Image style={MyStyle.avatar} source={{uri: c.image}} />} />
                )}
            </ScrollView>
        </View>
    );
}

export default Complaint;
