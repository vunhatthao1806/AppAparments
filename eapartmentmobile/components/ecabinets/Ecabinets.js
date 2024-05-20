import { useEffect, useState } from "react"
import { endpoints } from "../../configs/APIs";
import { List } from "react-native-paper";

const Ecabinets = () => {
    const [ecabinets, setEcabinets] = useState([]);
    
    const loadEcabinets = async () => {
        try {
            let res = await APIs.get(endpoints['ecabinets']);
            setEcabinets(res.data);
        } catch (ex) {
            console.error(ex);
        } 
    }

    useEffect(() => {
        loadEcabinets();
    }, []);

    return (
        <ScrollView>
           
            {ecabinets.map(c => 
                <List.Item
                    key = {c.id}
                    title={c.name}
                />
            )}
        </ScrollView>
    );
}

export default Ecabinets;