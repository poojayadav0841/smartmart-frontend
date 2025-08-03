
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/smartmart-frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/smartmart-frontend"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/home"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/admin"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/user"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/forbidden"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/signup"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/login"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/addNewProduct"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/showProductDetails"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/orderInformation"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/productViewDetails"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/buyProduct"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/orderComfirm"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/myOrders"
  },
  {
    "renderMode": 2,
    "route": "/smartmart-frontend/cart"
  },
  {
    "renderMode": 2,
    "redirectTo": "/smartmart-frontend",
    "route": "/smartmart-frontend/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 29040, hash: 'fdae301bf3d70e4ff4445da48aee2efcb35314da669e88deeec1bd0d6b7c3256', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 18205, hash: '458631a4c16423d5f632129692d1abbd13b4da172a2ce3dde9a89693440818f6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 85926, hash: 'be1dcc82ec90215c31df7a9132a803e57b71f720bd2bbe8dee5c68c2b7851277', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'index.html': {size: 85926, hash: 'be1dcc82ec90215c31df7a9132a803e57b71f720bd2bbe8dee5c68c2b7851277', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'forbidden/index.html': {size: 51178, hash: 'a4be49d8b86cebd74eed895e98875abe6b6fefb51f068dbde29854e74d2a95d8', text: () => import('./assets-chunks/forbidden_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 52783, hash: 'c4ff5cbe0ec857178ef1c2e6a4f02b2a4a8efe64b2824e18cd57e33787aa304b', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'showProductDetails/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/showProductDetails_index_html.mjs').then(m => m.default)},
    'orderInformation/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/orderInformation_index_html.mjs').then(m => m.default)},
    'addNewProduct/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/addNewProduct_index_html.mjs').then(m => m.default)},
    'user/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'orderComfirm/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/orderComfirm_index_html.mjs').then(m => m.default)},
    'buyProduct/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/buyProduct_index_html.mjs').then(m => m.default)},
    'myOrders/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/myOrders_index_html.mjs').then(m => m.default)},
    'productViewDetails/index.html': {size: 57835, hash: '1a41399d23df6f76f56831798fdf25e73d437efe0c7b7a945badd1aa731ebe4f', text: () => import('./assets-chunks/productViewDetails_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 53708, hash: 'bda260e22b0a42fa91e87334d8e5548be4983e2fe393155f0be61548628ecd6f', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'styles-K3CJTRBA.css': {size: 237851, hash: 'P/NlBOv6TvU', text: () => import('./assets-chunks/styles-K3CJTRBA_css.mjs').then(m => m.default)}
  },
};
