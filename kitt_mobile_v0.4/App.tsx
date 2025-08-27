import React, {useEffect, useRef, useState} from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Tts from 'react-native-tts';
import { useKitt } from './src/services/kittHook';
import { Memory } from './src/services/memory';
import { RadarDB } from './src/services/radarDb';
import { MusicController } from './src/services/musicController';
import { NavService } from './src/services/navService';
import { WakeWordBridge } from './src/bridges/wakewordBridge';
import { MapSdkBridge } from './src/bridges/mapSdkBridge';

export default function App() {
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState('');
  const memory = useRef(new Memory()).current;
  const radar = useRef(new RadarDB()).current;
  const music = useRef(new MusicController()).current;
  const nav = useRef(new NavService()).current;
  const kitt = useKitt({ memory, music, nav, radar });

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        ]);
      }
      await memory.load();
      Tts.setDefaultLanguage('cs-CZ');
      setReady(true);
      kitt.say("Vše funkční. Systém připraven.");
      // Start wakeword listener (bridge attempts to start native Porcupine if installed)
      WakeWordBridge.start((keyword)=>{
        // keyword detected callback
        kitt.say("Slyším.");
      });
      // Initialize Map SDK (bridge - will try to load native SDK if set up)
      MapSdkBridge.initialize();
    })();
  }, []);

  const send = async () => {
    const text = input.trim();
    setInput('');
    if (!text) return;
    await kitt.handleCommand(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>KITT Mobile v0.4</Text>
      <Text style={styles.subtitle}>Porcupine wake-word & Mapy.cz SDK bridge (scaffold)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Stav: {ready ? 'Připraven' : 'Inicializuji…'}</Text>
        <Text style={styles.small}>Paměť: {memory.stats()}</Text>
      </View>

      <TextInput style={styles.input} placeholder="Řekni: 'Ahoj Kitte' nebo 'Jedeme do ...' nebo 'Pravidlo: ...'"
        placeholderTextColor="#888" value={input} onChangeText={setInput} onSubmitEditing={send} />

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => { setInput('Ahoj Kitte'); send(); }}><Text style={styles.btnText}>Pozdravit</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => { setInput('Jedeme do Kroměříže, nastartuj a pusť hudbu'); send(); }}><Text style={styles.btnText}>Kroměříž</Text></TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btnAlt} onPress={() => { setInput('Přidej spolujezdce: Lucka'); send(); }}><Text style={styles.btnText}>Přidat Lucku</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnAlt} onPress={() => { setInput('Pravidlo: Nezasahovat do hovoru spolujezdce'); send(); }}><Text style={styles.btnText}>Přidat pravidlo</Text></TouchableOpacity>
      </View>

      <View style={{height:30}}/>
      <Text style={styles.hint}>Wake‑word: "KITTE" (native Porcupine recommended)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#071019' },
  title: { color:'#fff', fontSize:26, fontWeight:'700' },
  subtitle: { color:'#9bb', marginBottom:10 },
  card: { backgroundColor:'#0e1720', padding:10, borderRadius:10 },
  label: { color:'#dfe7ef' },
  small: { color:'#9bb', fontSize:12 },
  input: { marginTop:12, padding:12, backgroundColor:'#0b1520', color:'#fff', borderRadius:8 },
  row: { flexDirection:'row', marginTop:10, gap:8 },
  btn: { flex:1, padding:12, backgroundColor:'#1f2a33', borderRadius:8, alignItems:'center' },
  btnAlt: { flex:1, padding:12, backgroundColor:'#24343f', borderRadius:8, alignItems:'center' },
  btnText: { color:'#e8eef6' },
  hint: { color:'#7f98a8', marginTop:8 }
});
