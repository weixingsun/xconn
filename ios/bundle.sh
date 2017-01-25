#rm -rf ~/Library/Developer/Xcode/DerivedData/ModuleCache/*
#rm -rf ~/Library/Developer/Xcode/DerivedData/xconn*
dev=true
react-native bundle --entry-file thread_http.js --platform ios --dev $dev --bundle-output ios/xconn/thread_http.js
react-native bundle --entry-file thread_udp.js --platform ios --dev $dev --bundle-output ios/xconn/thread_udp.js
react-native bundle --entry-file ./index.ios.js --platform ios --dev $dev --bundle-output ios/xconn/main.jsbundle --assets-dest ./ios/xconn/
rm ios/xconn/main.jsbundle.meta ios/xconn/thread_http.js.meta ios/xconn/thread_udp.js.meta
