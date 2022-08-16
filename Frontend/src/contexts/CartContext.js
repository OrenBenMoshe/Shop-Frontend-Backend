import { createContext, useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    const [cartValue, setCartValue] = useState(null);
    const [temp, setTemp] = useState(0);

    const {user} = useContext(UserContext);

    // const getUpdatedCart = useCallback(()=>{
    //   axios
    //     .get("/cart", { params: { user: user } })
    //     .then((res) => setCart(res.data.cart))
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // },[user, temp]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
      const getUpdatedCart = async()=>{
        axios
        .get("/cart", { params: { user: user } })
        .then((res) => setCart(res.data.cart))
        .catch((error) => {
          console.log(error.message);
        });
      }
      getUpdatedCart();
    },[user, temp])

    const addToCart =(item)=> {
      axios.post("/cart", {item: item, user: user})
      .then(async(res)=>{
        const updatedCart = await res.data.cart;
        console.log("this is the cart after addToCart: ", updatedCart);
        setCart(updatedCart);
        setTemp(prevItems => prevItems + 1);
        console.log("temp value now: ", temp);
      }).catch(error => console.log(error));
    }


  const updateCart = (item, action)=>{
    axios.patch("/cart/id", {item: item, user: user, action: action})
    .then(async(res)=>{
      const updatedCart = await res.data.cart;
      setCart(updatedCart);
      setTemp(prevItems => prevItems + 1);
      console.log("temp value now: ", temp);
    }).catch(error => console.log(error));
  }


  const valueOfCart = ()=> {
    var temp = 0;
    if(cart.length === 0){
      setCartValue(temp)
      return;
    }
    cart.forEach((item) => {
      temp = temp + item.quantity;
    });
    setCartValue(temp);
  }

  const value ={cart, setCart, cartValue, setCartValue,  addToCart,
                  valueOfCart, updateCart};

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;