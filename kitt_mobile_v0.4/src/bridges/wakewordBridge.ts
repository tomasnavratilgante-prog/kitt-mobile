import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const NativeWake = NativeModules.PorcupineWakeModule || null;

type Callback = (keyword: string) => void;

export class WakeWordBridge {
  static start(cb?: Callback) {
    if (NativeWake && NativeWake.start) {
      const emitter = new NativeEventEmitter(NativeWake);
      const sub = emitter.addListener('PorcupineKeywordDetected', (e) => {
        if (cb) cb(e.keyword || 'KITTE');
      });
      NativeWake.start();
      return () => { sub.remove(); NativeWake.stop && NativeWake.stop(); };
    } else {
      console.warn('Porcupine native module not installed — falling back to text trigger');
      // fallback: no-op; user can still type "Ahoj Kitte" into UI
      return () => {};
    }
  }
  static stop() {
    if (NativeWake && NativeWake.stop) NativeWake.stop();
  }
}
