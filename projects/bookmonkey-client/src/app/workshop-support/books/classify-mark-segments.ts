export type TextSegment = { text: string; shouldBeMarked: boolean };

/**
 * Splits `text` into consecutive segments and flags the ones that match `term`.
 * Lets a template render highlights without regular expressions.
 */
/**
 * Splits `text` into consecutive segments and flags the ones that match `term`.
 * Lets a template render highlights without regular expressions.
 */

export function classifyMarkSegments(text: string | undefined, term: string): TextSegment[] {
  const needle = term.trim().toLowerCase();

  if (!needle || !text) {
    return [{ text: text || '', shouldBeMarked: false }];
  }

  const segments: TextSegment[] = [];
  const haystack = text.toLowerCase();
  let start = 0;

  for (
    let index = haystack.indexOf(needle);
    index !== -1;
    index = haystack.indexOf(needle, start)
  ) {
    if (index > start) {
      segments.push({ text: text.slice(start, index), shouldBeMarked: false });
    }

    segments.push({ text: text.slice(index, index + needle.length), shouldBeMarked: true });
    start = index + needle.length;
  }

  if (start < text.length) {
    segments.push({ text: text.slice(start), shouldBeMarked: false });
  }

  return segments;
}
