import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';
import * as v from 'valibot';

export const BooksConfigSchema = v.object({
  apiUrl: v.pipe(v.string(), v.url())
});

export type BooksConfigValue = v.InferOutput<typeof BooksConfigSchema>;

/**
 * The books slice reads its own configuration from `config/books.json`.
 * The file is not part of the bundle, so it can be replaced after the build.
 */
@Service()
export class BooksConfig {
  readonly resource = httpResource<BooksConfigValue>(() => 'config/books.json', {
    parse: v.parser(BooksConfigSchema)
  });
}
