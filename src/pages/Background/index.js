import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.from == 'content_script') {
    console.log('The request has been received from the content script.');
  }
});