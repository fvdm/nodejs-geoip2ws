#### 1.8.7 (2016-8-22)

##### Documentation Changes

* **badges:**
  * Replaced bitHound score with code ([f2bda62f](https://github.com/fvdm/nodejs-geoip2ws/commit/f2bda62f09a70b366b198f7165e18c2f025c99c3))
  * Replaced Gemnasium with bitHound deps ([ea8d83b7](https://github.com/fvdm/nodejs-geoip2ws/commit/ea8d83b7998055356ce80609bf55c09d87e7fc82))
  * Added bitHound score ([356600cd](https://github.com/fvdm/nodejs-geoip2ws/commit/356600cd9c4363b36201aa7685ec15c988edccc1))
  * Reordered badges ([a3578a86](https://github.com/fvdm/nodejs-geoip2ws/commit/a3578a86b0df96c4b10bd23387a1bd59588100af))

#### 1.8.6 (2016-8-22)

##### Chores

* **package:**
  * Updated dev dependencies ([071eb290](https://github.com/fvdm/nodejs-geoip2ws/commit/071eb290033b19c1f3f3b7f8f0c658dd8bbb0423))
  * update coveralls to version 2.11.10 ([10aa17c5](https://github.com/fvdm/nodejs-geoip2ws/commit/10aa17c5d109fe87dd8a84bc9852f6f917e61e27))
  * update eslint to version 3.0.0 ([20590621](https://github.com/fvdm/nodejs-geoip2ws/commit/20590621c675912dc6adcdc3a59c2798019c951b))
  * Sort A-Z keywords ([1a046942](https://github.com/fvdm/nodejs-geoip2ws/commit/1a0469423ad20e3218820a0b584d92f5112e166b))

##### Refactors

* **package:** Changed minimum node v4.0 ([2f9b47f6](https://github.com/fvdm/nodejs-geoip2ws/commit/2f9b47f6457d3fb39603f725654d8e9853d5dd13))
* **setup:** Moved inline exports func to setup ([d9f3200b](https://github.com/fvdm/nodejs-geoip2ws/commit/d9f3200bc2dffa94d40fa5e2128ed9f754f3ff1c))
* **doLookup:** Cleaner request response action ([76e1e7ec](https://github.com/fvdm/nodejs-geoip2ws/commit/76e1e7ec7efaba01174efaa330d4da8e935bc48c))
* **doResponse:**
  * Removed res.body.trim ([d08ff142](https://github.com/fvdm/nodejs-geoip2ws/commit/d08ff14282dff4a5e6f16edde93e53c7194c1649))
  * Removed object check after JSON.parse ([71799677](https://github.com/fvdm/nodejs-geoip2ws/commit/717996771d7f61afd94c064a30881a539942ba20))
* **jsdoc:** Minor jsdoc fixes ([012c0528](https://github.com/fvdm/nodejs-geoip2ws/commit/012c052833fc3949a86c713e78c26623ac188a2f))

##### Tests

* **runner:** Log commits and cleanup ([21022831](https://github.com/fvdm/nodejs-geoip2ws/commit/21022831d01072d4fb8a4616304a20b53b2d588a))
* **lint:** Update eslint config to ES6 ([57044de2](https://github.com/fvdm/nodejs-geoip2ws/commit/57044de2761d0c06be9bfcaeaac6fbb56d3e4745))
* **config:**
  * Changed minimum node v4.0 ([bb2c6bdb](https://github.com/fvdm/nodejs-geoip2ws/commit/bb2c6bdb7bae067a8b2c03ed7cf39fb563f78b65))
  * Changed eslint operator-linebreak to before ([07a09ecf](https://github.com/fvdm/nodejs-geoip2ws/commit/07a09ecf6e769d36f2344350e93682f9213080d6))

#### 1.8.5 (2016-6-21)

##### Chores

* **package:**
  * Add test.sh runner ([a5de19cc](https://github.com/fvdm/nodejs-geoip2ws/commit/a5de19cc052d15fd79b48b38ef08f23b92d92c59))
  * Update dev dep versions ([a6d1ff2e](https://github.com/fvdm/nodejs-geoip2ws/commit/a6d1ff2e0a3cd280b0948ba06699ff6e0ef3d8d3))

##### Documentation Changes

* **badges:**
  * Add coverage status badge ([01922851](https://github.com/fvdm/nodejs-geoip2ws/commit/01922851fdb7b7f2fbd748a03f7d82a59f8c906d))
  * Deeplink Gemnasium to dependencies tab ([6e7e48bf](https://github.com/fvdm/nodejs-geoip2ws/commit/6e7e48bfb3ed102cc3b4e1ada5b71ff30f02a343))
  * Add npm version for changelog ([d702a7e5](https://github.com/fvdm/nodejs-geoip2ws/commit/d702a7e53fb7addd11b9893a0fa68c3f8696e362))

##### Bug Fixes

* **doLookup:** Fixed argument handling ([e51d6c30](https://github.com/fvdm/nodejs-geoip2ws/commit/e51d6c30ad48d5e31f4dc17ec4cf8c891bb2902c))

##### Other Changes

* **undefined:** added Tonic example ([4399d653](https://github.com/fvdm/nodejs-geoip2ws/commit/4399d653179f54842d6a909c5fbf03bb1df35351))

##### Refactors

* **jsdoc:** Minor JSdoc edits ([697b8975](https://github.com/fvdm/nodejs-geoip2ws/commit/697b8975b9753156bc0841730c4ce43d5cd34acd))
* **doLookup:** Minor performance tweak ([40f6db6d](https://github.com/fvdm/nodejs-geoip2ws/commit/40f6db6d32bd4c8abfd2efa252e16889bc0503d7))
* **cleanup:** Removed unused error var ([02cc1250](https://github.com/fvdm/nodejs-geoip2ws/commit/02cc1250f38a857c6686a3485abada3d175aa317))
* **errors:** Cleaner error callbacks ([9f5d9c82](https://github.com/fvdm/nodejs-geoip2ws/commit/9f5d9c82b6188e5b28db0c6bd4b53353cd133da9))

##### Tests

* **tests:**
  * Check return value with lookup ([90c7eb0f](https://github.com/fvdm/nodejs-geoip2ws/commit/90c7eb0f6db779599cb06b527f80282430949f07))
  * Add lookup data.subdivisions array test ([670be824](https://github.com/fvdm/nodejs-geoip2ws/commit/670be82459e31aa5e9a5ab6cae07815d6052e7e2))
  * Add setup with arguments test ([7c5faac8](https://github.com/fvdm/nodejs-geoip2ws/commit/7c5faac8bc150dd204bf098d223996366a4ffb77))
  * lookup check most_specific_subdivision ([d989e069](https://github.com/fvdm/nodejs-geoip2ws/commit/d989e069b5260b938b450ec13ece983ed54fcca7))
  * lookup check traits.ip_address ([a2169dcb](https://github.com/fvdm/nodejs-geoip2ws/commit/a2169dcb48ba5434364a517e1a5d0d24b6bac9cd))
  * exactly match data.city.named.en ([f17d8fae](https://github.com/fvdm/nodejs-geoip2ws/commit/f17d8faef17c4df9e9057418ee9764f897d70208))
  * Rename 'lookup' to 'lookup - arguments' ([163a3050](https://github.com/fvdm/nodejs-geoip2ws/commit/163a30503d0fd41f20bdcb1293d47fc55ec9e443))
  * Add lookup object test ([776b3497](https://github.com/fvdm/nodejs-geoip2ws/commit/776b3497ce51532a8c06db9694dd19d9b6fc2fb1))
  * Cleaner Error request timeout ([9267a8ec](https://github.com/fvdm/nodejs-geoip2ws/commit/9267a8ec49077aa746682ad1861e82f09d70b425))
  * check data is undefined for errors ([068ccdb2](https://github.com/fvdm/nodejs-geoip2ws/commit/068ccdb23833f4e387d22590d9a4666bdd86557d))
* **cleanup:** Extra whitespace between tests ([d1cb7a2d](https://github.com/fvdm/nodejs-geoip2ws/commit/d1cb7a2d3ab9be42412afed08380f59587bbda60))

