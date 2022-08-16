import { createContext, useState, useEffect } from "react";
import axios from "axios";


const ItemsContext = createContext();

export const ItemsProvider = ({children}) =>{
    const [items, setItems] = useState([]);
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
        const defaultData = axios.get("/store");
        const storeData = axios.get("/store");
        axios.all([defaultData, storeData]).then(axios.spread((...responses) => {
            const DBList = responses[0].data;
            const webList = responses[1].data;
            setItems(DBList);
            setStoreItems(webList);
        })).catch(errors => {
                console.log(errors);
            })
    }, []);

    const value ={items, setItems, storeItems, setStoreItems}

    return(
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    )
}

export default ItemsContext;