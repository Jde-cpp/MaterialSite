#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source $scriptDir/../../Framework/common.sh
controlDir=$scriptDir/control;
pushd `pwd` > /dev/null;

cd projects/jde-material/src;
addHard _app-theme.scss $controlDir/src;
addHardDir highlightjs $controlDir/src;

popd > /dev/null;