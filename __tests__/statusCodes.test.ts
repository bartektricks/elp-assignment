import http2 from 'node:http2';
import statusCodes from '~/utils/statusCodes.server';

describe('statusCodes', () => {
  it('should match the http2.constants object', () => {
    expect(statusCodes).toEqual(http2.constants);
  });
});
