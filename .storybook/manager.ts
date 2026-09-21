import { STORY_CHANGED } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const SITE_TITLE = 'Example UI';

addons.register('example/fixed-title', (api) => {
  document.title = SITE_TITLE;
  api.on(STORY_CHANGED, () => {
    document.title = SITE_TITLE;
  });
});

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: SITE_TITLE,
    fontBase:
      '"Pretendard", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  }),
});
