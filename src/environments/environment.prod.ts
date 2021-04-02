export const environment = {
  production: true,
  server: 'http://localhost:3000',
  api: {
    url: 'http://localhost:3000',
    socialMediaKeys: {
      facebook: {
        clientId: '131065570894352',
        secret: 'a74151d55bae152570b3a0e8874086db'
      },
      google: {
        clientId: '500143808314-9psv199snl4g7e6dargf6f8sog0023u1.apps.googleusercontent.com',
        secret: '8oJHj4r0tCWBxJ_wTFNBOtD2'
      },
      linkedin: {
        clientId: '7795dtgk291ni1',
        secret: 'oBU1OUVw42FB7MWt'
      }
    }
  },
  admin: {
    url: 'http://mock-server:3003/mock-responses/api/admin'
  },
  radius: {
    url: 'http://mock-server:3003/mock-responses/radius/login',
  }
};
