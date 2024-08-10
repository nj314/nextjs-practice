import { Book } from '../../../constants';

export const mockBook: Book = {
  id: '1',
  title: "The Hitchhiker's Guide to the Galaxy",
  author: 'Douglas Adams',
  coverUrl:
    'https://m.media-amazon.com/images/I/71lUEcoFNEL._AC_UF1000,1000_QL80_.jpg',
  contents: [
    {
      type: 'original',
      value:
        '<h2>Chapter 1</h2><p>This is the original ch 1</p><h2>Chapter 2</h2><p>This is the original ch 2</p>',
    },
    {
      type: 'chapter',
      value:
        '<h2>Chapter 1</h2><p>SUMMARY for ch 1</p><h2>Chapter 2</h2><p>SUMMARY for ch 2</p>',
    },
  ],
};
