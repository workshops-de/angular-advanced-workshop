// Prepared search helper. In the exercise you only *use* these functions - the
// point is the directive, not re-implementing string matching.
//
// The parameter type is a structural subset (not `Book`) on purpose: the `Book`
// shape changes a few times later in the workshop (typed interface -> valibot),
// and this helper stays stable regardless.
type SearchableBook = { title?: string; author?: string };

const SEARCHABLE_FIELDS = ['title', 'author'] as const;

/**
 * `true` when `term` (case-insensitive, trimmed) appears in the book's title
 * or author. An empty term matches every book.
 */
export function bookMatches(book: SearchableBook, searchTerm: string): boolean {
  const needle = searchTerm.trim().toLowerCase();

  if (!needle) {
    return true;
  }

  return SEARCHABLE_FIELDS.some(field => (book[field] ?? '').toLowerCase().includes(needle));
}
