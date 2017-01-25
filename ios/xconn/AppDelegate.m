#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //NSURL *js = [NSURL URLWithString:@"http://192.168.1.75:8081/index.ios.bundle?platform=ios&dev=true"];
  //NSURL *js = [NSURL URLWithString:@"http://10.32.57.7:8081/index.ios.bundle?platform=ios&dev=true"];
  NSURL *js = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  //NSURL *js = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:js
                                                      moduleName:@"xconn"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
@end
