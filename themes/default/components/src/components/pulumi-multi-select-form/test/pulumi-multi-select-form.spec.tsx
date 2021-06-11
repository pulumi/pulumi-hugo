import { newSpecPage } from '@stencil/core/testing';
import { PulumiMultiSelectForm } from '../pulumi-multi-select-form';

describe('pulumi-multi-select-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PulumiMultiSelectForm],
      html: `<pulumi-multi-select-form></pulumi-multi-select-form>`,
    });
    expect(page.root).toEqualHtml(`
      <pulumi-multi-select-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pulumi-multi-select-form>
    `);
  });
});
