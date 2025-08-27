KITT Mobile v0.4 - Porcupine wake-word + Mapy.cz SDK bridges (scaffold)
Generated: 2025-08-26
WHAT THIS PACKAGE IS
⦁	A development skeleton that includes JS bridges and scaffolding required for:
⦁	Porcupine (Picovoice) wake-word native module (Android/iOS)
⦁	Mapy.cz native SDK bridge (Android/iOS)
⦁	Includes fallback behavior: if native modules are not installed, the app uses text triggers and deeplink fallback to Mapy.cz.
IMPORTANT
⦁	This project does NOT include Porcupine binaries nor the Mapy.cz SDK (these require separate licensing/install).
⦁	The 'bridges' folder contains JS wrappers that call NativeModules.PorcupineWakeModule and NativeModules.MapySdkModule; you must implement those native modules following the instructions in native_notes/*
FILES OF INTEREST
⦁	App.tsx - app entry that starts wake-word bridge and Map SDK bridge
⦁	src/bridges/wakewordBridge.ts - JS wrapper around native Porcupine module
⦁	src/bridges/mapSdkBridge.ts - JS wrapper around native Mapy.cz module
⦁	src/services/* - KITT logic, memory, music, radar, nav service, intents
⦁	native_notes/* - detailed native integration steps for Porcupine and Mapy.cz
HOW TO PROCEED (quick)
1.	Unzip and open project.
2.	npm install
3.	Implement native modules per native_notes (or skip and use fallback).
4.	For Porcupine: obtain keyword model (.ppn), add to Android assets and iOS bundle, implement native module to emit 'PorcupineKeywordDetected' events.
5.	For Mapy.cz SDK: integrate native SDK and implement MapySdkModule to start in-app navigation and emit progress events.
6.	Run on device and test.
If you want, I can now:
⦁	Generate the native module template code for Android (Kotlin) and iOS (Swift/Objective-C) that you can paste into the native projects to implement Porcupine and Mapy bridges.
⦁	Or I can generate a step-by-step guided script to pe
