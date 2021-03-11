export class Book {
  id: string;
  buying: boolean;
  volumeInfo: {
    authors: string[];
    averageRating?: number;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    pageCount: number;
    publisher: string;
    title: string;
  };
  constructor() {
    this.id = '';
    this.buying = false;
    this.volumeInfo = {
      authors: [''],
      averageRating: 0,
      description: '',
      imageLinks: {
        smallThumbnail: '',
        thumbnail: '',
      },
      language: '',
      pageCount: 0,
      publisher: '',
      title: '',
    };
  }
}
