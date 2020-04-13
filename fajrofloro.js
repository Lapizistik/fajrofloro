
const api = new JitsiMeetExternalAPI('meet.nimmerland.berlin', {
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

function participantJoined(p) {
		const pid = p.id;

		const msgid = 'msg-' + pid;
		const receivedid = 'received-' + pid;
		const buttonid = 'button-' + pid;

		const html = '<tr><td>' + p.displayName +
					'</td><td>' + pid +
					'</td><td><input id="' + msgid +
					'" type="text" value="xxx" /></td><td><button id="' + buttonid +
					'">send</button></td><td id="' + receivedid +
					'"></tr>';
		
		participantListDOM.insertAdjacentHTML('beforeend', html);
		let button = document.getElementById(buttonid);
		let msg = document.getElementById(msgid);
		button.addEventListener('click', event => {
				api.executeCommand('sendEndpointTextMessage',pid,msg.value);
		});
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

api.on('incomingMessage', incomingMessage);
api.on('outgoingMessage', outgoingMessage);

api.on('participantJoined', participantJoined);
api.on('endpointTextMessageReceived', endpointTextMessageReceived);

//alert('Ho');
