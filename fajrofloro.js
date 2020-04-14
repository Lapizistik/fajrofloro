
const api = new JitsiMeetExternalAPI('meet.jit.si', {
		roomName: 'fajrofloro',
		parentNode: document.querySelector('#jitsi'),
		configOverwrite_: {
//				startAudioOnly: false,
//				startWithAudioMuted: false,
//				disableThirdPartyRequests: true
//				disableDeepLinking: true 
				openBridgeChannel: true
		},
		interfaceConfigOverwrite_: {
				MOBILE_APP_PROMO: false
		}
});

let receivedMsg = null;

const gamezone = document.getElementById('game');

const participantListDOM = document.getElementById('participantList');

function showDebug(m) {
		
}

function participantJoined(p) {
		const pid = p.id;

		const rowid = 'row-' + pid;

		if(document.getElementById(rowid)) { return; }

		const msgid = 'msg-' + pid;
		const receivedid = 'received-' + pid;
		const buttonid = 'button-' + pid;

		const html = '<tr id="' + rowid + 
					'"><td>' + p.displayName +
					'</td><td>' + pid +
					'</td><td><input id="' + msgid +
					'" type="text" value="xxx" /></td><td><button id="' + buttonid +
					'">send</button></td><td id="' + receivedid +
					'"></tr>';
		
		participantListDOM.insertAdjacentHTML('beforeend', html);
		const button = document.getElementById(buttonid);
		const msg = document.getElementById(msgid);
		button.addEventListener('click', event => {
				api.executeCommand('sendEndpointTextMessage', pid, msg.value);
		});
}

function participantLeft(p) {
		const rowid = 'row-' + p.id;
		document.getElementById(rowid).remove();
}

function endpointTextMessageReceived(msg) {
		receivedMsg = msg; // debugging

		const pid = msg.data.senderInfo.id;
		const element = document.getElementById('received-' + pid);
		element.textContent = msg.data.eventData.text;
}

function incomingMessage(msg) {
		alert('incoming: '+msg.message);
}

function outgoingMessage(msg) {
		alert('outgoing: '+msg.message);
}


function main() {
		api.on('incomingMessage', incomingMessage);
		api.on('outgoingMessage', outgoingMessage);
		
		api.on('participantJoined', participantJoined);
		api.on('participantLeft', participantLeft);
		api.on('endpointTextMessageReceived', endpointTextMessageReceived);


		const iframe = document.getElementById('jitsi').firstChild; 
		function reloadJitsi() {
				const url = iframe.src;
				iframe.src='';
				setTimeout(() => { iframe.src = url; }, 200);
		}

		const button = document.getElementById('reloadbutton');
		button.addEventListener('click', reloadJitsi);
}
//alert('Ho');

main();
