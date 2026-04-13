import { expect, Page } from '@playwright/test';

export class BooksPOM {
  // private pages = {
  //   search: { expectedVisibleElementId: 'search-button' }
  // };

  constructor(private readonly page: Page) {}

  async gotoPage(page: 'search' | 'new-book' | 'books') {
    this.page.goto('');

    await this.page.getByTestId(`sidenav-${page}`).click();
  }

  async search(query: string) {
    await this.page.getByRole('search').fill(query);
    await this.page.getByTestId('book-search-submit').click();
  }

  async clearSearch() {
    await this.page.getByRole('search').clear();
    await this.page.getByTestId('book-search-submit').click();
  }

  async ensureNoSearchResults() {
    await expect(this.page.getByTestId('search-no-results')).toBeVisible();
  }

  async ensureOneBook() {
    await expect(this.page.getByTestId('book-card').first()).toBeVisible();
  }
}
