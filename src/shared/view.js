/*
* [INVALID]
           NEED to be REACTJS
*/

export let view = (function(){

	let options = {
		colorSuccess: '',
		colorWarning: '',
		colorError: '',
		colorInfo: '',
		colorNeutral: '',
		colorText: '',
		animationDelay: 300,
		backgroundClickDismiss: true
	};

	/** Alert **/
	var wasClickedCounter = 0,
	  alertOuter = document.createElement('div'); // create alert container

	alertOuter.id = 'notie-alert-outer';

	// Hide alert on click
	alertOuter.onclick = function() {
		clearTimeout(alertTimeout1);
		clearTimeout(alertTimeout2);
		alertHide();
	};

	// add alert to body
	document.body.appendChild(alertOuter);

	// create alert inner container
	let alertInner = document.createElement('div');
	alertInner.id = 'notie-alert-inner';
	alertOuter.appendChild(alertInner);

	// create alert content container
	let alertContent = document.createElement('div');
	alertContent.id = 'notie-alert-content';
	alertInner.appendChild(alertContent);

	// Initialize alert text
	let alertText = document.createElement('span');
	alertText.id = 'notie-alert-text';
	alertContent.appendChild(alertText);

	// alert helper variables
	let alertIsShowing = false;
	let alertTimeout1;
	let alertTimeout2;

	function alert(type, message, seconds) {
		if ( options.colorText.length > 0 ) {
			alertText.style.color = options.colorText;
		}

		blur();

    	wasClickedCounter++;
		setTimeout(function() {
			wasClickedCounter--;
		}, (options.animationDelay + 10));

		if (wasClickedCounter === 1) {

			if (alertIsShowing) {
				clearTimeout(alertTimeout1);
				clearTimeout(alertTimeout2);
				alertHide(function() {
					alertShow(type, message, seconds);
				});

			}else {
				alertShow(type, message, seconds);
			}

		}
	}

	function alertShow(type, message, seconds) {
		alertIsShowing = true;
		let duration = 0;
		if ( typeof seconds === 'undefined' || seconds === 0 ) {
			let duration = 86400000;
		}
		else
			if ( seconds > 0 && seconds < 1 ) {
				duration = 1000;
			}
		else {
			duration = seconds * 1000;
		}

		// Remove all color classes first
		removeClass(alertOuter, 'notie-background-success');
		removeClass(alertOuter, 'notie-background-warning');
		removeClass(alertOuter, 'notie-background-error');
		removeClass(alertOuter, 'notie-background-info');

		// Set notie type (background color)
		switch(type) {
			case 1:
				if ( options.colorSuccess.length > 0 ){
					alertOuter.style.backgroundColor = options.colorSuccess;
				} else {
					addClass(alertOuter, 'notie-background-success');
				}
				break;
			case 2:
				if ( options.colorWarning.length > 0 ) {
					alertOuter.style.backgroundColor = options.colorWarning;
				} else {
					addClass(alertOuter, 'notie-background-warning');
				}
				break;
			case 3:
				if ( options.colorError.length > 0 ){
					alertOuter.style.backgroundColor = options.colorError;
				} else {
					addClass(alertOuter, 'notie-background-error');
				}
				break;
			case 4:
				if ( options.colorInfo.length > 0 ){
					alertOuter.style.backgroundColor = options.colorInfo;
				} else {
					addClass(alertOuter, 'notie-background-info');
				}
				break;
		}
		// Set notie text
		alertText.innerHTML = message;
		alertOuter.style.top = '-10000px';
		alertOuter.style.display = 'table';
		alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';

		alertTimeout1 = setTimeout(function() {
			addClass(alertOuter, 'notie-transition');
				alertOuter.style.top = 0;
				alertTimeout2 = setTimeout(function() {
					alertHide(function() {
					//(╯°□°）╯
					});
			}, duration);
		}, 20);
  }

	function alertHide(callback) {
		alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';
		setTimeout(function() {

			removeClass(alertOuter, 'notie-transition');
			alertOuter.style.top = '-10000px';
			alertIsShowing = false;

			if ( callback ) {
				callback();
			}

		}, ( options.animationDelay + 10 ));
	}

	let inputOuter = document.createElement('div');
	inputOuter.id = 'notie-input-outer';

	let inputBackground = document.createElement('div');
	inputBackground.id = 'notie-input-background';
	addClass(inputBackground, 'notie-transition');

	let inputInner = document.createElement('div');
	inputInner.id = 'notie-input-inner';
	inputOuter.appendChild(inputInner);

	let inputField = document.createElement('input');
	inputField.id = 'notie-input-field';
	inputField.setAttribute('autocomplete', 'off');
	inputField.setAttribute('autocorrect', 'off');
	inputField.setAttribute('autocapitalize', 'off');
	inputField.setAttribute('spellcheck', 'false');
	inputOuter.appendChild(inputField);

	let inputYes = document.createElement('div');
	inputYes.id = 'notie-input-yes';
	inputOuter.appendChild(inputYes);

	let inputNo = document.createElement('div');
	inputNo.id = 'notie-input-no';
	inputOuter.appendChild(inputNo);

	let inputText = document.createElement('span');
	inputText.id = 'notie-input-text';
	inputInner.appendChild(inputText);

	let inputTextYes = document.createElement('span');
	inputTextYes.id = 'notie-input-text-yes';
	inputYes.appendChild(inputTextYes);

	let inputTextNo = document.createElement('span');
	inputTextNo.id = 'notie-input-text-no';
	inputNo.appendChild(inputTextNo);

	// Attach input elements to the body element
	document.body.appendChild(inputOuter);
	document.body.appendChild(inputBackground);

	// Hide input on no click and background click
	inputBackground.onclick = function() {
	    if ( options.backgroundClickDismiss ) {
	        inputHide();
	    }
	};

	// input helper variables
	let inputIsShowing = false;

	function input(settings, title, submitText, cancelText, submitCallback, cancelCallback) {
		if (options.colorInfo.length > 0) inputInner.style.backgroundColor = options.colorInfo;
		if (options.colorSuccess.length > 0) inputYes.style.backgroundColor = options.colorSuccess;
		if (options.colorError.length > 0) inputNo.style.backgroundColor = options.colorError;
		if (options.colorText.length > 0) {
			inputText.style.color = options.colorText;
			inputTextYes.style.color = options.colorText;
			inputTextNo.style.color = options.colorText;
		}
		blur();
		if ( typeof settings.type !== 'undefined' && settings.type ) {
			inputField.setAttribute('type', settings.type);
		} else {
			inputField.setAttribute('type', 'text');
		}
		if ( typeof settings.placeholder !== 'undefined' && settings.placeholder ) {
			inputField.setAttribute('placeholder', settings.placeholder);
		} else {
			// Do not set placeholder
		}
	  if ( typeof settings.prefilledValue !== 'undefined' && settings.prefilledValue ) {
			inputField.value = settings.prefilledValue;
		} else {
			inputField.value = '';
		}

	  if ( alertIsShowing ) {
	    // Hide alert
	    clearTimeout(alertTimeout1);
	    clearTimeout(alertTimeout2);
	    alertHide(function() {
	        inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
	    });
	  } else {
	    inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
	  }

	}

	function inputShow(title, submitText, cancelText, submitCallback, cancelCallback) {
	  scrollDisable();
	  // Yes callback function
	  inputYes.onclick = function() {
	    inputHide();
			if (submitCallback) {
				setTimeout(function() {
					submitCallback(inputField.value);
				}, (options.animationDelay + 10));
			}
		}
		// No callback function
		inputNo.onclick = function() {
			inputHide();
			if (cancelCallback) {
				setTimeout(function() {
					cancelCallback(inputField.value);
				}, (options.animationDelay + 10));
			}
		}

		function inputShowInner() {
	    // Set input text
	    inputText.innerHTML = title;
	    inputTextYes.innerHTML = submitText;
	    inputTextNo.innerHTML = cancelText;

	    // Get input's height
	    inputOuter.style.top = '-10000px';
	    inputOuter.style.display = 'table';
	    inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
	    inputBackground.style.display = 'block';

	    setTimeout(function() {
				addClass(inputOuter, 'notie-transition');
	      inputOuter.style.top = 0;
	      inputBackground.style.opacity = '0.75';

	      setTimeout(function() {
		      inputIsShowing = true;
					inputField.focus();
	    	}, (options.animationDelay + 10));

	    }, 20);
		}

		if ( inputIsShowing ) {
		    inputHide();
		    setTimeout(function() {
		        inputShowInner();
		    }, (options.animationDelay + 10));
		} else {
		    inputShowInner();
		}
	}

	function inputHide() {

	  inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
	  inputBackground.style.opacity = '0';
	  setTimeout(function() {
			removeClass(inputOuter, 'notie-transition');
			inputBackground.style.display = 'none';
			inputOuter.style.top = '-10000px';
			scrollEnable();
			inputIsShowing = false;
		}, (options.animationDelay + 10));
	}
// Select
  var confirmOuter = document.createElement('div');
  confirmOuter.id = 'notie-confirm-outer';

  var confirmInner = document.createElement('div');
  confirmInner.id = 'notie-confirm-inner';
  confirmOuter.appendChild(confirmInner);

  var confirmText = document.createElement('span');
  confirmText.id = 'notie-confirm-text';
  confirmInner.appendChild(confirmText);

  var confirmYes = document.createElement('div');
  confirmYes.id = 'notie-confirm-yes';
  confirmOuter.appendChild(confirmYes);

  var confirmNo = document.createElement('div');
  confirmNo.id = 'notie-confirm-no';
  confirmOuter.appendChild(confirmNo);

  var confirmTextYes = document.createElement('span');
  confirmTextYes.id = 'notie-confirm-text-yes';
  confirmYes.appendChild(confirmTextYes);

  var confirmTextNo = document.createElement('span');
  confirmTextNo.id = 'notie-confirm-text-no';
  confirmNo.appendChild(confirmTextNo);

  var confirmBackground = document.createElement('div');
  confirmBackground.id = 'notie-confirm-background';
  addClass(confirmBackground, 'notie-transition');

  // Hide notie.confirm on no click and background click
  confirmBackground.onclick = function () {
    if (options.backgroundClickDismiss) {
      confirmHide();
    }
  }

  // Attach confirm elements to the body element
  document.body.appendChild(confirmOuter);
  document.body.appendChild(confirmBackground);

	// confirm helper variables
  var confirmIsShowing = false;

  function confirm (title, yesText, noText, yesCallback, noCallback) {
    if ( options.colorInfo.length > 0 ){
    	confirmInner.style.backgroundColor = options.colorInf;
    }

    if ( options.colorSuccess.length > 0 ){
    	confirmYes.style.backgroundColor = options.colorSuccess;
    }

    if ( options.colorError.length > 0 ){
    	confirmNo.style.backgroundColor = options.colorError;
    }

    if ( options.colorText.length > 0 ) {
      confirmText.style.color = options.colorText;
      confirmTextYes.style.color = options.colorText;
      confirmTextNo.style.color = options.colorText;
    }

    blur()

    if ( alertIsShowing ) {
    // Hide notie.alert
      alertHide(function () {
        confirmShow(title, yesText, noText, yesCallback, noCallback);
      });
    } else {
      confirmShow(title, yesText, noText, yesCallback, noCallback);
    }
  }

  function confirmShow (title, yesText, noText, yesCallback, noCallback) {
    scrollDisable();

    // Yes callback function
    confirmYes.onclick = function () {
      confirmHide();
      if ( yesCallback ) {
        setTimeout(function () {
          yesCallback()
        }, (options.animationDelay + 10));
      }
    }

    // No callback function
    confirmNo.onclick = function () {
      confirmHide();
      if ( noCallback ) {
        setTimeout(function () {
          noCallback()
        }, (options.animationDelay + 10));
      }
    }

    function confirmShowInner () {
      // Set confirm text
      confirmText.innerHTML = title;
      confirmTextYes.innerHTML = yesText;
      confirmTextNo.innerHTML = noText;

      // Get confirm's height
      confirmOuter.style.top = '-10000px';
      confirmOuter.style.display = 'table';
      confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
      confirmBackground.style.display = 'block';

      setTimeout(function () {
        addClass(confirmOuter, 'notie-transition');

        confirmOuter.style.top = 0;
        confirmBackground.style.opacity = '0.75';

        setTimeout(function () {
          confirmIsShowing = true;
        }, (options.animationDelay + 10));

      }, 20);

    }

    if ( confirmIsShowing ) {
      confirmHide();
      setTimeout(function () {
        confirmShowInner();
      }, (options.animationDelay + 10))
    } else {
      confirmShowInner();
    }
  }

  function confirmHide () {
    confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px'
    confirmBackground.style.opacity = '0'

    setTimeout(function () {
      removeClass(confirmOuter, 'notie-transition');
      confirmOuter.style.top = '-10000px';
      confirmBackground.style.display = 'none';

      scrollEnable();

      confirmIsShowing = false;
    }, (options.animationDelay + 10));

  }
	// Internal helper functions
	function addClass(element, className) {
		if ( element.classList ) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}

	function removeClass(element, className) {
		if ( element.classList ) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	function blur() {
		document.activeElement.blur();
	}

	let originalBodyHeight,
	  originalBodyOverflow;

	function scrollDisable() {
	  originalBodyHeight = document.body.style.height;
	  originalBodyOverflow = document.body.style.overflow;
	  document.body.style.height = '100%';
	  document.body.style.overflow = 'hidden';
	}

	function scrollEnable() {
	  document.body.style.height = originalBodyHeight;
	  document.body.style.overflow = originalBodyOverflow;
	}

	window.addEventListener('keydown', function (event) {
		var enterClicked = ( event.which === 13 || event.keyCode === 13 )
		var escapeClicked = ( event.which === 27 || event.keyCode === 27 )
		if ( alertIsShowing ) {
		  if ( enterClicked || escapeClicked ) {
		    alertHide();
		    scrollEnable();
		  }
		} else if ( inputIsShowing ) {
				if (enterClicked) {
					inputYes.click();
				} else if ( escapeClicked ) {
					inputHide();
				}
			}
	});

	return {
		alert: alert,
		input: input
	}
}());
