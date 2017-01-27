package com.xconn;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import co.apptailor.Worker.WorkerPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.tradle.react.UdpSocketsModule;
import com.chirag.RNMail.RNMail;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WorkerPackage(),
            new RNNetworkInfoPackage(),
            new BackgroundTimerPackage(),
            new UdpSocketsModule(),
            new RNMail(),
            new RNDeviceInfo(),
            new ReactNativeDocumentPicker(),
            new ReactNativeI18n(),
            new RNFSPackage(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
