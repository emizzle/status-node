var ffi = require('ffi')
var ref = require('ref');
var rimraf = require('rimraf');
var fs = require('fs');

// ============
const libstatusPath = "../libstatus";
const keystoredir = "/home/richard/test/t2/keystore/";
const datadir = "/home/richard/test/t2/data/";
const nobackupdir = "/home/richard/test/t2/noBackup/";

rimraf.sync(keystoredir);
rimraf.sync(datadir);
rimraf.sync(nobackupdir);

fs.mkdirSync(keystoredir);
fs.mkdirSync(datadir);
fs.mkdirSync(nobackupdir);

// =============


var libstatus = ffi.Library(libstatusPath, {
    'InitKeystore':  ["string", ["string"]],
    'OpenAccounts':  ["string", ["string"]],
    'MultiAccountGenerateAndDeriveAddresses':  ["string", ["string"]],
    'MultiAccountStoreDerivedAccounts':  ["string", ["string"]],
    'SaveAccountAndLogin': ["string", ["string", "string", "string", "string", "string"]],
    'CallRPC': ["string", ["string"]]
});


let result;

// 1. 
result = libstatus.InitKeystore(keystoredir);
console.log("InitKeystore: ", result,  "\n\n\n");

// 2. 
result = libstatus.OpenAccounts(nobackupdir);
console.log("OpenAccounts: ", result,  "\n\n\n");

// 3. 
const paths = ["m/43'/60'/1581'/0'/0", "m/44'/60'/0'/0/0"];
const p0 = {"n": 5,"mnemonicPhraseLength": 12, "bip39Passphrase": "", paths};
result = libstatus.MultiAccountGenerateAndDeriveAddresses(JSON.stringify(p0));
console.log("MultiAccountGenerateAndDeriveAddresses: ", result,  "\n\n\n");

const accountID = JSON.parse(result)[0].id;


// 4. 
const password = "0x2cd9bf92c5e20b1b410f5ace94d963a96e89156fbe65b70365e8596b37f1f165"; // qwerty
const p1 = {accountID, paths, password};
result = libstatus.MultiAccountStoreDerivedAccounts(JSON.stringify(p1));
console.log("MultiAccountStoreDerivedAccounts: ", result,  "\n\n\n")

// 5. 
const multiAccountData = "";
const settings = "";
const accountsData = "";
const finalConfig = "";
result = libstatus.SaveAccountAndLogin(multiAccountData, password, settings, accountsData, finalConfig);









/*

:49] - ================== [native-module] save-account-and-login multiaccount-data {"name":"Delectable Overjoyed Nauplius","address":"0x4c9986b0EA847093EAF
DAD179C98fcfb3E9251bb","photo-path":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAmElEQVR4nOzX4QmAIBBA4Yp2aY52aox2ao6mqf+SoajwON73M0J4HBy6TEEYQmMIjSE0htCECVlbDziv+/n
6fuzb3OP/UmEmYgiNITRNm+LPqO2UE2YihtAYQlN818ptoZzau1btOakwEzGExhCa5hdi7d2p1zZLhZmIITSG0PhCpDGExhANEmYihtAYQmMIjSE0bwAAAP//kHQdRIWYzToAAAAASUVORK5CYII=","key-uid":"0x6a6abf10725ee5a6039c5ca9a5
fcb4f44d5cac7fb4a51717ad116276b485935e","keycard-pairing":null}                                                                                                                               
                                                                                                
DEBUG [status-im.native-module.core:52] - ================== [multiaccount-data]  {"name":"Delectable Overjoyed Nauplius","address":"0x4c9986b0EA847093EAFDAD179C98fcfb3E9251bb","photo-path":
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAmElEQVR4nOzX4QmAIBBA4Yp2aY52aox2ao6mqf+SoajwON73M0J4HBy6TEEYQmMIjSE0htCECVlbDziv+/n6fuzb3OP/UmEmYgiNITRNm+LPqO2UE2YihtA
YQlN818ptoZzau1btOakwEzGExhCa5hdi7d2p1zZLhZmIITSG0PhCpDGExhANEmYihtAYQmMIjSE0bwAAAP//kHQdRIWYzToAAAAASUVORK5CYII=","key-uid":"0x6a6abf10725ee5a6039c5ca9a5fcb4f44d5cac7fb4a51717ad116276b48593
5e","keycard-pairing":null}                                                                                                                                                                   

DEBUG [status-im.native-module.core:54] - ================== [settings]  {"key-uid":"0x6a6abf10725ee5a6039c5ca9a5fcb4f44d5cac7fb4a51717ad116276b485935e","address":"0x4c9986b0EA847093EAFDAD17
9C98fcfb3E9251bb","mnemonic":"bamboo ordinary faculty skin physical hub stove dumb text hint carpet gossip","preview-privacy?":true,"signing-phrase":"dust gear boss","log-level":"INFO","eip1
581-address":"0x5E351FD0b541E8a6D2Cac5C4d210C9715eBB446E","name":"Delectable Overjoyed Nauplius","latest-derived-path":0,"wallet-root-address":"0x842969a1F9561d95D91Da0c98B7D49a82D786Cf0","n
etworks/networks":[{"id":"testnet_rpc","etherscan-link":"https://ropsten.etherscan.io/address/","name":"Ropsten with upstream RPC","config":{"NetworkId":3,"DataDir":"/ethereum/testnet_rpc","
UpstreamConfig":{"Enabled":true,"URL":"https://ropsten.infura.io/v3/f315575765b14720b32382a61a89341a"}}},{"id":"rinkeby_rpc","etherscan-link":"https://rinkeby.etherscan.io/address/","name":"
Rinkeby with upstream RPC","config":{"NetworkId":4,"DataDir":"/ethereum/rinkeby_rpc","UpstreamConfig":{"Enabled":true,"URL":"https://rinkeby.infura.io/v3/f315575765b14720b32382a61a89341a"}}}
,{"id":"goerli_rpc","etherscan-link":"https://goerli.etherscan.io/address/","name":"Goerli with upstream RPC","config":{"NetworkId":5,"DataDir":"/ethereum/goerli_rpc","UpstreamConfig":{"Enab
led":true,"URL":"https://goerli.blockscout.com/"}}},{"id":"mainnet_rpc","etherscan-link":"https://etherscan.io/address/","name":"Mainnet with upstream RPC","config":{"NetworkId":1,"DataDir":
"/ethereum/mainnet_rpc","UpstreamConfig":{"Enabled":true,"URL":"https://mainnet.infura.io/v3/f315575765b14720b32382a61a89341a"}}},{"id":"xdai_rpc","name":"xDai Chain","config":{"NetworkId":1
00,"DataDir":"/ethereum/xdai_rpc","UpstreamConfig":{"Enabled":true,"URL":"https://dai.poa.network"}}},{"id":"poa_rpc","name":"POA Network","config":{"NetworkId":99,"DataDir":"/ethereum/poa_r
pc","UpstreamConfig":{"Enabled":true,"URL":"https://core.poa.network"}}}],"currency":"usd","photo-path":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAmElEQVR4nOzX4Qm
AIBBA4Yp2aY52aox2ao6mqf+SoajwON73M0J4HBy6TEEYQmMIjSE0htCECVlbDziv+/n6fuzb3OP/UmEmYgiNITRNm+LPqO2UE2YihtAYQlN818ptoZzau1btOakwEzGExhCa5hdi7d2p1zZLhZmIITSG0PhCpDGExhANEmYihtAYQmMIjSE0bwAAAP//k
HQdRIWYzToAAAAASUVORK5CYII=","waku-enabled":true,"dapps-address":"0xFeAc9060EfD09153da418aeC627980fd67C829FC","wallet/visible-tokens":{"mainnet":["SNT"]},"appearance":0,"networks/current-net
work":"mainnet_rpc","public-key":"0x04119c3ae9a9745a41286fe099831f58e8f3367392c7061437ea1f5737f6dfd0dd7d450e02b6dcddd718e13e76868727f31d5fbfe7e7baca7d04a6fb84db732a10","installation-id":"5d6
bc316-a97e-5b89-9541-ad01f8eb7397"}         


DEBUG [status-im.native-module.core:55] - ================== [accounts-data]  [{"public-key":"0x0407501b7266ad205c96534cdcefe6d773889eff47a86a942ab7fcda96412a45d2fb401a6ee3b9e93b081e742a1b83
36682d6ed392e6c00978c2e205e2a04c01dd","address":"0xFeAc9060EfD09153da418aeC627980fd67C829FC","color":"#4360df","wallet":true,"path":"m/44'/60'/0'/0/0","name":"Status account"},{"public-key":
"0x04119c3ae9a9745a41286fe099831f58e8f3367392c7061437ea1f5737f6dfd0dd7d450e02b6dcddd718e13e76868727f31d5fbfe7e7baca7d04a6fb84db732a10","address":"0x92c0e9f298C6Ab0B3f155E9049F2450c44D9c2B7",
"name":"Delectable Overjoyed Nauplius","photo-path":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAmElEQVR4nOzX4QmAIBBA4Yp2aY52aox2ao6mqf+SoajwON73M0J4HBy6TEEYQmMIjSE
0htCECVlbDziv+/n6fuzb3OP/UmEmYgiNITRNm+LPqO2UE2YihtAYQlN818ptoZzau1btOakwEzGExhCa5hdi7d2p1zZLhZmIITSG0PhCpDGExhANEmYihtAYQmMIjSE0bwAAAP//kHQdRIWYzToAAAAASUVORK5CYII=","path":"m/43'/60'/1581'
/0'/0","chat":true}]                                                                                                


*/

//call the function
// var result = libstatus.StartNode(`{"ClusterConfig":{"Enabled":true,"Fleet":"eth.prod","BootNodes":["enode://5395aab7833f1ecb671b59bf0521cf20224fe8162fc3d2675de4ee4d5636a75ec32d13268fc184df8d1ddfa803943906882da62a4df42d4fccf6d17808156a87@178.128.140.188:443","enode://5405c509df683c962e7c9470b251bb679dd6978f82d5b469f1f6c64d11d50fbd5dd9f7801c6ad51f3b20a5f6c7ffe248cc9ab223f8bcbaeaf14bb1c0ef295fd0@35.223.215.156:443","enode://23d0740b11919358625d79d4cac7d50a34d79e9c69e16831c5c70573757a1f5d7d884510bc595d7ee4da3c1508adf87bbc9e9260d804ef03f8c1e37f2fb2fc69@47.52.106.107:443","enode://436cc6f674928fdc9a9f7990f2944002b685d1c37f025c1be425185b5b1f0900feaf1ccc2a6130268f9901be4a7d252f37302c8335a2c1a62736e9232691cc3a@178.128.138.128:443"],"TrustedMailServers":["enode://7aa648d6e855950b2e3d3bf220c496e0cae4adfddef3e1e6062e6b177aec93bc6cdcf1282cb40d1656932ebfdd565729da440368d7c4da7dbd4d004b1ac02bf8@178.128.142.26:443","enode://e85f1d4209f2f99da801af18db8716e584a28ad0bdc47fbdcd8f26af74dbd97fc279144680553ec7cd9092afe683ddea1e0f9fc571ebcb4b1d857c03a088853d@47.244.129.82:443","enode://44160e22e8b42bd32a06c1532165fa9e096eebedd7fa6d6e5f8bbef0440bc4a4591fe3651be68193a7ec029021cdb496cfe1d7f9f1dc69eb99226e6f39a7a5d4@35.225.221.245:443","enode://ee2b53b0ace9692167a410514bca3024695dbf0e1a68e1dff9716da620efb195f04a4b9e873fb9b74ac84de801106c465b8e2b6c4f0d93b8749d1578bfcaf03e@104.197.238.144:443","enode://c42f368a23fa98ee546fd247220759062323249ef657d26d357a777443aec04db1b29a3a22ef3e7c548e18493ddaf51a31b0aed6079bd6ebe5ae838fcfaf3a49@178.128.142.54:443","enode://30211cbd81c25f07b03a0196d56e6ce4604bb13db773ff1c0ea2253547fafd6c06eae6ad3533e2ba39d59564cfbdbb5e2ce7c137a5ebb85e99dcfc7a75f99f55@23.236.58.92:443"],"StaticNodes":["enode://ce559a37a9c344d7109bd4907802dd690008381d51f658c43056ec36ac043338bd92f1ac6043e645b64953b06f27202d679756a9c7cf62fdefa01b2e6ac5098e@134.209.136.123:443","enode://fbeddac99d396b91d59f2c63a3cb5fc7e0f8a9f7ce6fe5f2eed5e787a0154161b7173a6a73124a4275ef338b8966dc70a611e9ae2192f0f2340395661fad81c0@34.67.230.193:443"],"RendezvousNodes":["/ip4/178.128.140.188/tcp/30703/ethv4/16Uiu2HAmLqTXuY4Sb6G28HNooaFUXUKzpzKXCcgyJxgaEE2i5vnf","/ip4/47.52.106.107/tcp/30703/ethv4/16Uiu2HAmEHiptiDDd9gqNY8oQqo8hHUWMHJzfwt5aLRdD6W2zcXR","/ip4/47.75.99.169/tcp/30703/ethv4/16Uiu2HAmV8Hq9e3zm9TMVP4zrVHo3BjqW5D6bDVV6VQntQd687e4"]},"DataDir":"./data1","LogLevel":"DEBUG","Rendezvous":true,"LogEnabled":true,"BrowsersConfig":{"Enabled":true},"MailserversConfig":{"Enabled":true},"RequireTopics":{"whisper":{"Min":2,"Max":2}},"WakuConfig":{"Enabled":true,"BloomFilterMode":null,"LightClient":true,"MinimumPoW":0.001},"UpstreamConfig":{"Enabled":true,"URL":"https://mainnet.infura.io/v3/f315575765b14720b32382a61a89341a"},"ListenAddr":":30304","PermissionsConfig":{"Enabled":true},"NetworkId":1,"Name":"StatusIM","EnableNTPSync":true,"NoDiscovery":false,"ShhextConfig":{"VerifyENSURL":"https://mainnet.infura.io/v3/f315575765b14720b32382a61a89341a","VerifyTransactionChainID":1,"BackupDisabledDataDir":"./data2","InstallationID":"1d7a8389-a405-5e59-9b43-46dfc0b11090","DataSyncEnabled":true,"PFSEnabled":true,"MailServerConfirmations":true,"MaxMessageDeliveryAttempts":6,"VerifyTransactionURL":"https://mainnet.infura.io/v3/f315575765b14720b32382a61a89341a","VerifyENSContractAddress":"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"},"WalletConfig":{"Enabled":true},"StatusAccountsConfig":{"Enabled":true},"KeyStoreDir":"./data3","LogDir":"./data4","LogFile":"geth.log"}`);


/*
setTimeout(() => {
   var a = libstatus.CallRPC(`{"jsonrpc": "2.0", "method": "shh_version", "params": [], "id": 1}`)
   console.log(a);
}, 2000);
*/
setInterval(() => {console.log(".")}, 5000);
