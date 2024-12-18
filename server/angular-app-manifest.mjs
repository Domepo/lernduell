
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/lernduell/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/lernduell"
  },
  {
    "renderMode": 2,
    "route": "/lernduell/game-homescreen"
  },
  {
    "renderMode": 2,
    "route": "/lernduell/flashcard-homescreen"
  },
  {
    "renderMode": 2,
    "redirectTo": "/lernduell",
    "route": "/lernduell/**"
  }
],
  assets: {
    'index.csr.html': {size: 4927, hash: 'be6b8d7e6e730a486d4b0f7e50031632d14dcbad91c629cd2db95bf1bebf3768', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1026, hash: 'e84885fbd3e17111ed003f821db8525feb0fe84d402b429592f9d6d76d5ed975', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14672, hash: '6f9585cbb1699e01c7893271efbced1076acc2fef6b34b9a489ddeeeff16158e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'game-homescreen/index.html': {size: 17959, hash: '35a501caa2588142b88f59458b665ee9c3568ea809311c00e1a0a1076d4b1dc2', text: () => import('./assets-chunks/game-homescreen_index_html.mjs').then(m => m.default)},
    'flashcard-homescreen/index.html': {size: 15483, hash: '444acd99ba4ab3d98e9c300dcea8a1415d3b321f61e67e534c10fc89179520c9', text: () => import('./assets-chunks/flashcard-homescreen_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
