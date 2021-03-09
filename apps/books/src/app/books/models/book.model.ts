
export interface Book {
  id: string;
  buying: boolean;
  volumeInfo: {
    authors: string[];
    averageRating?: number;
    averageRatingPercentage?: number;
    description: string;
    imageLinks: {
      smallThumbnail: string
    },
    language: string;
    pageCount: number;
    publisher: string;
    title: string;
  };
}
