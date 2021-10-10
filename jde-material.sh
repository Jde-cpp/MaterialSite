#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $scriptDir/../../Framework/common.sh
controlDir=$scriptDir/control;
pushd `pwd` > /dev/null;

workspace=$(basename $PWD);
stylesPath=".projects.\"$workspace\".architect.build.options.styles";
styles=("pink-bluegrey" "deeppurple-amber" "indigo-pink" "purple-green");
stylesContent="[";
for (( i=0; i<${#styles[@]}; ++i )); do stylesContent=$stylesContent"{\"inject\": false,\"input\": \"projects/jde-material/src/styles/custom-themes/${styles[$i]}.scss\",\"bundleName\": \"${styles[$i]}\" },"; done;
stylesContent=$stylesContent\"src/styles.scss\"];
jq "$stylesPath = $stylesContent" angular.json > temp.json; if [ $? -ne 0 ]; then echo `pwd`; echo jq \"$stylesPath = $stylesContent\" angular.json; exit 1; fi;
mv temp.json $file;

cd src/assets;moveToDir img; mklink theme-demo-icon.svg $controlDir/src/assets/img; cd ../../..;

cd projects/jde-material/src;
addHard _app-theme.scss $controlDir/src;
addHardDir highlightjs $controlDir/src;

popd > /dev/null;