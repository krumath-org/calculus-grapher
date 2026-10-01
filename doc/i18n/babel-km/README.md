# Khmer (km) babel string files

Vendored copies of locale files that normally live in the sibling `babel` repo.

To apply into a PhET checkout:

```
copy doc\i18n\babel-km\calculus-grapher-strings_km.json ..\babel\calculus-grapher\
copy doc\i18n\babel-km\joist-strings_km.json ..\babel\joist\
copy doc\i18n\babel-km\scenery-phet-strings_km.json ..\babel\scenery-phet\
```

Then regenerate development conglomerates from each repo directory using chipper's
`generate-development-strings` task for `calculus-grapher`, `joist`, and `scenery-phet`.
