import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";
import Style from "../ecabinets/Style";
import { ActivityIndicator, List, SegmentedButtons } from "react-native-paper";
import { isCloseToBottom } from "../utils/Utils";

const Ecabinet = ({route}) => {
    const [ecabinet, setEcabinet] = useState(null); // Sửa thành null
    const [items, setItems] = useState([]);
    const ecabinetId = route.params?.ecabinetId;

    const loadEcabinet = async () => {
        try {
            console.info(ecabinetId);
            let res = await APIs.get(endpoints['ecabinets'](ecabinetId));
            setEcabinet(res.data);
            
        } catch (ex){
            console.error(ex);
        }
    }

    const loadItems = async () => {
        try {
            let res = await APIs.get(endpoints['items'](ecabinetId));
            setItems(Array.isArray(res.data) ? res.data : [])
        } catch (ex) {
            console.error(ex);
        }
    } 

    useEffect(() => {
        loadEcabinet();
    }, [ecabinetId]);

    const loadMoreInfo = ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
            loadItems();
        }
    };

    return (
        <View>
            <ScrollView onScroll={loadMoreInfo}>
                {ecabinet === null ? <ActivityIndicator />: 
                <View>
                    <List.Item
                            key={ecabinet.id}
                            title={ecabinet.name}
                        />
                </View>
                }
            </ScrollView>
        </View>

    );
}

export default Ecabinet;

// const renderContent = () => {
    //     switch (value) {
    //       case 'Ecabinet information':
    //         return (
    //             <View>
    //                 {ecabinet===null?<ActivityIndicator />:<>
    //                     <List.Item key={ecabinet.id}
    //                         title={ecabinet.name}
    //                         description={ecabinet.active}
    //                     />
    //                 </>}
    //             </View>
    //         );
    //       case 'Items':
    //         return <Text>Items Content</Text>;
    //       default:
    //         return null;
    //     }
    //   };
      

{/* <SafeAreaView style={Style.container}>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        buttons={[
                        {
                            value: 'Ecabinet information',
                            label: 'Ecabinet information'
                        },
                        {
                            value: 'Items',
                            label: 'Items'
                        }
                        ]}
                    />
                </SafeAreaView>
                <View style={Style.contentContainer}>
                    {renderContent()}
                </View> */}