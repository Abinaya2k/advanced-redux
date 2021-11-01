import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartslice=createSlice({
    name:'cart',
    initialState:{items:[],totalQuantity:0,changed:false},
    reducers:{
        replacecart(state,action){
          state.totalQuantity=action.payload.totalQuantity
          state.items=action.payload.items
        },
        addItemtoCart(state,action){
            const newItem=action.payload
            const exisitingItem=state.items.find(item=>item.id===newItem.id)
            state.totalQuantity++
            state.changed=true
            if(!exisitingItem){
                state.items.push({
                    id:newItem.id,
                    price: newItem.price,
                    quantity:1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }else{
                exisitingItem.quantity++;
                exisitingItem.totalPrice=exisitingItem.totalPrice + newItem.price
            }
        },
        removeItemfromCart(state,action){
            const id=action.payload
            const exisitngitem=state.items.find(item=>item.id===id)
            state.totalQuantity--
            state.changed=true
            if(exisitngitem.quantity===1){
                state.items=state.items.filter(item=>item.id!==id)

            }else{
                exisitngitem.quantity--
                exisitngitem.totalPrice=exisitngitem.totalPrice - exisitngitem.price
            }
        }
    }
})
export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.shownotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
  
      const sendRequest = async () => {
        const response = await fetch(
          'https://react-http-4c2b3-default-rtdb.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cart),
          }
        );
  
        if (!response.ok) {
          throw new Error('Sending cart data failed.');
        }
      };
  
      try {
        await sendRequest();
  
        dispatch(
          uiActions.shownotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!',
          })
        );
      } catch (error) {
        dispatch(
          uiActions.shownotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!',
          })
        );
      }
    };
  };
  

export const cartActions=cartslice.actions
export default cartslice
