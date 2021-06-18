# Transport

<!-- TODO: update link to npm package once renamed there. -->
[![NPM](https://img.shields.io/npm/v/trezor-link.svg)](https://www.npmjs.org/package/trezor-link)
[![gitter](https://badges.gitter.im/trezor/community.svg)](https://gitter.im/trezor/community)

Library for low-level communication with TREZOR.

Intended as a "building block" for other packages - it is used in trezor.js and chrome extension.

*You probably don't want to use this package directly.* For communication with Trezor with a more high-level API, use [trezor.js](https://www.npmjs.com/package/trezor.js).

## Notes

Source is annotated with Flow types, so it's more obvious what is going on from source code.

## Flow

If you want to use flow for typechecking, just include the file as normally, it will automatically use the included flow file. However, you need to add `flowtype/*.js` to your `[libs]` (or copy it yourself from flow-typed repository), and probably libs from flowconfig.

## License

LGPLv3

* (C) 2015 Karel Bilek (SatoshiLabs) <kb@karelbilek.com>
* (C) 2014 Mike Tsao <mike@sowbug.com>
* (C) 2014 Liz Fong-Jones <lizf@google.com>
* (C) 2015 William Wolf <throughnothing@gmail.com>
