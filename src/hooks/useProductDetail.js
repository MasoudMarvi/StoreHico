import { useReducer, useEffect } from 'react';
import { getProductDetail } from '../services';

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
    DefaultPictureZoomEnabled: false,
    DefaultPictureModel: {
      ImageUrl: '',
      FullSizeImageUrl: '',
      Title: null,
      AlternateText: null,
      CustomProperties: {},
    },
    PictureModels: [
      {
        ImageUrl: '',
        FullSizeImageUrl: '',
        Title: null,
        AlternateText: null,
        CustomProperties: {},
      },
    ],
    Name: '',
    ShortDescription: '',
    FullDescription: '',
    ShowManufacturerPartNumber: false,
    ManufacturerPartNumber: null,
    ShowVendor: false,
    VendorModel: {
      Name: null,
      SeName: null,
      Id: 0,
      CustomProperties: {},
    },
    HasSampleDownload: false,
    GiftCard: {
      IsGiftCard: false,
      RecipientName: null,
      RecipientEmail: null,
      SenderName: null,
      SenderEmail: null,
      Message: null,
      GiftCardType: 0,
      CustomProperties: {},
    },
    IsShipEnabled: false,
    IsFreeShipping: false,
    FreeShippingNotificationEnabled: true,
    DeliveryDate: null,
    Url: '',
    IsRental: false,
    RentalStartDate: null,
    RentalEndDate: null,
    StockAvailability: '',
    DisplayBackInStockSubscription: false,
    EmailAFriendEnabled: true,
    CompareProductsEnabled: false,
    ProductPrice: {
      CurrencyCode: '',
      OldPrice: null,
      Price: '',
      PriceWithDiscount: null,
      PriceValue: 0,
      PriceWithDiscountValue: 0,
      CustomerEntersPrice: false,
      CallForPrice: false,
      ProductId: 0,
      HidePrices: false,
      IsRental: false,
      RentalPrice: null,
      DisplayTaxShippingInfo: false,
      BasePricePAngV: null,
      CustomProperties: {},
    },
    Quantity: {
      OrderMinimumQuantity: 0,
      OrderMaximumQuantity: 0,
      StockQuantity: 0,
    },
    AddToCart: {
      ProductId: 0,
      EnteredQuantity: 0,
      CustomerEntersPrice: false,
      CustomerEnteredPrice: 0.0,
      CustomerEnteredPriceRange: null,
      DisableBuyButton: false,
      DisableWishlistButton: false,
      AllowedQuantities: [],
      IsRental: false,
      AvailableForPreOrder: false,
      PreOrderAvailabilityStartDateTimeUtc: null,
      UpdatedShoppingCartItemId: 0,
    },
    Breadcrumb: {
      Enabled: true,
      ProductId: 0,
      ProductName: '',
      ProductSeName: '',
      CategoryBreadcrumb: [
        {
          Name: '',
          SeName: null,
          NumberOfProducts: null,
          IncludeInTopMenu: true,
          SubCategories: [],
          Id: 0,
          CustomProperties: {},
        },
        {
          Name: '',
          SeName: null,
          NumberOfProducts: null,
          IncludeInTopMenu: true,
          SubCategories: [],
          Id: 0,
          CustomProperties: {},
        },
      ],
      CustomProperties: {},
    },
    ProductTags: [],
    ProductAttributes: [],
    ProductSpecifications: [],
    ProductManufacturers: [
      {
        Name: '',
        Description: null,
        PictureModel: {
          ImageUrl: null,
          ThumbImageUrl: null,
          FullSizeImageUrl: null,
          Title: null,
          AlternateText: null,
          CustomProperties: {},
        },
      },
    ],
    ProductReviewOverview: {
      ProductId: 0,
      RatingSum: 0,
      AllowCustomerReviews: false,
      TotalReviews: 0,
    },
    TierPrices: [],
    AssociatedProducts: [],
    NextProduct: 0,
    PreviousProduct: 0,
    Id: 0,
    CustomProperties: {},
  },
  error: '',
};

const useProductDetail = ({ Id }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, data, error } = state;

  const getProductDetailApi = async ({ Id }) => {
    try {
      const {
        Data,
        SuccessMessage,
        StatusCode,
        ErrorList,
      } = await getProductDetail({ Id });
      if (StatusCode === 200) {
        dispatch({ type: 'success', payload: Data });
      } else {
        dispatch({ type: 'error', payload: 'خطایی رخ داده است' });
      }
    } catch (exception) {
      dispatch({ type: 'error', payload: 'محصول مورد نظر یافت نشد!' });
    }
  };

  useEffect(() => {
    getProductDetailApi({ Id });
  }, []);

  return { loading, data, error };
};

export default useProductDetail;
