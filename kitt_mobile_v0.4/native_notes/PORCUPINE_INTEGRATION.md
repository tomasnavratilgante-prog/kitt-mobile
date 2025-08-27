PORCUPINE (Picovoice) INTEGRATION NOTES
--------------------------------------------------
This file describes steps to integrate Picovoice Porcupine wake-word into the React Native app.
Porcupine runs on-device and listens for a keyword like "KITTE".

1) Choose Porcupine distribution:
   - Use Picovoice porcupine-react-native package or Porcupine SDK native libs.
   - Picovoice requires a license/keys for keyword models; you can train a custom keyword "KITTE" via Picovoice Console.

2) Android (high-level):
   - Add the porcupine native AAR or .so libraries to android/app/src/main/jniLibs/... and configure Gradle per Picovoice docs.
   - Create a native module 'PorcupineWakeModule' (Java/Kotlin) that starts Porcupine, listens for detection, and emits events 'PorcupineKeywordDetected' via ReactContextBaseJavaModule (sendEvent).
   - Expose start()/stop() methods callable from JS.
   - Bundle the keyword model (.ppn) in assets and load it in native module.
   - Handle audio permissions and audio focus (use AudioRecord).

3) iOS (high-level):
   - Add Porcupine framework (pod or manual) to your Xcode project.
   - Create RCTPorcupineWakeModule (Objective-C/Swift) that initializes Porcupine with the .ppn model and emits notifications on detections.
   - Expose start()/stop() to JS via RCT_EXPORT_METHOD and send events via RCTEventEmitter.
   - Ensure microphone permission usage string in Info.plist (NSMicrophoneUsageDescription).

4) Security & Privacy:
   - All processing is on-device; no audio leaves the device.
   - Respect user settings and provide toggle to disable wake-word or mute.

5) Testing:
   - Use device (not simulator) for audio tests.
   - Verify detection for variants of 'KITTE', and tune sensitivity if needed.
