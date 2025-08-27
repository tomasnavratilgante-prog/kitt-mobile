MAPY.CZ SDK INTEGRATION NOTES
--------------------------------------------------
This file explains how to integrate Mapy.cz native SDK into the React Native project for turn-by-turn navigation, route events and ETA.

1) Obtain SDKs:
   - Contact Seznam / Mapy.cz for mobile SDK access (Android and iOS). They provide native libraries and docs.
   - You will need API keys/agreements for distribution.

2) Android (high-level):
   - Add Mapy.cz SDK dependencies to android/app/build.gradle per their documentation.
   - Create a native module 'MapySdkModule' that initializes SDK with the key and provides methods:
       - initialize(apiKey)
       - setDestination(lat, lon, label)
       - startNavigation()
       - stopNavigation()
       - getETA() / onProgress events (via sendEvent)
   - Implement geofencing and radar/event listeners with SDK callbacks and forward events to JS.

3) iOS (high-level):
   - Add Mapy.cz iOS framework(s) to Xcode via CocoaPods or manual integration.
   - Create RCTMapySdkModule (Objective-C/Swift) exposing same methods as Android module.
   - Use RCTEventEmitter to send navigation progress, ETA and radar alerts to JS.

4) Permissions:
   - Always request location permissions (foreground and background if needed). On iOS, add NSLocationWhenInUseUsageDescription, NSLocationAlwaysAndWhenInUseUsageDescription to Info.plist.
   - For continuous navigation, enable Background Modes: Location updates, Audio, External accessory if needed.

5) Fallback:
   - If you cannot integrate SDKs immediately, use the existing deeplink fallback (Mapy.cz web links) implemented in src/bridges/mapSdkBridge.ts.
