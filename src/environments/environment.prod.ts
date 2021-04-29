export const environment = {
  production: true,
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
