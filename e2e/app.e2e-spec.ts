import { HouseKeeperProAngularPage } from './app.po';

describe('housekeeper-pro-angular App', () => {
  let page: HouseKeeperProAngularPage;

  beforeEach(() => {
    page = new HouseKeeperProAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
