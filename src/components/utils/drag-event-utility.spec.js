import { getDragEvent } from './drag-event-utility';

describe('drag-event-utility', () => {
    it('should return the event it was called with', () => {
        const mockEvent = {stuff: 'things'};

        const result = getDragEvent(mockEvent);

        expect(result).toBe(mockEvent);
    });
});
