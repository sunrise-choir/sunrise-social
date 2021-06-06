# peach-social

next-gen Scuttlebutt social networking app

## Why?

- Need for a new Scuttlebutt flagship app

## How?

- Electron
- Webpack
- TypeScript
- Prettier & ESLint
- ssbjs server
- graphql
- chakra-ui
- xstate

## opinions

- Stack should be modern yet not bleeding-edge
- try to follow Mastodon specs if possible
  - microformats
  - activitypub

## dev

```shell
git clone git@github.com:ahdinosaur/peach-social
cd peach-social
yarn
yarn dev
```

### TODO

- move from electron-webpack to just electron and webpack
- security
  - electron: https://www.electronjs.org/docs/tutorial/security
  - electron-webpack: https://gist.github.com/earksiinni/053470a04defc6d7dfaacd5e5a073b15
