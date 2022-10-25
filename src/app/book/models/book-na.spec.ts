import { map, of } from 'rxjs';
import { bookNa } from './book-na';

describe('BookNa', () => {
  it('should be na', () => {
    const bNa = bookNa();
    expect(bNa.title).toBe('n/a');
    // expectAsync(of(bNa).pipe(map(b => b.title))).toBeResolvedTo('n/a');
  });
});
