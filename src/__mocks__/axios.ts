const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: 'Demo',
          last: 'User',
        },
        picture: {
          thumbnail: '/img',
        },
        email: 'test@test.com',
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
