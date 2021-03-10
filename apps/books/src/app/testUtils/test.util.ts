
export const mockBook = {
  id: 'test',
  buying: true,
  volumeInfo: {
    authors: ['test'],
    description: 'my test description',
    imageLinks: {
      smallThumbnail: 'https://test.com',
      thumbnail: 'testthumb.com'
    },
    language: 'en',
    pageCount: 20,
    publisher: 'test publisher',
    title: 'test title'
  }
};

export const mockStoreInitialState = {
  books: {
    list: [],
    cartItems: [],
    selectedBook: {},
    collectionItems: [],
    searchKey: '',
    loaded: false,
    billingDetails: {}
  }
};

export const mockStoreInitialState2 = {
  books: {
    list: [],
    cartItems: [],
    selectedBook: mockBook,
    collectionItems: [],
    searchKey: '',
    loaded: false,
    billingDetails: {
      name: 'test name',
      email: 'test email',
      phoneNumber: 9999999899,
      address: 'testaddress'
    }
  }
};
