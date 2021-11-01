import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"
export const fetchCartData = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          'https://react-http-4c2b3-default-rtdb.firebaseio.com/cart.json'
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch cart data!');
        }
  
        const data = await response.json();
  
        return data;
      };
  
      try {
        const cartData = await fetchData();
        dispatch(
          cartActions.replacecart({
              items:cartData.items || [],
              totalQuantity:cartData.totalQuantity
          })
        );
      } catch (error) {
        dispatch(
          uiActions.shownotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching cart data failed!',
          })
        );
      }
    };
  };