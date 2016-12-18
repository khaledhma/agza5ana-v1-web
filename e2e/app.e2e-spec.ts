import { Agza5anaV1Page } from './app.po';

describe('agza5ana-v1 App', function() {
  let page: Agza5anaV1Page;

  beforeEach(() => {
    page = new Agza5anaV1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
