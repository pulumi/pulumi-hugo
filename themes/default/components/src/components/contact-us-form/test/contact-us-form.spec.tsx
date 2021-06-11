import { newSpecPage } from '@stencil/core/testing';
import { ContactUsForm } from '../contact-us-form';

describe('contact-us-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContactUsForm],
      html: `<contact-us-form></contact-us-form>`,
    });
    expect(page.root).toEqualHtml(`
      <contact-us-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </contact-us-form>
    `);
  });
});
