
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/game-homescreen"
  },
  {
    "renderMode": 2,
    "route": "/flashcard-homescreen"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  assets: {
    'index.csr.html': {size: 4917, hash: 'e14ce3bf8f7da5c2c89dbdd4a10f0cf0c6c21b3d2311f6fc8ffbfe7eab459320', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1016, hash: '8379bb13d94612aa13bf5da92ed74d8277bc1e26ee651a91c907691f333da1f9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14632, hash: '26ebde5f76c1219d9984c1d700affc87abd6a98b7898a8c41dbc6db68e36cecd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'game-homescreen/index.html': {size: 17919, hash: '8a834ee318d435831ec8803a3ccd7cccdef146a6428c02f9db53b11716407713', text: () => import('./assets-chunks/game-homescreen_index_html.mjs').then(m => m.default)},
    'flashcard-homescreen/index.html': {size: 15443, hash: 'e38a7179f5bd5ec0c82a2e4fd4ef8ec1bc07d72b9bc6567ebb36665c4917b26f', text: () => import('./assets-chunks/flashcard-homescreen_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
