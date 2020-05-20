const STATUS_BASIC = `basic`;
const STATUS_SUCCESS = 200;
const CACHE_PREFIX = `taskmanager-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const DATA = [
  `/`,
  `/index.html`,
  `/bundle.js`,
  `/css/normalize.css`,
  `/css/style.css`,
  `/fonts/HelveticaNeueCyr-Bold.woff`,
  `/fonts/HelveticaNeueCyr-Bold.woff2`,
  `/fonts/HelveticaNeueCyr-Medium.woff`,
  `/fonts/HelveticaNeueCyr-Medium.woff2`,
  `/fonts/HelveticaNeueCyr-Roman.woff`,
  `/fonts/HelveticaNeueCyr-Roman.woff2`,
  `/img/add-photo.svg`,
  `/img/close.svg`,
  `/img/sample-img.jpg`,
  `/img/wave.svg`,
];

const getData = (cache) => cache.addAll(DATA);

const onInstall = (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then(getData));
};

const getKey = (key) => {
  if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
    return caches.delete(key);
  }

  return null;
};

const getFilterKey = (key) => key !== null;

const getAllKeys = (keys) => {
  Promise.all(keys.map(getKey).filter(getFilterKey));
};

const onActivate = (evt) => {
  evt.waitUntil(caches.keys().then((keys) => getAllKeys(keys)));
};

const getRequest = (response, request) => {
  if (!response || response.status !== STATUS_SUCCESS || response.type !== STATUS_BASIC) {
    return response;
  }

  const clonedResponse = response.clone();

  caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, clonedResponse));

  return response;
};

const getCacheResponse = (cacheResponse, request) => {
  if (cacheResponse) {
    return cacheResponse;
  }

  return fetch(request)
    .then(getRequest);
};

const onFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(caches.match(request)
    .then((cacheResponse) => getCacheResponse(cacheResponse, request)));
};

self.addEventListener(`install`, onInstall);
self.addEventListener(`activate`, onActivate);
self.addEventListener(`fetch`, onFetch);
