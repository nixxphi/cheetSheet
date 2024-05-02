const axios = require('axios');

const encodedParams = new URLSearchParams();
encodedParams.set('sender', 'MessageBird');
encodedParams.set('body', 'This is a gsm 7-bit test message.');
encodedParams.set('destination', '31600000001,31600000002');
encodedParams.set('reference', '268431687');
encodedParams.set('timestamp', '201308020025');
encodedParams.set('replacechars', 'checked');
encodedParams.set('type', 'normal');
encodedParams.set('dlr_url', 'http://www.example.com/dlr-messagebird.php');

const options = {
  method: 'POST',
  url: 'https://messagebird-sms-gateway.p.rapidapi.com/sms',
  params: {
    username: '<REQUIRED>',
    password: '<REQUIRED>'
  },
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '7a98b1419fmsh5cc11d934e5bb3bp1ac46bjsn5bf889772c43',
    'X-RapidAPI-Host': 'messagebird-sms-gateway.p.rapidapi.com'
  },
  data: encodedParams,
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
