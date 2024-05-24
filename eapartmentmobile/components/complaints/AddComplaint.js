import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Checkbox, Icon, TextInput, ToggleButton } from "react-native-paper";
import Style from "./Style";
import MyStyle from "../../styles/MyStyle";
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Complaint = () => {
    const [checkedStatus, setCheckedStatus] = useState(false);
    const [checkedComplaint, setCheckedComplaint] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    const navigation = useNavigation(); // Get the navigation object
    const loadTags = async () => {
        try {
            let res = await APIs.get(endpoints['tags']);
            setTags(res.data);
        } catch (ex){
            console.error(ex);
        }
    }

    const loadCreatComplaint = async () => {
        try{
            const payload = {
            title: title,
            content: content,
            statusTag: checkedStatus,
            complaintTag: checkedComplaint
        };

        console.log("Sending payload:", payload);
            accessToken = await AsyncStorage.getItem("access-token");
            let response = await authAPI(accessToken).post(endpoints["add_complaint"], {payload});   
            console.log(response.data);
            if (response.status === 201) {
                navigation.navigate('Complaint'); // Navigate to MainScreen
            }
        } catch(ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadTags();
    },[])

    const createComplaint = async () => {
        await loadCreatComplaint();
    }

    const StatusTags = tags.filter(t => t.id === 9 || t.id === 10);
    const ComplaintTags = tags.filter(t => t.id >= 3 && t.id <= 8 );

    return (
        <ScrollView>
            <View style={[Style.margin, Style.container]}>
                <View style={MyStyle.row}>
                    <Icon
                        source="pen"
                        color={'#937DC2'} 
                        size={28}
                    />    
                    <Text style={Style.titleComplaint}>
                        Tiêu đề bài viết
                    </Text>
                </View>
                <TextInput
                    style={Style.textInput}
                    value={title}
                    onChangeText={title => setTitle(title)}
                    multiline={true}
                />
            </View>

            <View style={[Style.margin, Style.container]}>
                <View style={MyStyle.row}>
                    <Icon
                        source="book-open-variant"
                        color={'#937DC2'} 
                        size={28}
                    />  
                     <Text style={[Style.titleComplaint]}>
                        Nội dung
                    </Text>
                </View>
                
                <TextInput
                    label=""
                    value={content}
                    onChangeText={content => setContent(content)}
                    multiline={true}
                    style={Style.textInput}
                />
            </View>

            <View style={[Style.margin, Style.container, MyStyle.row, Style.justifyContent]}>
                <View>
                    <Text style={[Style.titleComplaint, Style.titleTag]}>
                        Status tag
                    </Text>
                    {StatusTags.map(s => 
                        <View style={MyStyle.row}>
                            <Text style={Style.margin}>
                                {s.name} 
                            </Text>
                            <Checkbox
                                status={checkedStatus === s.id ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedStatus(checkedStatus === s.id ? null : s.id);
                                }}
                                color="purple"
                            />
                        </View>
                    )}
                </View>

                <View>
                    <Text style={[Style.titleComplaint, Style.titleTag]}>
                        Complaint tag
                    </Text>
                    {ComplaintTags.map(c => 
                        <View style={MyStyle.row}>
                            <Text style={Style.margin}>
                                {c.name} 
                            </Text>
                            <Checkbox
                                status={checkedComplaint ===c.id ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedComplaint(checkedComplaint === c.id ? null : c.id);
                                }}
                                color="purple"
                            />
                        </View>
                    )}      
                </View>
            </View>

            <View>
                <TouchableOpacity style={Style.buttonCreate} onPress={createComplaint}>
                    <Text style={Style.textCreate}>Create</Text>
                </TouchableOpacity>
                </View>
        </ScrollView>
    );
}

export default Complaint;