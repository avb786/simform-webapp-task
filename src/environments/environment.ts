// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authService: {
    protocol: 'http',
    domainUrl: 'localhost:3000',
    prefix: '/api/v1/usermgmt',
    register: '/register',
    login: '/login',
    uploadImage: '/upload/image',
    oAuthGoogle: '/oauth/google/signup',
    getUserByToken: '/get/user/token'
  },
  categoryService: {
    protocol: 'http',
    domainUrl: 'localhost:3000',
    prefix: '/api/v1/usermgmt',
    getCategoryByUserId: '/get/all/category/:userId',
    addCategory: '/create/category',
    updateCategory: '/update/category',
    deleteCategory: '/delete/category/:userId/:categoryId',
  },
  contentService: {
    protocol: 'http',
    domainUrl: 'localhost:3000',
    prefix: '/api/v1/usermgmt',
    getContent: '/get/content/:categoryId/:userId',
    addContent: '/create/content',
    searchContent: '/search/content?search=',
    filterContent: '/filter/content',
    updateContent: '/update/content'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
