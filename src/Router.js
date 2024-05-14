import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import PayTabItem from './components/PayTabItem';
import TabItem from './components/TabItem';
import Login from './pages/auth/login';
import LoginConfirm from './pages/auth/loginConfirm';
import Basket from './pages/basket';
import PayAddress from './pages/basket/payAddress';
import PayBank from './pages/basket/payBank';
import PayConfirm from './pages/basket/payConfirm';
import Paypal from './pages/basket/Paypal';
import PayShipping from './pages/basket/payShipping';
import PayTime from './pages/basket/payTime';
import Categories from './pages/categories';
import Products from './pages/categories/products';
import SubCategories from './pages/categories/subCategories';
import Home from './pages/home';
import Product from './pages/product';
import Profile from './pages/profile';
import Account from './pages/profile/account';
import AddAddress from './pages/profile/addAddress';
import Addresses from './pages/profile/addresses';
import ContactUs from './pages/profile/contactUs';
import EditAddress from './pages/profile/editAddress';
import Favorites from './pages/profile/favorites';
import OrderDetail from './pages/profile/orderDetail';
import Orders from './pages/profile/orders';
import Search from './pages/search';
import Splash from './pages/splash';
import { Colors } from './utility/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const PaymentTab = createMaterialTopTabNavigator();

function CategoriesStack() {
  return (
    <Stack.Navigator
      initialRouteName="categories"
      mode="card"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'categories'} component={Categories} />
      <Stack.Screen name={'subCategories'} component={SubCategories} />
      <Stack.Screen name={'products'} component={Products} />
    </Stack.Navigator>
  );
}

function Dashboard() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.o2market,
        inactiveTintColor: Colors.grayLight,
        style: {
          height: Platform.OS === 'android' ? 62 : 60,
        },
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <TabItem
              route={route}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },

        tabBarActiveTintColor: Colors.o2market,
        tabBarInactiveTintColor: Colors.grayLight,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 62 : 60,
        },
        tabBarShowLabel: false,
      })}
      initialRouteName={'home'}>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="basket" component={Basket} />
      <Tab.Screen name="categoriesStack" component={CategoriesStack} />
      <Tab.Screen name="home" component={Home} />
    </Tab.Navigator>
  );
}

function PaymentTabs() {
  return (
    <PaymentTab.Navigator
      initialRouteName="payAddress"
      tabBar={({ state, descriptors, navigation, position }) => (
        <PayTabItem
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          position={position}
        />
      )}
      screenOptions={{ swipeEnabled: false }}
      backBehavior="order">
      <PaymentTab.Screen name="payAddress" component={PayAddress} />
      <PaymentTab.Screen name="payShipping" component={PayShipping} />
      {/* <PaymentTab.Screen name="payTime" component={PayTime} /> */}
      <PaymentTab.Screen name="payBank" component={PayBank} />
      <PaymentTab.Screen name="payConfirm" component={PayConfirm} />
    </PaymentTab.Navigator>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'splash'}
        screenOptions={{ headerShown: false, presentation: 'card' }}>
        <Stack.Screen name={'splash'} component={Splash} />
        <Stack.Screen name={'login'} component={Login} />
        <Stack.Screen name={'loginConfirm'} component={LoginConfirm} />
        <Stack.Screen name={'dashboard'} component={Dashboard} />
        <Stack.Screen name={'product'} component={Product} />
        <Stack.Screen name={'contactUs'} component={ContactUs} />
        <Stack.Screen name={'account'} component={Account} />
        <Stack.Screen name={'addresses'} component={Addresses} />
        <Stack.Screen name={'addAddress'} component={AddAddress} />
        <Stack.Screen name={'editAddress'} component={EditAddress} />
        <Stack.Screen name={'favorite'} component={Favorites} />
        <Stack.Screen name={'orders'} component={Orders} />
        <Stack.Screen name={'orderDetail'} component={OrderDetail} />
        <Stack.Screen name={'payment'} component={PaymentTabs} />
        <Stack.Screen name={'paypal'} component={Paypal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
