// Shape of a book as served by the BookMonkey API. Mirrors the schema you
// validate later in the workshop; here it is just the type the prepared
// detail view binds against.
export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  abstract?: string;
  author?: string;
  publisher?: string;
  price?: number;
  currency: string;
  numPages?: number;
  cover?: string;
  userId?: number;
  publishedAt?: string | null;
  coAuthors?: string[];
  createdAt: string;
  updatedAt: string;
}
