
export interface Book {
  id: string;
  buying: boolean;
  volumeInfo: {
    authors: string[];
    averageRating?: number;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    },
    language: string;
    pageCount: number;
    publisher: string;
    title: string;
  };
}
