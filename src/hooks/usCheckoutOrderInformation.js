import { useEffect, useReducer } from 'react';
import { getCheckoutOrderInformation } from '../services';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'success':
      return {
        ...state,
        data: payload,
        loading: false,
        error: '',
      };
    case 'loading':
      return {
        ...state,
        loading: true,
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
  loading: false,
  data: {
    IsEditable: true,
    SubTotal: '150,000 تومان',
    SubTotalDiscount: null,
    AllowRemovingSubTotalDiscount: false,
    Shipping: null,
    RequiresShipping: false,
    SelectedShippingMethod: null,
    HideShippingTotal: true,
    PaymentMethodAdditionalFee: null,
    Tax: ' تومان',
    TaxRates: [{ Rate: '0', Value: ' تومان', CustomProperties: {} }],
    DisplayTax: true,
    DisplayTaxRates: false,
    CheckOutAttributes: [],
    GiftCards: [],
    OrderTotalDiscount: null,
    AllowRemovingOrderTotalDiscount: false,
    RedeemedRewardPoints: 0,
    RedeemedRewardPointsAmount: null,
    WillEarnRewardPoints: 0,
    OrderTotal: '150,000 تومان',
    SuccessMessage: null,
    StatusCode: 200,
    ErrorList: [],
    OnePageCheckoutEnabled: false,
    ShowSku: false,
    ShowProductImages: false,
    Items: [
      {
        Sku: '6262003803758',
        Picture: {
          ImageUrl: 'https://www.MivSmart.com/images/thumbs/0034792_-_80.jpeg',
          FullSizeImageUrl: null,
          Title: 'نمایش جزئیات برای  نان تست پروتئین',
          AlternateText: 'تصویر  نان تست پروتئین',
          CustomProperties: {},
        },
        ProductId: 20602,
        ProductName: 'نان تست پروتئین',
        ProductSeName: 'نان-تست-پروتئین-2',
        UnitPrice: '150,000 تومان',
        SubTotal: '150,000 تومان',
        Discount: null,
        MaximumDiscountedQty: null,
        Quantity: 1,
        AllowedQuantities: [],
        AttributeInfo: '',
        RecurringInfo: null,
        RentalInfo: null,
        AllowItemEditing: false,
        DisableRemoval: false,
        Warnings: [],
        Id: 1534,
        CustomProperties: {},
      },
    ],
    CheckoutAttributeInfo: '',
    CheckoutAttributes: [],
    Warnings: [],
    OrderReviewData: {
      Display: true,
      BillingAddress: {
        FirstName: 'asdasd',
        LastName: 'asdasd',
        Email: 'kia@kia.com',
        CompanyEnabled: false,
        CompanyRequired: false,
        Company: 'ایران',
        CountryEnabled: true,
        CountryId: 103,
        CountryName: 'ایران',
        StateProvinceEnabled: false,
        StateProvinceId: null,
        StateProvinceName: null,
        CityEnabled: false,
        CityRequired: true,
        City: 'asd',
        StreetAddressEnabled: true,
        StreetAddressRequired: true,
        Address1: 'asdad',
        StreetAddress2Enabled: false,
        StreetAddress2Required: false,
        Address2: 'asdasd',
        ZipPostalCodeEnabled: false,
        ZipPostalCodeRequired: true,
        ZipPostalCode: '',
        PhoneEnabled: true,
        PhoneRequired: true,
        PhoneNumber: 'asd',
        FaxEnabled: false,
        FaxRequired: false,
        FaxNumber: '',
        AvailableCountries: [],
        AvailableStates: [],
        FormattedCustomAddressAttributes: '',
        CustomAddressAttributes: [],
        Id: 1119,
        CustomProperties: {},
      },
      IsShippable: false,
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
      SelectedPickUpInStore: false,
      ShippingMethod: null,
      PaymentMethod: 'درگاه پرداخت سامان',
      CustomValues: {},
      CustomProperties: {},
    },
    Count: 0,
    DiscountBox: {
      AppliedDiscountsWithCodes: [],
      Display: true,
      Messages: [],
      IsApplied: false,
      CustomProperties: {},
    },
    GiftCardBox: {
      Display: true,
      Message: null,
      IsApplied: false,
      CustomProperties: {},
    },
    TermsOfServiceOnShoppingCartPage: false,
    TermsOfServiceOnOrderConfirmPage: false,
    OrderTotalResponseModel: {
      IsEditable: false,
      SubTotal: null,
      SubTotalDiscount: null,
      AllowRemovingSubTotalDiscount: false,
      Shipping: null,
      RequiresShipping: false,
      SelectedShippingMethod: null,
      HideShippingTotal: false,
      PaymentMethodAdditionalFee: null,
      Tax: null,
      TaxRates: [],
      DisplayTax: false,
      DisplayTaxRates: false,
      CheckOutAttributes: [],
      GiftCards: [],
      OrderTotalDiscount: null,
      AllowRemovingOrderTotalDiscount: false,
      RedeemedRewardPoints: 0,
      RedeemedRewardPointsAmount: null,
      WillEarnRewardPoints: 0,
      OrderTotal: null,
      SuccessMessage: null,
      StatusCode: 200,
      ErrorList: [],
    },
  },
  error: '',
};

const useCheckoutOrderInformation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getCheckoutOrderInformationApi = async () => {
    try {
      const {
        OrderTotalModel,
        ShoppingCartModel,
        ErrorList,
        StatusCode,
        SuccessMessage,
      } = await getCheckoutOrderInformation();
      if (StatusCode === 200) {
        dispatch({
          type: 'success',
          payload: { ...OrderTotalModel, ...ShoppingCartModel },
        });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'درگاه بانکی ثبت نشده است!' });
    }
  };

  useEffect(() => {
    if (loading) {
      getCheckoutOrderInformationApi();
    }
  }, [loading]);

  return { loading, data, error, dispatch };
};

export default useCheckoutOrderInformation;
