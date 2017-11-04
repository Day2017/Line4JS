const LineConnect = require('./connect');
let LINE = require('./main.js');

const auth = {
	authToken: 'EmFcAwCbnFybbGzry2s2.isi7lEmjXqxFrk0Elt+K8G.U8cbAzEb76BhW+5kGm6EJM8UNzm89Jz5lTWou2xvmYo=',
	certificate: '7268ab9fd5290d9402b1118544a2d3ca8d14e17edc2fc29d32e7c2736d002147',
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
