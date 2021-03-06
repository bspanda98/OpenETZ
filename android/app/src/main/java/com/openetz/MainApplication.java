package com.openetz;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.beefe.picker.PickerViewPackage;

import com.reactnativenavigation.NavigationApplication;

import com.bitgo.randombytes.RandomBytesPackage;
import org.reactnative.camera.RNCameraPackage;
import io.realm.react.RealmReactPackage;
import org.pgsqlite.SQLitePluginPackage;
import com.chirag.RNMail.*;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.remobile.toast.RCTToastPackage; 
public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
          new PickerViewPackage(),
          new RandomBytesPackage(),
          new RNCameraPackage(),
          new RealmReactPackage(),
          new SQLitePluginPackage(),
          new RNMail(),
          new RNI18nPackage(),
          new RCTToastPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
    @Override
     public void onCreate() {
       super.onCreate();
       SoLoader.init(this, /* native exopackage */ false);
     }
    @Override
    public String getJSMainModuleName() {
        return "index";
    }

}


