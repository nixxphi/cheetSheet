// Example unit test using Jest

import jest from 'jest';
test('requestAid should return responses from all services', async () => {
    // Mock request data
    const request = { "fire" };

    // Call requestAid function
    const responses = await requestAid(request);

    // Assert responses
    expect(responses).toHaveLength(3);
});
