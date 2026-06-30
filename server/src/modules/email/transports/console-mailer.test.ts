import { describe, expect, it } from 'vitest';

import { ConsoleMailer } from './console-mailer.js';

describe('ConsoleMailer', () => {
  it('resolves without sending anything', async () => {
    const mailer = new ConsoleMailer();

    await expect(
      mailer.send({ to: 'a@b.com', subject: 'Hi', html: '<p>Hi</p>', text: 'Hi' }),
    ).resolves.toBeUndefined();
  });
});
