# LegendOfMountainSea ![icon](https://raw.githubusercontent.com/SkyHarp/LegendOfMountainSea/master/assets/LOMS.png)

[![Platform](https://img.shields.io/badge/platform-osx%20%7C%20win-orange.svg?style=flat-square)](https://github.com/SkyHarp/LegendOfMountainSea/releases)
[![npm](https://img.shields.io/npm/v/loms-cli.svg?style=flat-square&label=loms-cli)](https://www.npmjs.com/package/loms-cli)
[![Gitter](https://img.shields.io/gitter/room/SkyHarp/LegendOfMountainSea.svg?style=flat-square)](https://gitter.im/SkyHarp/LegendOfMountainSea)
[![PRs](https://img.shields.io/badge/PRs-welcome-yellow.svg?style=flat-square)](https://github.com/SkyHarp/LegendOfMountainSea/blob/master/.github/CONTRIBUTING.md)

[![Maintainability](https://api.codeclimate.com/v1/badges/b89efe9442ffb2142766/maintainability)](https://codeclimate.com/github/SkyHarp/LegendOfMountainSea/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b89efe9442ffb2142766/test_coverage)](https://codeclimate.com/github/SkyHarp/LegendOfMountainSea/test_coverage)
[![Build Status](https://img.shields.io/travis/SkyHarp/LegendOfMountainSea/master.svg?style=flat-square&logo=travis&label=osx)](https://travis-ci.org/SkyHarp/LegendOfMountainSea)
[![AppVeyor branch](https://img.shields.io/appveyor/ci/TyrealGray/legendofmountainsea/master.svg?style=flat-square&logo=appveyor&label=win)](https://ci.appveyor.com/project/TyrealGray/legendofmountainsea)

4X sandbox game with legend of Mountain and Sea Classics

To experience hundreds of Chinese ancient legends, start with Hou Yi ![houyi](https://raw.githubusercontent.com/SkyHarp/LegendOfMountainSea/master/houyi_battle.gif) to shoot down nine suns

## Installing

Install LOMS Development CLI
```
$ npm install loms-cli -g
```

Fork repository, create your branch from master and run CLI command-line inside project folder
```
$ cd LegendOfMountainSea/
$ loms init
```
- Windows might get `node-gyp rebuild` error, open Powershell as admin and run
```
$ npm i -g --prodution --vs2015 --add-python-to-path windows-build-tools
```
 

## Getting started
**Run game on web browser without NW.js Client**
```
$ loms run-dev
```
**Run game on Windows or macOS with NW.js Client**
```
$ loms run-client
```
**Run game's unit tests**
```
$ loms test
```

## Requirement
Node.js **version 10.0.0 or higher**

## Contributing
LegendOfMountainSea welcomes all contributions from anyone willing to work in good faith both with other contributors and with the community.

No contribution is too small and all contributions are valued.
[Contributing to LegendOfMountainSea](https://github.com/SkyHarp/LegendOfMountainSea/blob/master/.github/CONTRIBUTING.md)

## License
GPL-2.0
