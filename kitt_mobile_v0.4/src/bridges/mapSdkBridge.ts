import { NativeModules } from 'react-native';
const NativeMap = NativeModules.MapySdkModule || null;

export class MapSdkBridge {
  static initialize(apiKey?: string) {
    if (NativeMap && NativeMap.initialize) {
      try { NativeMap.initialize(apiKey || ''); }
      catch(e){ console.warn('Map SDK initialize failed', e); }
    } else {
      console.warn('Mapy.cz native module not installed — using deeplink fallback.');
    }
  }
  static setDestination(lat:number, lon:number, label?:string) {
    if (NativeMap && NativeMap.setDestination) {
      NativeMap.setDestination(lat, lon, label || '');
    } else {
      // fallback: open Mapy.cz web link with coords
      const q = `${lat},${lon}`;
      const url = `https://mapy.cz/zakladni?x=${lon}&y=${lat}&z=14`;
      // eslint-disable-next-line no-console
      console.log('Open fallback map URL:', url);
      // In app use Linking.openURL(url) where appropriate
    }
  }
}
