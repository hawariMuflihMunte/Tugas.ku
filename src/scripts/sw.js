import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    // Placeholder for demo purpose only
    ({url}) => url.href.startsWith('https://randommer.io/api/Name?nameType=fullname&quantity=1'),
    new StaleWhileRevalidate({
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        })]
    })
);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});
