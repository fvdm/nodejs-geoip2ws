#### 2.0.1 (2021-08-31)

##### Bug Fixes

*  Bad ref default timeout setting ([693f6767](https://github.com/fvdm/nodejs-geoip2ws/commit/693f6767cade3911da59a632b4649e2c947e9c56))

##### Refactors

*  httpreq now supports promises ([3aebac4b](https://github.com/fvdm/nodejs-geoip2ws/commit/3aebac4b314c2ba041a696f1c7e254f262585b45))

##### Tests

* **config:**  Run Github action every week ([8e97c756](https://github.com/fvdm/nodejs-geoip2ws/commit/8e97c75683390ab483a5ee7a69e632213e04c32e))

## 2.0.0 (2021-07-30)

##### Breaking Changes

*  Removed legacy interface ([#48](https://github.com/fvdm/nodejs-geoip2ws/pull/48)) ([3ea8d249](https://github.com/fvdm/nodejs-geoip2ws/commit/3ea8d249dcea53c7ecac94de3c94539d24f275ed))

##### Documentation Changes

* **fix:**  Fixed bad merge ([ade5780c](https://github.com/fvdm/nodejs-geoip2ws/commit/ade5780c8786497133f636431ac9e4fdedf045ec))
*  Update links ([1c6852a6](https://github.com/fvdm/nodejs-geoip2ws/commit/1c6852a656ac764bc9ac6c378e83daddad6c51c6))

##### Tests

* **config:**
  *  Only run PR CI on develop branch ([384e56f5](https://github.com/fvdm/nodejs-geoip2ws/commit/384e56f51bfb84c033795b7d8fa77d75bed67543))
  *  Added Coveralls to CI, minor edits ([06e3e3d5](https://github.com/fvdm/nodejs-geoip2ws/commit/06e3e3d5afc62ab64be612b30dca110387fd9ebc))

#### 1.10.5 (2021-06-23)

##### Chores

* **example:**  More useful demo ([0ce24fe2](https://github.com/fvdm/nodejs-geoip2ws/commit/0ce24fe2a0b8e36caebb17d8aeccf74e81f68f9c))

#### 1.10.4 (2021-06-23)

##### Chores

* **package:**
  *  Minor edits, minimum node v12 ([2154a0a8](https://github.com/fvdm/nodejs-geoip2ws/commit/2154a0a83225c1528f4230c66cc2abb32cff70c5))
  *  package-lock.json in gitignore ([6e826d7d](https://github.com/fvdm/nodejs-geoip2ws/commit/6e826d7d9a64d9ddb05d08070652325aac03b6c3))
* **deps:**  Bump httpreq from 0.4.24 to 0.5.1 ([db351f66](https://github.com/fvdm/nodejs-geoip2ws/commit/db351f6692282379e1f1fc9a932a95e0067762c6))
* **github:**
  *  Bump actions/setup-node from 1 to 2.1.5 ([14611043](https://github.com/fvdm/nodejs-geoip2ws/commit/14611043d6ed7b42b16d614b8275f7d88abc0c14))
  *  Bump actions/checkout from 2 to 2.3.4 ([a2ae1b3f](https://github.com/fvdm/nodejs-geoip2ws/commit/a2ae1b3f618308e420ab65b37b8707f0a5a0f3e9))
  *  Bump actions/setup-node from 2 to 2.1.5 ([99b20ab8](https://github.com/fvdm/nodejs-geoip2ws/commit/99b20ab840f2cd103dbf635206a806d96646f83f))
  *  Funding updated ([88f28efa](https://github.com/fvdm/nodejs-geoip2ws/commit/88f28efab6c2357ddc0398bf081e63e3e1d8f8ed))
*  Shorter author name ([b3dda6ef](https://github.com/fvdm/nodejs-geoip2ws/commit/b3dda6efefd1c00f2a5070f9af9602ca369f369d))
*  Replaced Travis CI with Github actions ([7c089cfd](https://github.com/fvdm/nodejs-geoip2ws/commit/7c089cfdec02b5781a36047ca6700ca7499ea1ec))
* **dev:**  Update editorconfig for json files ([ba54a5d8](https://github.com/fvdm/nodejs-geoip2ws/commit/ba54a5d874edf794bd364f62b81b1e8c467b572f))

##### Documentation Changes

* **readme:**
  *  Clean up tables ([dfad81c7](https://github.com/fvdm/nodejs-geoip2ws/commit/dfad81c7ea28e024631a9c093d912b7ad44f2253))
  *  Improved legacy usage warning ([088f154e](https://github.com/fvdm/nodejs-geoip2ws/commit/088f154ea64f3fcc7cf283da4ccf682954dd419c))
  *  Warn about legacy usage, minor edits ([8be0e2ff](https://github.com/fvdm/nodejs-geoip2ws/commit/8be0e2ff5f4adbcf737a454d0700f043f9f555e7))

##### Bug Fixes

* **doLookup:**  Prefix endpoint if no protocol ([2e3fd681](https://github.com/fvdm/nodejs-geoip2ws/commit/2e3fd681b66897213a2eb5b1367934fd1768113a))
*  Endpoint logic ([5848403c](https://github.com/fvdm/nodejs-geoip2ws/commit/5848403cb90bff5a9623afd944e318e25557d6b8))
*  doLookup() endpoint logic ([4763ec1a](https://github.com/fvdm/nodejs-geoip2ws/commit/4763ec1a39341b33844ae80ec66fb86e3c3cdbe3))

##### Other Changes

*  Bump actions/setup-node from v1 to v2.1.5 ([9e2b3e12](https://github.com/fvdm/nodejs-geoip2ws/commit/9e2b3e12d062997c8f5ab50efcc11b8093473dc7))

##### Refactors

* **package:**  Minimum node v10 ([5a2ef214](https://github.com/fvdm/nodejs-geoip2ws/commit/5a2ef2144598d954c4f97994b89afaf20571bad4))

##### Code Style Changes

*  Whitespace edits and legacy comments ([6c5384a8](https://github.com/fvdm/nodejs-geoip2ws/commit/6c5384a8de874e98196a047a231c91f758bfa92f))
*  Updated author line ([005b13d5](https://github.com/fvdm/nodejs-geoip2ws/commit/005b13d522d00869dd334aa2e73b262bccc17826))
*  Minor clean up ([f42fc660](https://github.com/fvdm/nodejs-geoip2ws/commit/f42fc660a79ade7c0712fbd7bf6b6e2736d42920))
*  Minor clean up ([9dd8ef1c](https://github.com/fvdm/nodejs-geoip2ws/commit/9dd8ef1c71a775596c8f7716d357eae33edf7384))
* **lint:**  Fixed lint error ([b4eeddba](https://github.com/fvdm/nodejs-geoip2ws/commit/b4eeddba1e2b367b923ff69590c18d6e8d252f2c))

##### Tests

* **config:**
  *  ESLint allow block padding ([ab2868ec](https://github.com/fvdm/nodejs-geoip2ws/commit/ab2868ec83839f2ef30e3a87b9fc365607aa37cc))
  *  Modernized ESLint config ([cc6ff2eb](https://github.com/fvdm/nodejs-geoip2ws/commit/cc6ff2ebf960bca437c2929adc66a4108e28c86f))
  *  Node CI action fixes, env vars ([f1535a9c](https://github.com/fvdm/nodejs-geoip2ws/commit/f1535a9c58d480e2b9158b984e8ed00bf3d515b7))
  *  Update Travis node versions and env ([b972391c](https://github.com/fvdm/nodejs-geoip2ws/commit/b972391c9708bb2571b15722e031bdbca12f6975))
*  Fixed data checks ([cd83dd55](https://github.com/fvdm/nodejs-geoip2ws/commit/cd83dd55bc9194685aafdd9f4a8b3ebdafb9e07b))
*  Clean up CodeQL action ([2085ba44](https://github.com/fvdm/nodejs-geoip2ws/commit/2085ba44e11519652e99d7fe30b1e964a8297108))
*  Github CodeQL action ([a2362a2b](https://github.com/fvdm/nodejs-geoip2ws/commit/a2362a2b253753f17ca31355e2d15c1a0b273b79))
*  Added Github CI workflow ([7bce5432](https://github.com/fvdm/nodejs-geoip2ws/commit/7bce5432edd6eb9ea0c644229cb0588786247bd9))
*  Added Github CI workflow ([b3fc4b1b](https://github.com/fvdm/nodejs-geoip2ws/commit/b3fc4b1bc484a6bb0472cf6edc275fdc34b43b24))
* **github:**
  *  Renamed CI action to Build ([0fef4b27](https://github.com/fvdm/nodejs-geoip2ws/commit/0fef4b27c09eec5a393daecf99c8c46cc151bd64))
  *  Replaced node v15 by v16 ([2d5c6994](https://github.com/fvdm/nodejs-geoip2ws/commit/2d5c69941e445daa38b8f5a2e87c96e9fef54502))

#### 1.10.3 (2019-07-10)

##### Bug Fixes

*  data.most_specific_subdivision was removed ([57eadffe](https://github.com/fvdm/nodejs-geoip2ws/commit/57eadffe8d6b3da9968556e1307f5dd5742e5c33))

#### 1.10.2 (2019-07-10)

##### Chores

* **dev:**
  *  Added package-lock.json ([9997f00e](https://github.com/fvdm/nodejs-geoip2ws/commit/9997f00e7ebc4337a0572785d2c9e91c58cb73f4))
  *  Removed package-lock from gitignore ([ae55d78e](https://github.com/fvdm/nodejs-geoip2ws/commit/ae55d78e231ef5f1fa45637b42a0a671d2844561))

##### Refactors

*  Always set confidence where expected ([07ed10f2](https://github.com/fvdm/nodejs-geoip2ws/commit/07ed10f2624f417baa1bd44f20940dc80c2ce774))

##### Code Style Changes

*  Reduced doResponse() complexity ([fe122826](https://github.com/fvdm/nodejs-geoip2ws/commit/fe12282621767481bc05d1c6f69ba49cf0365768))

#### 1.10.1 (2019-06-10)

##### Chores

* **package:**
  *  Update dotest dev dep ([1a96d45d](https://github.com/fvdm/nodejs-geoip2ws/commit/1a96d45d83dab823cdb1f170e06096435e8f062c))
  *  Update minimal node version ([7f8d33ea](https://github.com/fvdm/nodejs-geoip2ws/commit/7f8d33eac69a28a811932a94a04a49143988cc49))
  *  Update dev dependencies ([0f8a4074](https://github.com/fvdm/nodejs-geoip2ws/commit/0f8a4074bdd0e43f76bacb5585c3065aedb761bf))

##### Documentation Changes

*  Minor text fix ([68f3fd72](https://github.com/fvdm/nodejs-geoip2ws/commit/68f3fd729a25d1204561a5a78dc2b2f46e822d03))
*  Describe endpoint param, examples, cleanup ([1fd346fd](https://github.com/fvdm/nodejs-geoip2ws/commit/1fd346fd6394281328804f4f9c442b6c04bd22f5))

##### Bug Fixes

*  doLookup() service config ([f45acad8](https://github.com/fvdm/nodejs-geoip2ws/commit/f45acad8b9cfe36edf3dbf50ab46d6f21ea2fd11))

##### Refactors

*  Endpoint handling, cleaner promises ([62433b8c](https://github.com/fvdm/nodejs-geoip2ws/commit/62433b8c7b84fbc2abc5eb73674cf9d7917b0bfb))

##### Tests

* **config:**
  *  Update Travis node versions ([92b72260](https://github.com/fvdm/nodejs-geoip2ws/commit/92b72260cdb01f71b35e3e3a98118f9c1af7e9ec))
  *  Update ES version to 2017 ([b2e0d1d9](https://github.com/fvdm/nodejs-geoip2ws/commit/b2e0d1d9613b6588d3c1a917c67ceadec10c0831))
*  Fixed endpoint coverage ([5d0ef298](https://github.com/fvdm/nodejs-geoip2ws/commit/5d0ef298eff1e931b99764d38593221d605d3886))
*  Fixed Promise.reject test ([52c52393](https://github.com/fvdm/nodejs-geoip2ws/commit/52c52393cd099f1e579633234c971ef08dbb2e93))
*  More strict env config ([d83e0399](https://github.com/fvdm/nodejs-geoip2ws/commit/d83e039931a574b20de358d507d2fd639fb3e078))
*  Endpoint coverage ([6c71ed33](https://github.com/fvdm/nodejs-geoip2ws/commit/6c71ed33353f5846eeb788e162b44999267bd469))
*  Cleaner config in lookup test ([990c589c](https://github.com/fvdm/nodejs-geoip2ws/commit/990c589cae8d4919fc9da7e6700f492581f4a28e))
*  Cover inline config ([0753e3e5](https://github.com/fvdm/nodejs-geoip2ws/commit/0753e3e55c873b556148aeb1bdc7ae530671a53d))

### 1.10.0 (2019-05-10)

##### Chores

*  Clean up unused code ([5344f215](https://github.com/fvdm/nodejs-geoip2ws/commit/5344f2155a4281fa69a568d1a4e0949a99237ecc))
*  Lighter eslint on example.js ([385f7410](https://github.com/fvdm/nodejs-geoip2ws/commit/385f7410c8b13e03a88c8bad10caf7f0a84f7a9c))

##### Documentation Changes

* **readme:**
  *  Update links ([540e807b](https://github.com/fvdm/nodejs-geoip2ws/commit/540e807be11ee385d53868442df4e7f5a2519cfd))
  *  userId is a string ([#35](https://github.com/fvdm/nodejs-geoip2ws/pull/35)) ([15ef2bac](https://github.com/fvdm/nodejs-geoip2ws/commit/15ef2bacb03bb236d319a1b8cf5200d50da314ee))

##### New Features

*  Accept config in doLookup [#36](https://github.com/fvdm/nodejs-geoip2ws/pull/36) ([5942e363](https://github.com/fvdm/nodejs-geoip2ws/commit/5942e363ef9d3d9d3e1548aa00cb5a942f1bf9c9))

##### Bug Fixes

* **doLookup:**  Missing isService() ([fecb6226](https://github.com/fvdm/nodejs-geoip2ws/commit/fecb6226994aa5d035bbfa1dfecb00a0206b7a73))

##### Other Changes

*  most_specific_subdivision is sometimes missing ([06df33f9](https://github.com/fvdm/nodejs-geoip2ws/commit/06df33f936cf54fbc5ae38136b88d031e9ac23eb))

##### Refactors

* **errors:**  Removed doError ([1d6e3a33](https://github.com/fvdm/nodejs-geoip2ws/commit/1d6e3a3314962cbd8071e85e5a6fdaeea0d0b7d8))
*  Cleaner error reporting ([4e8833c9](https://github.com/fvdm/nodejs-geoip2ws/commit/4e8833c90b71098bcd1aa0679777beb93b106f75))

##### Code Style Changes

* **lint:**  Cleaner syntax ([002bb173](https://github.com/fvdm/nodejs-geoip2ws/commit/002bb173ac15215d3b0eb866d19e519c7f9da33a))
* **link:**  Allow cleaner blocks ([22fed563](https://github.com/fvdm/nodejs-geoip2ws/commit/22fed56338234ba376828724c72a181cb81a5690))

##### Tests

* **main:**
  *  Fixed old error checks ([dc6b6b89](https://github.com/fvdm/nodejs-geoip2ws/commit/dc6b6b89cd620256e8c74bd9d40c26c0a85a5564))
  *  Fixed fake data endpoint ([4e169a8a](https://github.com/fvdm/nodejs-geoip2ws/commit/4e169a8ab44ecde4f0cac251d01fdbfda8123c29))
*  Updated test IP ([475ae142](https://github.com/fvdm/nodejs-geoip2ws/commit/475ae142b718a2f9fc004ffd3a1baa5e2e4b8246))

#### 1.9.1 (2018-11-11)

##### Chores

* **dev:**  Added editorconfig ([52e09a7e](https://github.com/fvdm/nodejs-geoip2ws/commit/52e09a7e3f07282c29a69dda6a0b0b3ca1cbb653))

##### Refactors

* **main:**  Removed es6-promisify dependency ([4db03d94](https://github.com/fvdm/nodejs-geoip2ws/commit/4db03d940209ae3931460db879e6d8170bc897dd))

##### Code Style Changes

* **syntax:**  Consistent comma-dangle ([db0635f2](https://github.com/fvdm/nodejs-geoip2ws/commit/db0635f2880e5bb2fa60a24c6d7bc1a68f3b5dd3))
* **eslint:**
  *  Require braces no matter what ([5cfc6a39](https://github.com/fvdm/nodejs-geoip2ws/commit/5cfc6a3984bedd8fe0e56f2de69cfe16bcb0b9f5))
  *  Allow cleaner syntax ([5a211708](https://github.com/fvdm/nodejs-geoip2ws/commit/5a211708c2dd0ca58e10d81a5158a551cdcb45c3))

### 1.9.0 (2018-10-17)

##### Documentation Changes

* **badges:**  Add Greenkeeper badge 🌴 ([#31](https://github.com/fvdm/nodejs-geoip2ws/pull/31)) ([2ac9755c](https://github.com/fvdm/nodejs-geoip2ws/commit/2ac9755ceba565f59909ee9ca20da32efabdb5d5))

##### New Features

* **interface:**  Add support for promises ([#32](https://github.com/fvdm/nodejs-geoip2ws/pull/32)) ([210d4699](https://github.com/fvdm/nodejs-geoip2ws/commit/210d4699c3d25c5f61e2d964acea3911d0624034))

##### Code Style Changes

* **comment:**  Clean up JSDoc ([b92c3193](https://github.com/fvdm/nodejs-geoip2ws/commit/b92c3193608f0b23042e6fb54671623d73586bac))

#### 1.8.10 (2017-12-12)

##### Chores

* **example:** Minor cleanup ([a0ffca23](https://github.com/fvdm/nodejs-geoip2ws/commit/a0ffca231ded7ed66f9900c1530f655b52ad9d3c))
* **package:**
  * Update httpreq dependency ([0b16755b](https://github.com/fvdm/nodejs-geoip2ws/commit/0b16755b2666218bc982588dcc3cda9613e046db))
  * Reduce dev deps to dotest ([b073691a](https://github.com/fvdm/nodejs-geoip2ws/commit/b073691ad8897b83517a5261aba90ece3123c17a))
  * Update dependencies ([#30](https://github.com/fvdm/nodejs-geoip2ws/pull/30)) ([52480214](https://github.com/fvdm/nodejs-geoip2ws/commit/524802148645a3dbd669d6990c3307e62d228f29))
* **develop:** Cleanup .gitignore ([33c56e70](https://github.com/fvdm/nodejs-geoip2ws/commit/33c56e7031beb296794bacd6245c3e893a3a31e7))

##### Documentation Changes

* **readme:** Minor cleanup ([0c481066](https://github.com/fvdm/nodejs-geoip2ws/commit/0c48106622032b163521cfb1ed345cd2f3eb4197))

##### Bug Fixes

* **package:** Fixed json syntax typo ([653f696d](https://github.com/fvdm/nodejs-geoip2ws/commit/653f696dd45caf8d07f2d367802bde8a04f00f29))

##### Code Style Changes

* **test:** Reduced indentation ([f4e2fc19](https://github.com/fvdm/nodejs-geoip2ws/commit/f4e2fc1954bd2635c4a498ca6f012cc192cb7402))

##### Tests

* **main:**
  * Fixed syntax typos ([3c4a910e](https://github.com/fvdm/nodejs-geoip2ws/commit/3c4a910e311aa0fb4fead6003e54a90fcec6726c))
  * Fixed syntax typo ([3e9eb859](https://github.com/fvdm/nodejs-geoip2ws/commit/3e9eb8595d92d6a918f000410ee0667c5cf85d92))
  * Convert syntax to ES6 ([6f4eef63](https://github.com/fvdm/nodejs-geoip2ws/commit/6f4eef632e8c8d874f450a12737304c3463243fc))
* **config:**
  * Remove ecmaVersion from .eslintrc ([506c8c06](https://github.com/fvdm/nodejs-geoip2ws/commit/506c8c068790ff901d1fee77383fc78d7df60e97))
  * Update Travis CI node versions ([4a2c2ecf](https://github.com/fvdm/nodejs-geoip2ws/commit/4a2c2ecfdbce69527973451ecd2084a9d0e0c013))

#### 1.8.9 (2017-6-10)

##### Chores

* **package:**
  * Update dependencies ([5edc1ee6](https://github.com/fvdm/nodejs-geoip2ws/commit/5edc1ee67f9878958dfa121423fe18df161ecfbc))
  * Update dotest dev dep ([0b5338cd](https://github.com/fvdm/nodejs-geoip2ws/commit/0b5338cd15dd2f99891e92350a36bc8410208ce5))
  * Update dev deps ([c1e3a81d](https://github.com/fvdm/nodejs-geoip2ws/commit/c1e3a81d6ba35e93e66e7b46435f36767d9ea06a))

##### Documentation Changes

* **readme:** Replaced Ko-Fi image with SVG ([914c2589](https://github.com/fvdm/nodejs-geoip2ws/commit/914c2589a03e0dbf8675afd295803aa42009a82a))

##### Refactors

* **readme:** Added coffee link to Author ([29ea410c](https://github.com/fvdm/nodejs-geoip2ws/commit/29ea410c3567efafb1f42fa6e24e83d78bff733a))

##### Code Style Changes

* **comments:** Clean up JSDoc syntax ([86eab888](https://github.com/fvdm/nodejs-geoip2ws/commit/86eab8886565da14319059b2803362d5f8e9785f))

##### Tests

* **config:**
  * Replaced node 7 with 8 on Travis CI ([5a402e10](https://github.com/fvdm/nodejs-geoip2ws/commit/5a402e1054b05bd26667ef6b154e035c6a215011))
  * Removed Node.js v8 from Travis CI ([0e5b624c](https://github.com/fvdm/nodejs-geoip2ws/commit/0e5b624cfc1238bd951f8ed067cf0f2ab7fa5243))
  * Add Node.js v8 to Travis CI ([b58beb1d](https://github.com/fvdm/nodejs-geoip2ws/commit/b58beb1d254e306abdcf199b3340604ac928ad22))
  * Fixed syntax typo for bitHound ([092ef570](https://github.com/fvdm/nodejs-geoip2ws/commit/092ef57075a8fdab2f4b467bf72d8379255fb9c3))
  * Set bitHound long file to 400 lines ([8d3d717e](https://github.com/fvdm/nodejs-geoip2ws/commit/8d3d717e5cb6645cb55fddf415f1c68b6e5dc6fa))
* **style:** Clean up JSDoc comments ([5ba911da](https://github.com/fvdm/nodejs-geoip2ws/commit/5ba911dac36e4d8ed98ac56bff47455ebdc848e3))

#### 1.8.8 (2016-10-26)

##### Chores

* **main:**
  * Renamed http var to httpreq ([5f62ce41](https://github.com/fvdm/nodejs-geoip2ws/commit/5f62ce41d0732b11090091d270f4ff2436907aa4))
  * Minor comment change, renamed var ([50fe6210](https://github.com/fvdm/nodejs-geoip2ws/commit/50fe62109e1a2db0b5bc62c8358a38b58186b24b))
  * Minor edits to comments ([34babf85](https://github.com/fvdm/nodejs-geoip2ws/commit/34babf85f9d34b8e8f0a8950f2540752957f5283))
* **develop:** Added gitignore config ([f948fd64](https://github.com/fvdm/nodejs-geoip2ws/commit/f948fd64cc6f1df1a5526979ea17f4c38046ba6e))
* **package:**
  * Fixed dotest dev dep version ([214fe4b2](https://github.com/fvdm/nodejs-geoip2ws/commit/214fe4b2b8a50022bdd44e8402d01dfd7b6139dd))
  * Removed dev deps and test runner ([046b29c6](https://github.com/fvdm/nodejs-geoip2ws/commit/046b29c69859960d340736a7fb0eca3409ca29b2))

##### Documentation Changes

* **readme:** Add save flag to npm install ([f890cd2e](https://github.com/fvdm/nodejs-geoip2ws/commit/f890cd2e6afccb6a557a31a378ab527728e017ec))

##### Bug Fixes

* **main:** Fixed timeout var in setup() ([c7e11c66](https://github.com/fvdm/nodejs-geoip2ws/commit/c7e11c66d3a96ab6fac4d09e55c230c6694ffcca))

##### Refactors

* **errors:** Error handling without returns ([94261f4e](https://github.com/fvdm/nodejs-geoip2ws/commit/94261f4efcb959d6fb8f9cbda560e084c4e725f9))

##### Tests

* **main:** Don't report when using real data ([acf9234c](https://github.com/fvdm/nodejs-geoip2ws/commit/acf9234cfd96a4720a27f2e6dc6130c58b435167))
* **config:**
  * Use dynamic node versions on Travis CI (#25) ([98e358d1](https://github.com/fvdm/nodejs-geoip2ws/commit/98e358d143df53c02e9dbddcbd0319e775e379bb))
  * Removed node v7 from Travis CI ([5169efcc](https://github.com/fvdm/nodejs-geoip2ws/commit/5169efcc3a4405a6b6512fde49583b93867786e0))
  * Added node v5 to Travis CI ([6d218d0d](https://github.com/fvdm/nodejs-geoip2ws/commit/6d218d0d2e916b2171e9be66fbdcab21e3b3bffe))
  * Removed node v5 from Travis CI ([e9bd0c55](https://github.com/fvdm/nodejs-geoip2ws/commit/e9bd0c55975b8bd5e84fe0727bb1f2909f91570f))
  * Add bitHound config (#23) ([41d88327](https://github.com/fvdm/nodejs-geoip2ws/commit/41d883273675b9305f272f53b17e607fc486ba0c))
* **style:** Reduce code duplication (#22) ([c27fb56e](https://github.com/fvdm/nodejs-geoip2ws/commit/c27fb56ef1ddc422974273f9dc2b6c15a98bad13))

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

