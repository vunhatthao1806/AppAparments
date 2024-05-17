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
    const [showFullContent, setShowFullContent] = useState({});

    const loadComplaints = async () => {
        try {
            let res = await APIs.get(endpoints['complaints']);
            setComplaints(res.data);
        } catch (ex) {
            console.error(ex);
        } 
    }

    // const handleToggleContent = (id) => {
    //     setShowFullContent(!showFullContent);
    // };

    const handleToggleContent = (id) => {
        setShowFullContent((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const maxContentLength = 100; // Giới hạn số lượng ký tự để hiển thị trước khi bấm "Đọc thêm"

    
    useEffect(() => {
        loadComplaints();
    }, []);

    return (
        <View style={[MyStyle.container]}>
            <Text style={[Style.cates, Style.margin]}>Bản tin góp ý</Text>
            <View>
                {/* <Searchbar style={[Style.searchbar, ]} placeholder="Search" onChangeText={(t) => search(t, setQ)} value={q} /> */}
            </View>

            <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                {complaints.map(c =>
                    c.complaint_tag && (
                        <Chip key={c.complaint_tag.id} style={Style.tags} icon="vacuum">{c.complaint_tag.name}</Chip>
                    )
                )}
            </View>

            <ScrollView>
                {complaints===null?<ActivityIndicator/>:<>
                {complaints.map(c =>
                <Card key={c.id}  style={Style.marginbot}>
                    <Text style={Style.title}>{c.title}</Text>

                    <Text>{moment(c.created_date).format("DD/MM/YYYY HH:mm")}</Text>

                    <Card.Cover source={{ uri: c.image }} />
                    <View style={[MyStyle.row, MyStyle.wrap, MyStyle.margin]}>
                        {c.complaint_tag && (
                            <Chip key={c.complaint_tag.id} style={MyStyle.margin} icon="vacuum">{c.complaint_tag.name}</Chip>
                        )}
                        {c.status_tag && (
                            <Chip key={c.status_tag.id} style={[MyStyle.margin, MyStyle.statustag]} selectedColor="white" >{c.status_tag.name}</Chip>
                        )}
                    </View>
                    <Card.Content style={Style.cardContent}>
                        <RenderHTML
                            contentWidth={width} 
                            //source={{html: c.content}}
                            source={{ html: showFullContent[c.id] ? c.content : `${c.content.slice(0, maxContentLength)}...` }}
                            defaultTextProps={{ style: Style.text }} 
                        />

                         {!showFullContent[c.id] && c.content.length > maxContentLength && (
                            <TouchableOpacity onPress={() => handleToggleContent(c.id)}>
                                <Text style={Style.readMore}>Đọc thêm</Text>
                            </TouchableOpacity>
                        )}
                        {showFullContent[c.id] && (
                            <TouchableOpacity onPress={() => handleToggleContent(c.id)}>
                                <Text style={Style.readMore}>Thu gọn</Text>
                            </TouchableOpacity>
                        )}
                    </Card.Content>
                </Card> )}
                </>}
            </ScrollView>
        </View>
    );
}

export default Complaint;


            {/* <ScrollView>
                {complaints.map(c =>
                    <List.Item key={c.id}
                    title={c.title} 
                    description={
                        // moment(c.created_date).fromNow()
                            c.complaint_tag && (
                                <Chip key={c.complaint_tag.id} style={Style.tags} icon="vacuum">{c.complaint_tag.name}</Chip>
                            )
                    } 
                    right={() => 
                    <Image style={MyStyle.avatar} source={{uri: c.image}} />} />
                )}
            </ScrollView> */}