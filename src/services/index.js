import axiosInstance from './axiosInstance';

const getBanner = async () => {
  const { data } = await axiosInstance.get('homepagebanner');
  return data;
};

const getCategories = async () => {
  const { data } = await axiosInstance.get('categories');
  return data;
};

const getProductByCategory = async ({ Id, pageNumber = 1 }) => {
  const { data } = await axiosInstance.get(
    `category/${Id}?pagenumber=${pageNumber}`,
  );
  // console.log("Test:");
  // console.log(Id);
  return data;
};

const getHomeCategories = async () => {
  const { data } = await axiosInstance.get(
    'catalog/homepagecategorieswithproduct?thumbPictureSize=200',
  );
  return data;
};

const getCustomerInfo = async () => {
  const { data } = await axiosInstance.get(`customer/info`);
  // console.log(data);
  return data;
};

const updateCustomerInfo = async ({ user }) => {
  const { data } = await axiosInstance.post(`customer/info`, {
    FirstName: user.firstName,
    LastName: user.lastName,
    DateOfBirthDay: '',
    DateOfBirthMonth: '',
    DateOfBirthYear: '',
    Email: user.email,
    Phone: user.phone,
    Company: '',
    Newsletter: 'False',
    Gender: user.gender,
  });
  // console.log("data");
  // console.log(data);
  // console.log("User");
  // console.log(user);
  
  return data;
};

const getProductDetail = async ({ Id }) => {
  const { data } = await axiosInstance.get(`productdetails/${Id}`);
  return data;
};

const getCustomerOrders = async () => {
  const { data } = await axiosInstance.get(`order/customerorders`);

  return data;
};

const getCustomerOrderDetail = async ({ Id }) => {
  const { data } = await axiosInstance.get(`order/details/${Id}`);
  return data;
};

const searchProduct = async search => {
  const { data } = await axiosInstance.post(`catalog/search`, {
    q: `${search}`,
  });
  return data;
};

const getShoppingCart = async () => {
  const { data } = await axiosInstance.get(`ShoppingCart`);
  return data;
};

const addToCart = async ({ Id }) => {
  const { data } = await axiosInstance.post(`AddProductToCart/${Id}/1`, [
    { value: 2, key: 'product_attribute_1_5_1' },
    { value: 3, key: 'product_attribute_1_6_2' },
    { value: 6, key: 'product_attribute_1_3_3' },
    { value: 8, key: 'product_attribute_1_4_4' },
    { value: 10, key: 'product_attribute_1_8_5' },
    { value: 1, key: 'addtocart_' + Id + '.EnteredQuantity' },
  ]);
  return data;
};

const updateCartItem = async ({ ProductId, Count,CartItemId }) => {
  const { data } = await axiosInstance.post(`AddProductToCart/${ProductId}/1`, [
    { value: 2, key: 'product_attribute_1_5_1' },
    { value: 3, key: 'product_attribute_1_6_2' },
    { value: 6, key: 'product_attribute_1_3_3' },
    { value: 8, key: 'product_attribute_1_4_4' },
    { value: 10, key: 'product_attribute_1_8_5' },
    { value: Count, key: 'addtocart_' + ProductId + '.EnteredQuantity' },
    { value: CartItemId, key: 'addtocart_' + ProductId + '.UpdatedShoppingCartItemId' },
  ]);
  // console.log("test:");
  // console.log(CartItemId);
  // console.log(Count);
  // console.log(ProductId);

  return data;
};

const removeFromCart = async ({ Id }) => {
  const { data } = await axiosInstance.post(`ShoppingCart/UpdateCart`, [
    { value: 0, key: 'itemquantity1' },
    { value: Id, key: 'removefromcart' },
  ]);
  return data;
};

const getWishList = async () => {
  const { data } = await axiosInstance.get(`shoppingCart/wishlist`);
  return data;
};

const addToWishList = async ({ Id }) => {
  const { data } = await axiosInstance.post(`AddProductToCart/${Id}/2`, [
    { value: 2, key: 'product_attribute_1_5_1' },
    { value: 3, key: 'product_attribute_1_6_2' },
    { value: 6, key: 'product_attribute_1_3_3' },
    { value: 8, key: 'product_attribute_1_4_4' },
    { value: 10, key: 'product_attribute_1_8_5' },
    { value: 1, key: 'addtocart_' + Id + '.EnteredQuantity' },
  ]);

  return data;
};

const removeFromWisList = async ({ Id }) => {
  const { data } = await axiosInstance.post(`ShoppingCart/UpdateWishlist`, [
    { value: Id, key: 'removefromcart' },
  ]);
  return data;
};

const getAddresses = async () => {
  const { data } = await axiosInstance.get('customer/addresses');
  return data;
};

const addAddress = async ({ address }) => {
  // const { data } = await axiosInstance.post('customer/address/add', [
  //   { value: address.FirstName, key: 'Address.FirstName' },
  //   { value: address.LastName, key: 'Address.LastName' },
  //   { value: address.Email, key: 'Address.Email' },
  //   { value: 'ایران', key: 'Address.Company' },
  //   { value: '103', key: 'Address.CountryId' },
  //   { value: '', key: 'Address.StateProvinceId' },
  //   { value: address.City, key: 'Address.City' },
  //   { value: address.Address, key: 'Address.Address1' },
  //   { value: address.Address2, key: 'Address.Address2' },
  //   { value: '', key: 'Address.ZipPostalCode' },
  //   { value: address.PhoneNumber, key: 'Address.PhoneNumber' },
  //   { value: '', key: 'Address.FaxNumber' },
  // ]);
  // return data;
  const { data } = await axiosInstance.post('checkout/checkoutsaveadress/1', [
    { value: address.FirstName, key: 'BillingNewAddress.FirstName' },
    { value: address.LastName, key: 'BillingNewAddress.LastName' },
    { value: address.Email, key: 'BillingNewAddress.Email' },
    { value: 'ایران', key: 'BillingNewAddress.Company' },
    { value: '106', key: 'BillingNewAddress.CountryId' },
    { value: '888', key: 'BillingNewAddress.StateProvinceId' },
    { value: address.City, key: 'BillingNewAddress.City' },
    { value: address.Address, key: 'BillingNewAddress.Address1' },
    { value: address.Address2, key: 'BillingNewAddress.Address2' },
    { value: '', key: 'BillingNewAddress.ZipPostalCode' },
    { value: address.PhoneNumber, key: 'BillingNewAddress.PhoneNumber' },
    { value: '', key: 'BillingNewAddress.FaxNumber' },
  ]);
  return data;
};

const editAddress = async ({ address }) => {
  const { data } = await axiosInstance.post(
    `customer/address/edit/${address.Id}`,
    [
      { value: address.FirstName, key: 'Address.FirstName' },
      { value: address.LastName, key: 'Address.LastName' },
      { value: address.Email, key: 'Address.Email' },
      { value: 'ایران', key: 'Address.Company' },
      { value: '106', key: 'Address.CountryId' },
      { value: address.StateProvinceId, key: 'Address.StateProvinceId' },
      { value: address.City, key: 'Address.City' },
      { value: address.Address, key: 'Address.Address1' },
      { value: address.Address2, key: 'Address.Address2' },
      { value: '', key: 'Address.ZipPostalCode' },
      { value: address.PhoneNumber, key: 'Address.PhoneNumber' },
      { value: '', key: 'Address.FaxNumber' },
    ],
  );
  return data;
};

const deleteAddress = async ({ Id }) => {
  const { data } = await axiosInstance.get(`customer/address/remove/${Id}`);
  return data;
};
const getstatesbycountry = async ({ Id }) => {
  const { data } = await axiosInstance.get(`country/getstatesbycountryid/${Id}`);
  return data;
};
const getCheckoutBillingAddress = async () => {
  const { data } = await axiosInstance.get('checkout/billingform');
  return data;
};

const setCheckoutSaveAddressId = async ({ Id }) => {
  const { data } = await axiosInstance.post('checkout/checkoutsaveadressid/2', {
    value: Id,
  });
  return data;
};

const setCheckoutSaveAddress = async ({ address }) => {
  const { data } = await axiosInstance.post('checkout/checkoutsaveadress/1', [
    { value: address.FirstName, key: 'BillingNewAddress.FirstName' },
    { value: address.LastName, key: 'BillingNewAddress.LastName' },
    { value: address.Email, key: 'BillingNewAddress.Email' },
    { value: 'ایران', key: 'BillingNewAddress.Company' },
    { value: '106', key: 'BillingNewAddress.CountryId' },
    { value: address.StateProvinceId, key: 'BillingNewAddress.StateProvinceId' },
    { value: address.City, key: 'BillingNewAddress.City' },
    { value: address.Address, key: 'BillingNewAddress.Address1' },
    { value: address.Address2, key: 'BillingNewAddress.Address2' },
    { value: '', key: 'BillingNewAddress.ZipPostalCode' },
    { value: address.PhoneNumber, key: 'BillingNewAddress.PhoneNumber' },
    { value: '', key: 'BillingNewAddress.FaxNumber' },
  ]);
  return data;
};

const getCheckoutPaymentMethod = async () => {
  const { data } = await axiosInstance.get('checkout/checkoutgetpaymentmethod');
  return data;
};

const setCheckoutPaymentMethod = async ({ bank }) => {
  const { data } = await axiosInstance.post(
    'checkout/checkoutsavepaymentmethod',
    {
      value: bank,
    },
  );
  return data;
};

const getCheckoutOrderInformation = async () => {
  const { data } = await axiosInstance.get(
    'shoppingcart/checkoutorderinformation',
  );
  return data;
};

const checkoutComplete = async () => {
  const { data } = await axiosInstance.get('checkout/checkoutcomplete');
  return data;
};

const registerLogin = async ({ mobile }) => {
  const { data } = await axiosInstance.post('registerLogin', {
    Mobile: mobile,
  });
  // console.log(data);
  return data;
};

const confirmRegisterLogin = async ({ mobile, code }) => {
  const { data } = await axiosInstance.post('ConfirmRegisterLogin', {
    Mobile: mobile,
    Code: code,
  });
  return data;
};

const getCheckoutShippingAddress = async () => {
  const { data } = await axiosInstance.get(
    'checkout/checkoutgetshippingmethods',
  );
  return data;
};

const setCheckoutShippingAddressName = async ({
  Name,
  ShippingRateComputationMethodSystemName,
}) => {
  const { data } = await axiosInstance.post(
    'checkout/checkoutsetshippingmethod',
    {
      value: `${Name}___${ShippingRateComputationMethodSystemName}`,
    },
  );
  return data;
};
const getThemeSettings = async () => {
  const { data } = await axiosInstance.get('themesettings');
  return data;
};
export {
  getBanner,
  getCategories,
  getThemeSettings,
  getProductByCategory,
  getHomeCategories,
  getCustomerInfo,
  updateCustomerInfo,
  getProductDetail,
  getCustomerOrders,
  getCustomerOrderDetail,
  searchProduct,
  getShoppingCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  getWishList,
  addToWishList,
  removeFromWisList,
  getAddresses,
  addAddress,
  editAddress,
  deleteAddress,
  getstatesbycountry,
  getCheckoutBillingAddress,
  setCheckoutSaveAddressId,
  setCheckoutSaveAddress,
  getCheckoutPaymentMethod,
  setCheckoutPaymentMethod,
  getCheckoutOrderInformation,
  checkoutComplete,
  registerLogin,
  confirmRegisterLogin,
  getCheckoutShippingAddress,
  setCheckoutShippingAddressName,
};
