import { useEffect, useReducer } from 'react';
import { getCustomerOrderDetail } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload,
        loading: false,
        error: '',
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: true,
  data: {
    Id: 0,
    PrintMode: false,
    PdfInvoiceDisabled: false,
    CustomOrderNumber: '',
    CreatedOn: '',
    OrderStatus: '',
    IsReOrderAllowed: true,
    IsReturnRequestAllowed: false,
    IsShippable: false,
    PickUpInStore: false,
    ShippingStatus: '',
    ShippingAddress: {
      FirstName: null,
      LastName: null,
      Email: null,
      CompanyEnabled: false,
      CompanyRequired: false,
      Company: null,
      CountryEnabled: false,
      CountryId: null,
      CountryName: null,
      StateProvinceEnabled: false,
      StateProvinceId: null,
      StateProvinceName: null,
      CityEnabled: false,
      CityRequired: false,
      City: null,
      StreetAddressEnabled: false,
      StreetAddressRequired: false,
      Address1: null,
      StreetAddress2Enabled: false,
      StreetAddress2Required: false,
      Address2: null,
      ZipPostalCodeEnabled: false,
      ZipPostalCodeRequired: false,
      ZipPostalCode: null,
      PhoneEnabled: false,
      PhoneRequired: false,
      PhoneNumber: null,
      FaxEnabled: false,
      FaxRequired: false,
      FaxNumber: null,
      AvailableCountries: [],
      AvailableStates: [],
      FormattedCustomAddressAttributes: null,
      CustomAddressAttributes: [],
      Id: 0,
      CustomProperties: {},
    },
    PickupAddress: {
      FirstName: null,
      LastName: null,
      Email: null,
      CompanyEnabled: false,
      CompanyRequired: false,
      Company: null,
      CountryEnabled: false,
      CountryId: null,
      CountryName: null,
      StateProvinceEnabled: false,
      StateProvinceId: null,
      StateProvinceName: null,
      CityEnabled: false,
      CityRequired: false,
      City: null,
      StreetAddressEnabled: false,
      StreetAddressRequired: false,
      Address1: null,
      StreetAddress2Enabled: false,
      StreetAddress2Required: false,
      Address2: null,
      ZipPostalCodeEnabled: false,
      ZipPostalCodeRequired: false,
      ZipPostalCode: null,
      PhoneEnabled: false,
      PhoneRequired: false,
      PhoneNumber: null,
      FaxEnabled: false,
      FaxRequired: false,
      FaxNumber: null,
      AvailableCountries: [],
      AvailableStates: [],
      FormattedCustomAddressAttributes: null,
      CustomAddressAttributes: [],
      Id: 0,
      CustomProperties: {},
    },
    ShippingMethod: null,
    Shipments: [],
    BillingAddress: {
      FirstName: '',
      LastName: '',
      Email: '',
      CompanyEnabled: false,
      CompanyRequired: false,
      Company: null,
      CountryEnabled: true,
      CountryId: 0,
      CountryName: '',
      StateProvinceEnabled: false,
      StateProvinceId: null,
      StateProvinceName: null,
      CityEnabled: false,
      CityRequired: true,
      City: '',
      StreetAddressEnabled: true,
      StreetAddressRequired: true,
      Address1: '',
      StreetAddress2Enabled: false,
      StreetAddress2Required: false,
      Address2: null,
      ZipPostalCodeEnabled: false,
      ZipPostalCodeRequired: true,
      ZipPostalCode: '',
      PhoneEnabled: true,
      PhoneRequired: true,
      PhoneNumber: '',
      FaxEnabled: false,
      FaxRequired: false,
      FaxNumber: null,
      AvailableCountries: [],
      AvailableStates: [],
      FormattedCustomAddressAttributes: '',
      CustomAddressAttributes: [],
      Id: 1074,
      CustomProperties: {},
    },
    VatNumber: null,
    PaymentMethod: '',
    PaymentMethodStatus: '',
    CanRePostProcessPayment: true,
    CustomValues: {},
    OrderSubtotal: '',
    OrderSubTotalDiscount: null,
    OrderShipping: '',
    PaymentMethodAdditionalFee: null,
    CheckoutAttributeInfo: '',
    PricesIncludeTax: false,
    DisplayTaxShippingInfo: false,
    Tax: '',
    TaxRates: [{ Rate: '', Value: '', CustomProperties: {} }],
    DisplayTax: true,
    DisplayTaxRates: false,
    OrderTotalDiscount: null,
    RedeemedRewardPoints: 0,
    RedeemedRewardPointsAmount: null,
    OrderTotal: '',
    GiftCards: [],
    ShowSku: true,
    Items: [
      {
        OrderItemGuid: '',
        Sku: '',
        ProductId: 0,
        ProductName: '',
        ProductSeName: '',
        UnitPrice: '',
        SubTotal: '',
        Quantity: 0,
        AttributeInfo: '',
        RentalInfo: null,
        Picture: {
          ImageUrl: '',
          FullSizeImageUrl: null,
          Title: null,
          AlternateText: null,
          CustomProperties: {},
        },
        DownloadId: 0,
        LicenseId: 0,
        Id: 0,
        CustomProperties: {},
      },
    ],
    OrderNotes: [],
    SuccessMessage: null,
    StatusCode: 200,
    ErrorList: [],
  },
  error: '',
};

const useCustomerOrderDetail = ({ Id }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCustomerOrderDetailApi = async () => {
    try {
      const data = await getCustomerOrderDetail({ Id });
      if (data.StatusCode === 200) {
        dispatch({ type: 'success', payload: data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'خطایی رخ داده است!' });
    }
  };

  useEffect(() => {
    getCustomerOrderDetailApi();
    return () => {};
  }, [Id]);

  return { loading, data, error };
};

export default useCustomerOrderDetail;
