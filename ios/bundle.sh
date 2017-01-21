#rm -rf ~/Library/Developer/Xcode/DerivedData/ModuleCache/*
#rm -rf ~/Library/Developer/Xcode/DerivedData/xconn*
react-native bundle --entry-file ./index.ios.js --platform ios --bundle-output ios/xconn/main.jsbundle --assets-dest ./ios/xconn/
rm ios/xconn/main.jsbundle.meta
