(function() {
	'use strict';
	var S_KEYCODE = 83;
	var L_KEYCODE = 76;
	var R_KEYCODE = 82;

	function StopWatch(node) {
		this.node = node;
		// STATUS - false: stopwatch stopped, true: stopwatch go
		this.STATUS = false;
		this.timerId = 0;
		this.timeNow = 0;
		this.currentTimer = null;

		this.node.innerHTML  = this._createHTML();

		this.StopWatchTimeNode = this.node.getElementsByClassName('stopwatch-current')[0];
		this.StopWatchTimeNode.innerHTML = this.formatTime(0);
		this.StartStopButtonNode = this.node.getElementsByClassName('btn-primary')[0];
		this.ResetButtonNode = this.node.getElementsByClassName('btn-danger')[0];
		this.AddLapButton = this.node.getElementsByClassName('btn-info')[0];
		this.LapsNode = this.node.getElementsByClassName('stopwatch-laps')[0];

		if (!StopWatch.currentStopWatch) {
			StopWatch.currentStopWatch = this;
		}

		this.init();
	}

	StopWatch.prototype._createHTML = function () {
		var StopWatchHTML =
		'<div class="stopwatch-container">' +
		'<div class="row">' +
		'<div class="col-xs-4">' +
		'<h2 class="stopwatch-current"></h2>' +
		'<div class="stopwatch-laps">' +
		'</div>' +
		'</div>' +
		'<div class="col-xs-4 stopwatch-controls">' +
		'<div class="btn-group btn-group-lg">' +
		'<button class="btn btn-primary">Start</button>' +
		'<button class="btn btn-info">Lap</button>' +
		'</div>' +
		'<button class="btn btn-danger btn-sm">Reset</button>' +
		'</div>' +
		'</div>' +
		'</div>';

		return StopWatchHTML;
	}

	StopWatch.prototype.StartStop = function () {
		var _this = this;
		if (this.STATUS === false) {
			this.StartStopButtonNode.innerHTML = 'Stop';
			this.STATUS = true;

			this.timeNow = (this.timeNow === 0) ? new Date().getTime() : new Date().getTime() - this.timeNow;

			this.timerId = setInterval(function () {
				_this.StopWatchTimeNode.innerHTML = _this.formatTime(new Date().getTime() - _this.timeNow);
			}, 16);
		} else {
			this.StartStopButtonNode.innerHTML = 'Start';
			this.STATUS = false;

			this.timeNow = new Date().getTime() - _this.timeNow;

			clearInterval(_this.timerId);
		}
	}

	StopWatch.prototype.reset = function() {
		this.STATUS = true;
		this.StartStop();
		this.StopWatchTimeNode.innerHTML = this.formatTime(0);
		this.LapsNode.innerHTML = '';
		this.timeNow = 0;
	}

	StopWatch.prototype.formatTime = function (unix) {
		var h = 0;
		var m = 0;
		var s = 0;
		var ms = 0;

		h = Math.floor(unix / (60 * 60 * 1000));
		unix = unix % (60 * 60 * 1000);
		m = Math.floor(unix / (60 * 1000));
		unix = unix % (60 * 1000);
		s = Math.floor(unix / 1000);
		ms = unix % 1000;

		unix = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
		return unix;

		function pad(num, size) {
			var s = "0000" + num;
			return s.substr(s.length - size);
			return num;
		}
	}

	StopWatch.prototype.newLap = function() {
		var _this = this;
		var nowTime = this.StopWatchTimeNode.innerHTML;

		var elementLap = document.createElement('div');
		elementLap.className = 'alert alert-info';
		elementLap.textContent = nowTime;

		var elementLapSpan = document.createElement('span');
		elementLapSpan.textContent = '×';
		elementLapSpan.className = 'label label-danger';
		elementLap.appendChild(elementLapSpan);

		this.LapsNode.insertBefore(elementLap, this.LapsNode.firstChild);
	}

	StopWatch.prototype._onGlobalKeyup = function(event) {
		var event = event || window.event;

		if (StopWatch.currentStopWatch === this) {
			switch (event.keyCode) {
				case S_KEYCODE:
					this.StartStop.bind(this)();
					break;
				case L_KEYCODE:
					this.newLap.bind(this)();
					break;
				case R_KEYCODE:
					this.reset.bind(this)();
					break;
			}
		}

	}

	StopWatch.prototype._onGlobalLeave = function(event) {
		var _this = this;
		var event = event || window.event;

		StopWatch.currentStopWatch = this;
	}

	StopWatch.prototype.init = function() {
		var _this = this;

		TBaddEventListener(this.LapsNode, 'click', function (event) {
			if (TBeventTarget(event).className.indexOf('label-danger') != -1) {
				TBeventTarget(event).parentNode.parentNode.removeChild(TBeventTarget(event).parentNode);
			}
		});

		TBaddEventListener(this.StartStopButtonNode, 'click', this.StartStop.bind(_this));
		TBaddEventListener(this.ResetButtonNode, 'click', this.reset.bind(_this));
		TBaddEventListener(this.AddLapButton, 'click', this.newLap.bind(_this));

		TBaddEventListener(document.documentElement, 'keyup', this._onGlobalKeyup.bind(this));
		TBaddEventListener(this.node, 'mouseleave', this._onGlobalLeave.bind(this));
		TBaddEventListener(this.node, 'mouseenter', this._onGlobalLeave.bind(this));
	}

	window.StopWatch = StopWatch;
}())