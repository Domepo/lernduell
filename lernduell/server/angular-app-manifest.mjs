
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: new Map([
['index.csr.html', {size: 497, hash: 'b01393ceb085ad526adcecba96a27a1b01c89a77f8757b20b65cc7c9377a3239', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1010, hash: '9b4908e61fe129160c22b5b96d8b0d4bbefb8768cfc2e25c3de33fe18c364a35', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['index.html', {size: 20849, hash: 'ae2cc82ccafe8bb92da287a40876c235de9fc5736d7a115e6dbbcad5cbc82f97', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}], 
['styles-5INURTSO.css', {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
