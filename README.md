# README.md

This repo is the solution to https://excel-ubara.com/vba100/ on **Google AppsScript**(written in TypeScript) version.(Note: Under development...)

See also:

+ https://github.com/knknkn1162/vba100_knock (VBA code on xlsm)
+ https://github.com/knknkn1162/vba100_knock_ps (PowerShell)

## note

+ we skip several exercises because of the following difficuties:

+ ex018: `#REF` namedranges cannot be retrieved by `getNamedRanges()`

## prerequisites

+ docker : install with `Chocolatey` command.
+ vscode editor is recommended.

## How to run

```ps
docker build -t test .
docker run -it -v ${pwd}:/app --rm /bin/bash
```

```ps
# in the docker container
# install only once
npm init
# intellisense
npm i -S @types/google-apps-script
```

```ps
# 0: in the docker container
# 1. get /root/.clasprc.json (Authorization)
make login
# 2. create project named ${MACRO}
make create-${MACRO}
# 3. edit spreadsheet(container in ${MACRO} project) as you want(on the web)
# 4. write typescript code
# 5. export (push)
make export-${MACRO}
# 6. press `Ctrl-R` to run script (on the web)
```

# references

## spreadsheet

+ https://developers.google.com/apps-script/reference/spreadsheet
+ https://tonari-it.com/google-apps-script-manual/

## typescript

+ https://typescriptbook.jp/