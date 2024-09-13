# Core (provide and designed by the Clean-arch team)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## New version and Release
every time you can update your version and release your new version.
This command will update all the packages listed to the latest version (specified by the tag config), respecting the semver constraints of both your package and its dependencies (if they also require the same package).

If the `./build.sh`  flag is specified, this command will update globally installed packages.



It will also install missing packages.
If no package name is specified, all packages in the specified location (global or local) will be updated.
to update Core and release new version, you should update the `"version"` in `package.js` file.

```
{
  "name": "Clean-arch-core",
  "version": "0.0.3",   << ----------------
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "build-pkg": "ng-packagr -p ng-package.json"
  }
}
```

A file with .sh extension is a scripting language commands file that contains computer program to be run by Unix shell. It can contain a series of commands that run sequentially to carry out operations such as files processing, execution of programs and other such tasks. These are executed from the command line interface by user or in batch to carry out multiple operations at the same time. Script files can be opened in text editors like Notepad, Notepad++, Vim, Apple Terminal and other similar applications on Windows, MacOS and Linux OS.

`./build.sh` 
```
#!/usr/bin/env bash
npm run build-pkg
cp -r ./src/assets dist
cd dist/
npm publish --registry http://Clean-arch.ddns.net:4873/
```

## Core structure

- [app](#app)
- [assets](#assets)
- [environments](#environments)
- [lib](#lib)


## app
app contains all sample components for the presentation layer like `app.module.ts`, `menu-items.ts`, `components`, `app-routing.module.ts`.

## assets
all style files are on the `asset/styles` folder and to update those files follow the style guides.

Sass is the acronym for `Syntactically Awesome Style Sheets`. Sass is not only the most popular CSS Preprocessor in the world but also one of the oldest, launched in 2ct006 by Hampton Catlin and later developed by Natalie Weizenbaum. Although Sass is written in Ruby language, a Precompiler LibSass allows Sass to be parsed in other languages and decouple it from Ruby. Sass has a massive active community and extensive learning resources available on the net for beginners. Thanks to its maturity, stability and powerful logical prowess, Sass has established itself to the forefront of CSS Preprocessor ahead of its rival peers.

#### configs and deployment approach
`Canary deployment` are a pattern for rolling out releases to a subset of users or servers. The idea is to first deploy the change to a small subset of servers, test it, and then roll the change out to the rest of the servers. The canary deployment serves as an early warning indicator with less impact on downtime: if the canary deployment fails, the rest of the servers aren't impacted.

The basic steps of a canary deployment are:

- Deploy to one or more canary servers.
- Test, or wait until satisfied.
- Deploy to the remaining servers.


The test phase of the canary deployment can work in many ways. You could run some automated tests, perform manual testing yourself, or even leave the server live and wait to see if problems are encountered by end users. In fact, all three of these approaches might be used. Depending on how you plan to test, you might decide to remove the canary server from the `production` load balancer and return it only when rolling out the change to the rest of the servers. 
[read more](#https://octopus.com/docs/deployments/patterns/canary-deployments#:~:text=Canary%20deployments%20are%20a%20pattern,the%20rest%20of%20the%20servers.) 

#### env.json
```
{
  "ACCOUNTING": "http://Clean-arch.ddns.net:3000/api/acc",
  "BASE_URL": "http://Clean-arch.ddns.net:8080",
}
```

## environments
For easier debugging in development mode, you can import the following file to ignore zone-related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 
 This import should be commented out in production mode because it will have a negative impact
 on performance, if an error is thrown.
 
 ```
 export const environment = {
  production: false,
  e2e: false,
};
```

## lib
- [classes](#classes)
- [components](#components)
- [enumerable](#enumerable)
- [guards](#guards)
- [models](#models)
- [services](#services)
- [test-helper](#test-helper)
- [utility](#utility)
