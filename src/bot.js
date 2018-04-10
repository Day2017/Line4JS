const LineConnect = require('./connect');
let LINE = require('./main.js');

const auth = {
	authToken: 'Ertwgrql4DWCijEADML7.PSfR/sYxdbDnc8C0Pwa9vW.wd6BKEsoWmnh/Tn8hY9Waf32dmae9SfrPkS/U6eh5yg=',
	certificate: '33a41478f8dd29107cb257c5a51eae1c58dd33e1d29d065e6a09b90daf3e0f45',
}
let client =  new LineConnect(auth);
//let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
