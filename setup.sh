#source ./env.sh;
cd $clientDir
ng generate library jde-material-site;
cd projects/jde-material-site/
addHard $materialDir ng-package.json;
cd src;
rm public-api.ts;
addHard $materialDir/src projects.ts;

moveToDir assets;
addHard $materialDir/src/assets deeppurple-amber.css
addHard $materialDir/src/assets pink-bluegrey.css
addHard $materialDir/src/assets purple-green.css
moveToDir img
addHard $materialDir/src/assets/img theme-demo-icon.svg
addHardDir $materialDir/src/assets/img homepage
cd ..;
moveToDir pages;
addHardDir $materialDir/src/assets/pages component-category-list
addHardDir $materialDir/src/assets/pages component-sidenav

cd ../..;
moveToDir styles;
addHardDir $materialDir/src/styles custom-themes
addHard $materialDir/src/styles _api.scss
addHard $materialDir/src/styles _api-theme.scss
addHard $materialDir/src/styles _constants.scss
addHard $materialDir/src/styles _general.scss
addHard $materialDir/src/styles _markdown.scss
addHard $materialDir/src/styles _markdown-theme.scss
addHard $materialDir/src/styles _svg-theme.scss
addHard $materialDir/src/styles _tables.scss
addHard $materialDir/src/styles _tables-theme.scss

cd ../lib
addHard $materialDir/src/lib jde-material-site.module.ts

moveToDir shared
addHardDir $materialDir/src/lib/shared documentation-items
addHardDir $materialDir/src/lib/shared footer
addHardDir $materialDir/src/lib/shared navbar
addHardDir $materialDir/src/lib/shared navigation-focus
addHardDir $materialDir/src/lib/shared style-manager
addHardDir $materialDir/src/lib/shared svg-viewer
addHardDir $materialDir/src/lib/shared version

moveToDir theme-picker
addHard $materialDir/src/lib/shared/theme-picker index.ts
addHard $materialDir/src/lib/shared/theme-picker theme-picker.html
addHard $materialDir/src/lib/shared/theme-picker theme-picker.scss
addHard $materialDir/src/lib/shared/theme-picker theme-picker.ts
addHardDir $materialDir/src/lib/shared/theme-picker theme-storage

cd ../..
moveToDir pages
addHardDir $materialDir/src/lib/pages component-category-list
addHardDir $materialDir/src/lib/pages component-page-header
addHardDir $materialDir/src/lib/pages component-sidenav
addHardDir $materialDir/src/lib/pages page-title

moveToDir services;
#addHardDir $materialDir/src/lib/services authorization;
cp -r $materialDir/src/lib/services/authorization .;