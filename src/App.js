import { Fragment, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { sendCartData } from './store/cart-slice';
import Notification from './components/UI/Notificatio'
import {fetchCartData} from './store/cart-action'
let isInitial=true;
function App() {
  const dispatch = useDispatch()
  const isvisible=useSelector(state=>state.ui.cartIsVisible)
  const cart=useSelector(state=>state.cart)
  const notification=useSelector(state=>state.ui.notification)
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {isvisible && <Cart /> }
        <Products />
      </Layout>

    </Fragment>
    
  );
}

export default App;
