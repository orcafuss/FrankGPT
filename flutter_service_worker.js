'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "1af17cbb99124a4a51897e0507463985",
".git/config": "30def7b5d7998ba92ad55b189ce6a88a",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "5ab7a4355e4c959b0c5c008f202f51ec",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "7452ff1a62955aefc27e506aa146bacd",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "5fcf53bfa101eea10ab555c6b0e75172",
".git/logs/refs/heads/gh-pages": "c8f19621839ba8b5a967e7c2bb73c7fc",
".git/logs/refs/heads/main": "6a8286e5545d913e29ad7107c338054b",
".git/logs/refs/remotes/origin/gh-pages": "add8d3e715cac9f412c010c2130113da",
".git/logs/refs/remotes/origin/main": "12d0a003438548e7d2e773fcab78caaa",
".git/objects/00/c473af6091910d726f21f519793fb549e78476": "6062b4b4f05cc4d74ba7ae4a2552afa3",
".git/objects/07/8adf1daa09144825423b0d6bcd10b12c87f972": "4aed34e685a758bc641f1ef10d5142ac",
".git/objects/08/27c17254fd3959af211aaf91a82d3b9a804c2f": "360dc8df65dabbf4e7f858711c46cc09",
".git/objects/08/96aa4514163f89cf268c59ce0a9492dc7f3611": "d94408c72055b24d99472d3d72166e0f",
".git/objects/0a/f4907da2f21f7089577737c54f5875879a6b95": "85b26987f73c4722f29ce8c9d28a94f2",
".git/objects/0e/4aa01b512991e93f7ee34ef53b61e54b15b63c": "9d5d87ffb9f57eb088789203a48236ad",
".git/objects/13/4bc9441c1553ac0d61b7dd2405e44435b09cf4": "2e18d921b40aa1dc2b57138299691197",
".git/objects/17/79ab5f5d64cbaa9e8c12416827b7918b44ba85": "93802ae2de25309ca3d53e02170b2993",
".git/objects/17/b085f8b5c4aebeba8df98fa52e7e3d1b6ce0ad": "26d726bcc3ac137dea69bcecff671835",
".git/objects/1b/0369a614e20b03fe9e07811ca97ab04d981777": "7c253e6ff4ccd1b87eb403a03fb2e92f",
".git/objects/1b/aba3a204ce2f960c9c780256d0b89aaf6b8b98": "44c2760223577e81945811692b99bd31",
".git/objects/1e/b85c061f4ea88c83f4f35c79a05e56f2ccf461": "980454949b84a596029b79747fddf49e",
".git/objects/2c/955b0600f3cc2c5117aabb14cec62c9bd008e3": "fe2f89143b7d3e1e3096f8e72a5c7bc0",
".git/objects/2d/4381cc3ef88b96266335cc9c40391fef23a7ff": "b02b773d7ef40281194c101f5f6624fb",
".git/objects/36/c429250a5b9a4d42033c7e3e1d22feb55741a4": "33b1539985692871833aef05ed7a22cf",
".git/objects/39/1bdb9a850ac545f8858be74715e7887008e0cd": "c4469b171711b61c6c71036a26b91fb5",
".git/objects/39/fb04ad54859fdd6307395f0c351f919c0a942b": "316f6de8d078933f7c23308b0f9f5482",
".git/objects/3a/8cda5335b4b2a108123194b84df133bac91b23": "1636ee51263ed072c69e4e3b8d14f339",
".git/objects/3d/125288d77aa7267cf9d48b17d3d4a6ff2ce4c6": "b406bc0108e740dbaaacd209aa84db70",
".git/objects/3e/d0ddd7136a48520910e7e4bf665362facd60d4": "c8322669a78b5f07c75b1decdc05718d",
".git/objects/46/f60afe14c77398aa6a332eef5f0ce864caff68": "db846e7a2bcea13b2b67ca165a32ab7a",
".git/objects/47/4138c7f4eb9da5dd18bcf40bdb081943c2869c": "3c9c5b222e15ce9bc01ed8b86cbcd7cb",
".git/objects/47/a44c2d722863a858056bc1829d85adfc03c414": "9b715d49262c12eb41c46ae0504cd88f",
".git/objects/4b/825dc642cb6eb9a060e54bf8d69288fbee4904": "75589287973d2772c2fc69d664e10822",
".git/objects/4b/963f498d5fb9b13eefc1f42a7e293d7a72ecf5": "e976ec792557c1625250c6b6bbb9b2c8",
".git/objects/4e/dca36a3651094e49decf7321b0252ce142638e": "12681fb9a7041da81c1e01315f66d4d2",
".git/objects/51/03e757c71f2abfd2269054a790f775ec61ffa4": "d437b77e41df8fcc0c0e99f143adc093",
".git/objects/5c/d13ec160e1d78894fd39062b10ff71d6727c17": "b72aa52c8da3098b678022627c4e1540",
".git/objects/5d/e6f311db767be7282617519b4d3b1427ca7b54": "8198fd1d9d873f861c141e76981f7627",
".git/objects/60/3530ad807907a7b2b92a0ac8285299ed8b2aaf": "eb85fed71ac76c184aa052e25d2b4efa",
".git/objects/61/be82030a6e928aa30d129369a205133bd7d45b": "e5874bdb928ddd8d30d3cda0c660cd70",
".git/objects/65/c97c7c1ee376d4d96dea7801b74e0085bff758": "b8c818e398727ca6c6a8249b9768c538",
".git/objects/66/67062f65f46e6b889f259d1caaa3e2f5547a4e": "c333bb07e515063338488efe9a71fbdd",
".git/objects/66/79d0fc557ebf254e6697fbbd3ced6a484a1dae": "0c20a3cdd33f7813549fd2239c6641ba",
".git/objects/68/43fddc6aef172d5576ecce56160b1c73bc0f85": "2a91c358adf65703ab820ee54e7aff37",
".git/objects/69/eee8be034a9eb47c3fa070a08242e5e8de9a30": "27c426925b6033cb4f245f1779b6d7e9",
".git/objects/6b/088a71193dc27290d27f910bc5d73214f3bbc1": "f06a2b93ff042e59f73cfc0d222c097f",
".git/objects/6b/9862a1351012dc0f337c9ee5067ed3dbfbb439": "85896cd5fba127825eb58df13dfac82b",
".git/objects/6b/fe9b5b0906c30c42887bff995c8025becc9e9e": "97e1c0160a64767d129059dfb9ae700d",
".git/objects/6e/48e0c5f100d59496f4c6bac61c78cb4887676b": "e9a914fe8ff5d99a349e43014e6f6a69",
".git/objects/6e/9a39dfd1e93d62956e540dd2c184e663730f3a": "469685faf47dd0b7a24827111a928993",
".git/objects/6f/7661bc79baa113f478e9a717e0c4959a3f3d27": "985be3a6935e9d31febd5205a9e04c4e",
".git/objects/70/b9a5426e117be7c3a1bad0955c463f621be7fb": "0bdd474195b2bd5375ae120666e985c2",
".git/objects/71/df4790c6588a3318f34c0e7296a63ed952df80": "8761af3c462779dcc4195be81fb5b09e",
".git/objects/75/4029449673c60d3806d619dccdf542b2fa7237": "e01ef11cd4250f1656e02c86b01f48e2",
".git/objects/77/470cb39f05f70a5b709b68304d0756bab75a0d": "d658e06e6b3f533d272ec33d757ba3e0",
".git/objects/78/085936fb789eb3a89e4e443f008bf6fbc198ff": "d3a47a306dce5803a50874e68b69fd1f",
".git/objects/7c/3463b788d022128d17b29072564326f1fd8819": "37fee507a59e935fc85169a822943ba2",
".git/objects/7f/f3c522c49161ceb65713a131e0a99c54cf7844": "79378b7275b28ce25a6bf0aabedeb7c9",
".git/objects/85/63aed2175379d2e75ec05ec0373a302730b6ad": "997f96db42b2dde7c208b10d023a5a8e",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/70bd70275edc8eb6e5c5d07406aff598987907": "802091b50522efa491509f2c20e9864c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8e/21753cdb204192a414b235db41da6a8446c8b4": "1e467e19cabb5d3d38b8fe200c37479e",
".git/objects/8e/a7838a98153fee94572e27323c27b124431ee9": "60d04eb7a0e920ddf1d8ae0ae73741ff",
".git/objects/90/e695436adb9d214dd69c14a7f6e1d70d9da912": "f298890a1dd351b0d8a40b3b533f86ce",
".git/objects/93/b363f37b4951e6c5b9e1932ed169c9928b1e90": "c8d74fb3083c0dc39be8cff78a1d4dd5",
".git/objects/95/f462068165260fd6b03ef1f009ab9d6b92cf81": "d2f31698517383303f036de667e6cc2d",
".git/objects/9a/8d306a37e453450babf756b8d1db7935b6013e": "dcfa177cfce94c777a7195830259cfe4",
".git/objects/a1/32d18f21050d4d0759f5f97bd3fcfef6b389a5": "1c7e5cfc9120e03d9c68323db550df07",
".git/objects/a7/3f4b23dde68ce5a05ce4c658ccd690c7f707ec": "ee275830276a88bac752feff80ed6470",
".git/objects/a7/841f056e16e9660f6eb41f38ae7e96bb6cbc41": "d6810cc9493e5dd66a22ee24defee918",
".git/objects/ab/93a70c9e5f4440729fdb3061f67b823c64299c": "74250f192f4186ebbd1f701bfa7f983b",
".git/objects/ac/ff243f3ad86aa00123e7a8e463ef200c9ad9fe": "0e9fa1179f4fccbdd9c9fc521f5459b5",
".git/objects/ad/ced61befd6b9d30829511317b07b72e66918a1": "37e7fcca73f0b6930673b256fac467ae",
".git/objects/b1/e558e9ecb05ee9dc38ac1aa5f10bc511e126eb": "a5551085fa0ed6936922f5271824a56f",
".git/objects/b4/e54f98a3d0ce914c2cb846845006f749eb13d0": "822fd3597baf5f1774659a2e8c2391e4",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/b9/3e39bd49dfaf9e225bb598cd9644f833badd9a": "666b0d595ebbcc37f0c7b61220c18864",
".git/objects/bd/dcd014ea57a5dfd4bbdd208a24cb0a5d713747": "661192975f9541dd67347d5093481745",
".git/objects/be/8edd87581a9155455fcccdfb91512d73bf2464": "e70e89d4c547bfad7c71c21902b80ad6",
".git/objects/bf/1d6d20224a7206882f6200da75d139859e5d63": "80f4fda1f063b1d426ef3b65af14dff4",
".git/objects/c8/3af99da428c63c1f82efdcd11c8d5297bddb04": "144ef6d9a8ff9a753d6e3b9573d5242f",
".git/objects/cb/6b7a6137f8e01d986294349a6bc2fadc6d1849": "9df7d09456db8013ef6b3c4b23309f7a",
".git/objects/d2/dcdcb8e14602e631390e6031926e65426fb5dc": "7ff52a8b6ef2c1c94b02007ba8032f93",
".git/objects/d3/1609649c9d278bf73ec593bb3a3b0890a7dce4": "d3c615ce0d53fdd4660117e413fc9b4e",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d4/4db696ac642566d148dca0e585a9ca669cad38": "e1ad96163e5b409a52e7383d1b4da91f",
".git/objects/d5/49147b813d28f477acaf9c823ef6bbb303144b": "7cab15ae2a34560996308efa3fe25c06",
".git/objects/d5/95e6c6bd5887a584ddb125fe02f826541c815d": "d9665bc8927ad505cd13f65cb66cd3b7",
".git/objects/d6/812aed186bb30fd53eb5ac8ce32949333923a4": "9f4b7ee95f3d974cac4d55620be10cc1",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/d7/3121c9bccd9c23a49491a5a55cc17b007ae917": "1b69032314bbc0011cbac62fa76467b1",
".git/objects/d7/7cfefdbe249b8bf90ce8244ed8fc1732fe8f73": "9c0876641083076714600718b0dab097",
".git/objects/d7/cda3c537d9045bd38cf431c8c8c65f2756810e": "cf224aa87878c33c81f1cce99ad841e4",
".git/objects/d9/5b1d3499b3b3d3989fa2a461151ba2abd92a07": "a072a09ac2efe43c8d49b7356317e52e",
".git/objects/de/1d1e5867ee9137546b4082a88125b30760015f": "fb1f169a57ce7abf74092fba91e1cf02",
".git/objects/e2/8dad82c46e5d62f24d7c4187c993690ae625dc": "f6c1cae62a22035d92de7ada90b6795d",
".git/objects/e3/e72d825f294601acb91607987d3326a8a95e9d": "c35d302381ece19fbc7d3717fd9b6ca0",
".git/objects/e5/0a3559fdf86099844cb55908b82d4b9365deb3": "f1bc281d5a444c6ed3b099558f945251",
".git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391": "c70c34cbeefd40e7c0149b7a0c2c64c2",
".git/objects/e9/94225c71c957162e2dcc06abe8295e482f93a2": "2eed33506ed70a5848a0b06f5b754f2c",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/f3/3e0726c3581f96c51f862cf61120af36599a32": "afcaefd94c5f13d3da610e0defa27e50",
".git/objects/f5/72b90ef57ee79b82dd846c6871359a7cb10404": "e68f5265f0bb82d792ff536dcb99d803",
".git/objects/f6/e6c75d6f1151eeb165a90f04b4d99effa41e83": "95ea83d65d44e4c524c6d51286406ac8",
".git/objects/fd/05cfbc927a4fedcbe4d6d4b62e2c1ed8918f26": "5675c69555d005a1a244cc8ba90a402c",
".git/refs/heads/gh-pages": "00b488fa76ce70e9f5bc0a0c4703fff6",
".git/refs/heads/main": "3e16f20bf67cd8f6692a32f4ece09791",
".git/refs/remotes/origin/gh-pages": "00b488fa76ce70e9f5bc0a0c4703fff6",
".git/refs/remotes/origin/main": "3e16f20bf67cd8f6692a32f4ece09791",
"assets/AssetManifest.bin": "6a270729e15264a0bc8d61d7edb74e65",
"assets/AssetManifest.bin.json": "5cf281ef5bdc15d1f9047ba8107ca58e",
"assets/assets/data/formal_responses.yaml": "56833e59fd45522ab90d6d1606797b32",
"assets/assets/data/informal_responses.yaml": "a1724ac9115920c7ab03e67b3a5381b9",
"assets/assets/fonts/Inter-Regular.ttf": "e48c1217adab2a0e44f8df400d33c325",
"assets/assets/icons/chat/menu.svg": "45bd2a74cdf791abd66828a3dfe4bb91",
"assets/assets/icons/chat/new_chat.svg": "39e268903abd4a3fc12d2375ba3c7a3d",
"assets/assets/icons/chat/send.svg": "25299971fca39a1f75e4bf2c5aaf1067",
"assets/assets/icons/settings/audio_lines.svg": "cbf4def6e826a4b0763dfab6aaac4a9a",
"assets/assets/icons/settings/film.svg": "7b2e9c586c7320f59d5e1514a59395b4",
"assets/assets/icons/settings/paintbrush.svg": "4d30cf5a342202d80c1f5a983f8d3949",
"assets/assets/icons/settings/palette.svg": "c0731092ce788eb809e01856e0f6ef11",
"assets/assets/icons/settings/sun.svg": "644d15eef2f80d3e7ebd892524f4c306",
"assets/assets/icons/system/back.svg": "f86e0c8176c2d7f893e8f659c8740500",
"assets/assets/icons/system/check.svg": "65d286c5149e889b64b3459fc93fee72",
"assets/assets/icons/system/dropdown.svg": "966d189388a1eb70118f558df8614edf",
"assets/assets/icons/system/settings.svg": "b5f45b72f36eed06474c60f50c0ca9e7",
"assets/FontManifest.json": "ee330b453adffc411cf5399c36204ecb",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/lib/scripts/settings.json": "bf4156cc40b6fd367d36af92bd4a0e14",
"assets/NOTICES": "33a9e424b31f4877dd747b54c9512bda",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"favicon.png": "784cad31dd0bdb7f8c93758a42dc2ad7",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "f2ccd6c3561ba22cd89b87d4eb165038",
"icons/Icon-192.png": "d121a9f488e52bc0a331a69806833916",
"icons/Icon-512.png": "482d0187a3fffeb37ac6f0aa611ce736",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "8f37fb8ed7bda30254c1682e597ea5de",
"/": "8f37fb8ed7bda30254c1682e597ea5de",
"main.dart.js": "982db2c8d7808bdd5ce9a809083c65e0",
"manifest.json": "cc5094831595960c7621885aae73e30f",
"robots.txt": "bbbcde0b15cabd06aace1df82d335978",
"version.json": "2aac52e5b770febb95acf800bf29f1dd"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
