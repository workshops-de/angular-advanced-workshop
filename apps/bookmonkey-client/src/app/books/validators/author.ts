import { SchemaPath, validate } from '@angular/forms/signals';

export function validAuthorName(schemaPath: SchemaPath<string>): void {
  validate(schemaPath, field => {
    const authorName = field.value();

    if (!authorName) return null;

    const hasNumeric = /[0-9]+/.test(authorName);
    return hasNumeric ? { kind: 'invalidAuthor', message: 'Name must not contain digits' } : null;
  });
}
