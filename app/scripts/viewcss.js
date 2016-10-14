'use strict';

/*
*
* 	His was tested in IE (7-9), Firefox, Opera and Chrome:
* 	Dynamic style
*
*/

var css = '.notie-transition {\n\t-moz-transition: all 0.3s ease;\n\t-webkit-transition: all 0.3s ease;\n\ttransition: all 0.3s ease; }\n\n\t.notie-background-success {\n\t  background-color: #57BF57; }\n\n\t.notie-background-warning {\n\t  background-color: #D6A14D; }\n\n\t.notie-background-error {\n\t  background-color: #E1715B; }\n\n\t.notie-background-info {\n\t  background-color: #4D82D6; }\n\n\t#notie-alert-outer, #notie-confirm-outer, #notie-input-outer, #notie-select-outer {\n\t  position: fixed;\n\t  top: 0;\n\t  left: 0;\n\t  z-index: 999999999;\n\t  height: auto;\n\t  width: 100%;\n\t  display: none;\n\t  text-align: center;\n\t  cursor: pointer;\n\t  font-size: 24px;\n\t  -o-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  -ms-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); }\n\t  @media (max-width: 600px) {\n\t    #notie-alert-outer, #notie-confirm-outer, #notie-input-outer, #notie-select-outer {\n\t      font-size: 18px; } }\n\n\t#notie-alert-inner {\n\t  padding: 20px;\n\t  display: table-cell; }\n\n\t#notie-alert-content {\n\t  max-width: 900px;\n\t  margin: 0 auto; }\n\n\t#notie-alert-text {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-outer {\n\t  cursor: default; }\n\n\t#notie-confirm-inner, #notie-input-inner, #notie-select-inner {\n\t  box-sizing: border-box;\n\t  width: 100%;\n\t  padding: 20px;\n\t  display: block;\n\t  cursor: default;\n\t  background-color: #4D82D6; }\n\n\t#notie-confirm-text {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-text-yes {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-text-no {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-yes, #notie-confirm-no, #notie-input-no, #notie-input-yes {\n\t  float: left;\n\t  height: 50px;\n\t  line-height: 50px;\n\t  width: 50%;\n\t  cursor: pointer;\n\t  background-color: #57BF57; }\n\n\t#notie-confirm-no, #notie-input-no {\n\t  float: right;\n\t  background-color: #E1715B; }\n\n\t#notie-confirm-background, #notie-input-background, #notie-select-background {\n\t  position: fixed;\n\t  top: 0;\n\t  left: 0;\n\t  z-index: 999999980;\n\t  height: 100%;\n\t  width: 100%;\n\t  display: none;\n\t  background-color: #FFFFFF;\n\t  opacity: 0; }\n\n\t/* INPUT */\n\t#notie-input-outer {\n\t  cursor: default; }\n\n\t#notie-input-field {\n\t  display: block;\n\t  box-sizing: border-box;\n\t  height: 55px;\n\t  width: 100%;\n\t  text-align: center;\n\t  outline: 0;\n\t  border: 0;\n\t  margin: 0;\n\t  background-color: #FFFFFF;\n\t  font-family: inherit;\n\t  font-size: 24px; }\n\t  @media (max-width: 600px) {\n\t    #notie-input-field {\n\t      font-size: 18px; } }\n\n\t#notie-input-text {\n\t  color: #FFFFFF; }\n\n\t#notie-input-text-yes {\n\t  color: #FFFFFF; }\n\n\t#notie-input-text-no {\n\t  color: #FFFFFF; }\n\n\t#notie-select-outer {\n\t  top: auto;\n\t  bottom: 0;\n\t  cursor: default; }\n\n\t#notie-select-text {\n\t  color: #FFFFFF; }\n\n\t#notie-select-choices, .notie-select-choice {\n\t  background-color: #57BF57; }\n\n\t.notie-select-choice {\n\t  height: 50px;\n\t  line-height: 50px;\n\t  color: #FFFFFF;\n\t  cursor: pointer; }\n\n\t#notie-select-cancel {\n\t  height: 60px;\n\t  line-height: 60px;\n\t  color: #FFFFFF;\n\t  cursor: pointer;\n\t  background-color: #A0A0A0; }}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet) {
		style.styleSheet.cssText = css;
} else {
		style.appendChild(document.createTextNode(css));
}

head.appendChild(style);