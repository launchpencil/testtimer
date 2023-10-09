// Service Workerのインストール
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('timer-app-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js'
            ]);
        })
    );
});

// Service Workerのアクティブ化
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    // 古いキャッシュを削除する
                    return cacheName.startsWith('timer-app-') && cacheName !== 'timer-app-v1';
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// リクエストのフェッチ
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // キャッシュが存在する場合は、キャッシュを返す
            if (response) {
                return response;
            }
            // キャッシュが存在しない場合は、ネットワークからリクエストをフェッチ
            return fetch(event.request);
        })
    );
});
