// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  server: 'http://localhost:3000',
  api: {
    url: 'http://localhost:3000',
    socialMediaKeys: {
      facebook: {
        clientId: '131065570894352',
        secret: 'a74151d55bae152570b3a0e8874086db'
      },
      google: {
        clientId: '612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        secret: '6MaQVEA21221qQoi-yDrD5k8'
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
