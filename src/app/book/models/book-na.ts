import { Book } from './book';

export const bookNa: () => Book = () => {
  const na = 'n/a';

  return {
    abstract: na,
    author: na,
    cover: na,
    isbn: na,
    title: na,
    subtitle: na,
    numPages: 0,
    publisher: na
  };
};

export const mochBookNa = {
  abstract: 'n/a',
  author: 'n/a',
  cover: 'n/a',
  isbn: 'n/a',
  title: 'n/a',
  subtitle: 'n/a',
  numPages: 0,
  publisher: 'n/a'
};
