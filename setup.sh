baseDir=`pwd`;
destDir=$(dirname $(readlink -e $baseDir/source/projects/material-site/src))/src;
materialDir=$(dirname $(readlink -e $baseDir/../material.angular.io/src))/src;

function moveDir
{
	source=$1
	destination=$2
	directory=$3

	rm -r -f $destination/$directory;
	cp -r $source/$directory $destination/$directory;
	spec=$destination/$directory/$directory.spec.ts;
	if [ -f $spec ]; then rm $spec; fi;
};

cp $materialDir/assets/img/theme-demo-icon.svg $destDir/assets/img/theme-demo-icon.svg

moveDir $materialDir $destDir styles

pagesSource=$materialDir/app/pages
pagesDest=$destDir/lib/pages/material-site
moveDir $pagesSource $pagesDest component-category-list
moveDir $pagesSource $pagesDest component-page-header
moveDir $pagesSource $pagesDest component-sidenav
moveDir $pagesSource $pagesDest page-title

sharedSource=$materialDir/app/shared
sharedDest=$destDir/lib/shared/material-site
moveDir $sharedSource $sharedDest documentation-items
moveDir $sharedSource $sharedDest footer
moveDir $sharedSource $sharedDest navbar
moveDir $sharedSource $sharedDest navigation-focus
moveDir $sharedSource $sharedDest style-manager
moveDir $sharedSource $sharedDest svg-viewer
moveDir $sharedSource $sharedDest theme-picker
rm $sharedDest/theme-picker/theme-storage/theme-storage.spec.ts
moveDir $sharedSource $sharedDest version