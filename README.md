# Fluany

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/fluany](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fluany?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Fluany is a chrome extension to practise a foreign language fast and easy, to improve your communication skills while you're surfing the Internet.

## How Can I Contribute?
  Read [Contributing to Fluany](CONTRIBUTING.md)
  
## How to run development environment

You should do this before editing any code to see how it works.

1. run `gulp` which will start webpack-dev-server
2. in Chrome open `chrome://extensions/`
3. check `Developer mode`
4. click on `Load unpacked extension`
5. add REPOSITORY_DIRECTORY/build
6. Now you can check background script via link in extension `Inspect views: background page` and you will see some messages in console
7. Navigate to any http or **https** page and open development tools and console. You can see messages from content scripts.
8. Find extension icon right from adress bar.
  1. Click with left mouse button to show html content
  2. Click with right mouse button and select `Inspect Popup`. Then in console you can see some messages
9. You can edit your codebase with almost 100% hot/full reload support.

