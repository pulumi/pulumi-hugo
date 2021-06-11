import { newE2EPage } from '@stencil/core/testing';

describe('contact-us-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<contact-us-form></contact-us-form>');

    const element = await page.find('contact-us-form');
    expect(element).toHaveClass('hydrated');
  });
});
