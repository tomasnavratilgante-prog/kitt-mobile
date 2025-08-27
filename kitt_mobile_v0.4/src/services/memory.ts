import AsyncStorage from '@react-native-async-storage/async-storage';
export class Memory{constructor(){this.people={};this.driver={drivingStyle:{aggressiveness:3,preferSpeed:110},speakRules:{interrupt:false,musicComments:'mild'}};this.dna={"Linkin Park":5,"Three Days Grace":5,"Seether":4,"Nickelback":3,"Disturbed":4,"Beast in Black":4,"Rihanna":3,"The Killers":3};this.rules=[];}
async load(){try{const raw=await AsyncStorage.getItem('kitt_memory_v0.4');if(raw){const p=JSON.parse(raw);this.people=p.people||this.people;this.driver=p.driver||this.driver;this.dna=p.dna||this.dna;this.rules=p.rules||this.rules;}}catch(e){}}
async save(){try{await AsyncStorage.setItem('kitt_memory_v0.4',JSON.stringify({people:this.people,driver:this.driver,dna:this.dna,rules:this.rules}));}catch(e){}}
stats(){return `osob: ${Object.keys(this.people).length}, pravidel: ${this.rules.length}`;}
addPerson(name){const now=new Date().toISOString();const key=name.trim().toLowerCase();if(!this.people[key]){this.people[key]={name,firstSeenISO:now,lastSeenISO:now,rides:1,tags:[],musicLikes:[],musicDislikes:[],commStyle:{talkative:false,humorBias:'mild'},interests:[],lastTopic:'',notes:[]};}else{this.people[key].lastSeenISO=now;this.people[key].rides=(this.people[key].rides||0)+1;}this.save();return this.people[key];}
getPerson(name){return this.people[name.trim().toLowerCase()];}
getDriver(){return this.driver;}
setDriverProfile(upd){this.driver={...this.driver,...upd};this.save();}
addRule(raw,key,value,source){const rule={id:'r_'+Date.now(),raw,key,value,createdISO:new Date().toISOString(),source};this.rules.push(rule);this.save();return rule;}
listRules(){return this.rules;}
removeRule(id){this.rules=this.rules.filter(r=>r.id!==id);this.save();}
getDNA(){return this.dna;}
bumpBand(band,delta=1){this.dna[band]=(this.dna[band]||0)+delta;this.save();}}
