// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyBminGPu-zeb7j5z2aZPVlR20ZMUqkWV1s",
      authDomain: "testproj-2089a.firebaseapp.com",
      databaseURL: "https://testproj-2089a.firebaseio.com",
      storageBucket: "testproj-2089a.appspot.com",
      projectId: "testproj-2089a",
  }
};
