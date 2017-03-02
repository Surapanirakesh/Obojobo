/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(176);


/***/ },

/***/ 9:
/***/ function(module, exports) {

	'use strict';

	var Dispatcher, NavUtil, OboModel, _getFlatList;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	OboModel = window.ObojoboDraft.Common.models.OboModel;

	_getFlatList = function getFlatList(item) {
	  var child, i, len1, list, ref;
	  list = [item];
	  if (item.showChildren) {
	    ref = item.children;
	    for (i = 0, len1 = ref.length; i < len1; i++) {
	      child = ref[i];
	      list = list.concat(_getFlatList(child));
	    }
	  }
	  return list;
	};

	NavUtil = {
	  gotoPath: function gotoPath(path) {
	    return Dispatcher.trigger('nav:gotoPath', {
	      value: {
	        path: path
	      }
	    });
	  },
	  setFlag: function setFlag(id, flagName, flagValue) {
	    return Dispatcher.trigger('nav:setFlag', {
	      value: {
	        id: id,
	        flagName: flagName,
	        flagValue: flagValue
	      }
	    });
	  },
	  goPrev: function goPrev() {
	    return Dispatcher.trigger('nav:prev');
	  },
	  goNext: function goNext() {
	    return Dispatcher.trigger('nav:next');
	  },
	  goto: function goto(id) {
	    return Dispatcher.trigger('nav:goto', {
	      value: {
	        id: id
	      }
	    });
	  },
	  lock: function lock() {
	    return Dispatcher.trigger('nav:lock');
	  },
	  unlock: function unlock() {
	    return Dispatcher.trigger('nav:unlock');
	  },
	  close: function close() {
	    return Dispatcher.trigger('nav:close');
	  },
	  open: function open() {
	    return Dispatcher.trigger('nav:open');
	  },
	  disable: function disable() {
	    return Dispatcher.trigger('nav:disable');
	  },
	  enable: function enable() {
	    return Dispatcher.trigger('nav:enable');
	  },
	  toggle: function toggle() {
	    return Dispatcher.trigger('nav:toggle');
	  },
	  openExternalLink: function openExternalLink(url) {
	    return Dispatcher.trigger('nav:openExternalLink', {
	      value: {
	        url: url
	      }
	    });
	  },
	  showChildren: function showChildren(id) {
	    return Dispatcher.trigger('nav:showChildren', {
	      value: {
	        id: id
	      }
	    });
	  },
	  hideChildren: function hideChildren(id) {
	    return Dispatcher.trigger('nav:hideChildren', {
	      value: {
	        id: id
	      }
	    });
	  },
	  getNavTarget: function getNavTarget(state) {
	    return state.itemsById[state.navTargetId];
	  },
	  getNavTargetModel: function getNavTargetModel(state) {
	    var navTarget;
	    navTarget = NavUtil.getNavTarget(state);
	    if (!navTarget) {
	      return null;
	    }
	    return OboModel.models[navTarget.id];
	  },
	  getPrev: function getPrev(state) {
	    var index, item, list, navTarget;
	    list = NavUtil.getOrderedList(state);
	    navTarget = NavUtil.getNavTarget(state);
	    index = list.indexOf(navTarget);
	    if (index === -1) {
	      return null;
	    }
	    index--;
	    while (index >= 0) {
	      item = list[index];
	      if (item.type === 'link') {
	        return item;
	      }
	      index--;
	    }
	    return null;
	  },
	  getNext: function getNext(state) {
	    var index, item, len, list, navTarget;
	    list = NavUtil.getOrderedList(state);
	    navTarget = NavUtil.getNavTarget(state);
	    index = list.indexOf(navTarget);
	    if (index === -1) {
	      return null;
	    }
	    index++;
	    len = list.length;
	    while (index < len) {
	      item = list[index];
	      if (item.type === 'link') {
	        return item;
	      }
	      index++;
	    }
	    return null;
	  },
	  getPrevModel: function getPrevModel(state) {
	    var prevItem;
	    prevItem = NavUtil.getPrev(state);
	    if (!prevItem) {
	      return null;
	    }
	    return OboModel.models[prevItem.id];
	  },
	  getNextModel: function getNextModel(state) {
	    var nextItem;
	    nextItem = NavUtil.getNext(state);
	    if (!nextItem) {
	      return null;
	    }
	    return OboModel.models[nextItem.id];
	  },
	  canNavigate: function canNavigate(state) {
	    return !state.locked && !state.disabled;
	  },
	  getOrderedList: function getOrderedList(state) {
	    return _getFlatList(state.items);
	  }
	};

	module.exports = NavUtil;

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Dispatcher,
	    NavStore,
	    NavUtil,
	    OBO,
	    OboModel,
	    Store,
	    navStore,
	    extend = function extend(child, parent) {
	  for (var key in parent) {
	    if (hasProp.call(parent, key)) child[key] = parent[key];
	  }function ctor() {
	    this.constructor = child;
	  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
	},
	    hasProp = {}.hasOwnProperty;

	NavUtil = __webpack_require__(9);

	OBO = window.OBO;

	Store = window.ObojoboDraft.Common.flux.Store;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	OboModel = window.ObojoboDraft.Common.models.OboModel;

	NavStore = function (superClass) {
	  extend(NavStore, superClass);

	  function NavStore() {
	    NavStore.__super__.constructor.call(this, 'navstore');
	    this.state = {
	      items: {},
	      itemsById: {},
	      itemsByPath: {},
	      navTargetHistory: [],
	      navTargetId: null,
	      locked: false,
	      open: false
	    };
	  }

	  NavStore.prototype.init = function (model, startingId) {
	    Dispatcher.on({
	      'nav:gotoPath': function (_this) {
	        return function (payload) {
	          return _this.gotoItem(_this.state.itemsByPath[payload.value.path]);
	        };
	      }(this),
	      'nav:setFlag': function navSetFlag(payload) {
	        var navItem;
	        navItem = this.state.itemsById[payload.value.id];
	        navItem.flags[payload.value.flagName] = payload.value.flagValue;
	        return this.triggerChange();
	      },
	      'nav:prev': function (_this) {
	        return function (payload) {
	          return _this.gotoItem(NavUtil.getPrev(_this.state));
	        };
	      }(this),
	      'nav:next': function (_this) {
	        return function (payload) {
	          return _this.gotoItem(NavUtil.getNext(_this.state));
	        };
	      }(this),
	      'nav:goto': function (_this) {
	        return function (payload) {
	          return _this.gotoItem(_this.state.itemsById[payload.value.id]);
	        };
	      }(this),
	      'nav:lock': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            locked: true
	          });
	        };
	      }(this),
	      'nav:unlock': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            locked: false
	          });
	        };
	      }(this),
	      'nav:close': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            open: false
	          });
	        };
	      }(this),
	      'nav:open': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            open: true
	          });
	        };
	      }(this),
	      'nav:disable': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            disabled: true,
	            locked: true,
	            open: false
	          });
	        };
	      }(this),
	      'nav:enable': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            disabled: false,
	            locked: false
	          });
	        };
	      }(this),
	      'nav:toggle': function (_this) {
	        return function (payload) {
	          return _this.setAndTrigger({
	            open: !_this.state.open
	          });
	        };
	      }(this),
	      'nav:openExternalLink': function (_this) {
	        return function (payload) {
	          window.open(payload.value.url);
	          return _this.triggerChange();
	        };
	      }(this),
	      'nav:showChildren': function (_this) {
	        return function (payload) {
	          var item;
	          item = _this.state.itemsById[payload.value.id];
	          item.showChildren = true;
	          return _this.triggerChange();
	        };
	      }(this),
	      'nav:hideChildren': function (_this) {
	        return function (payload) {
	          var item;
	          item = _this.state.itemsById[payload.value.id];
	          item.showChildren = false;
	          return _this.triggerChange();
	        };
	      }(this),
	      'score:set': function (_this) {
	        return function (payload) {
	          var navItem;
	          navItem = _this.state.itemsById[payload.value.id];
	          console.log('SCORE SET@*#)(%');
	          console.log(payload, navItem);
	          if (!navItem) {
	            return;
	          }
	          return NavUtil.setFlag(payload.value.id, 'correct', true);
	        };
	      }(this)
	    }, this);
	    this.state.items = this.generateNav(model);
	    return console.log(this.state.items);
	  };

	  NavStore.prototype.gotoItem = function (navItem) {
	    var navTargetModel, ref;
	    if (!navItem) {
	      return;
	    }
	    if (this.state.navTargetId != null) {
	      navTargetModel = (ref = NavUtil.getNavTargetModel(this.state)) != null ? ref.processTrigger('onNavExit') : void 0;
	      this.state.navTargetHistory.push(this.state.navTargetId);
	      this.state.itemsById[this.state.navTargetId].showChildren = false;
	    }
	    navItem.showChildren = true;
	    window.history.pushState({}, 'title123', navItem.flatPath);
	    this.state.navTargetId = navItem.id;
	    NavUtil.getNavTargetModel(this.state).processTrigger('onNavEnter');
	    return this.triggerChange();
	  };

	  NavStore.prototype.generateNav = function (model, indent) {
	    var child, childNavItem, flatPath, i, item, len, navItem, ref;
	    if (indent == null) {
	      indent = '';
	    }
	    item = OBO.getItemForType(model.get('type'));
	    navItem = null;
	    if (item.getNavItem != null) {
	      navItem = item.getNavItem(model);
	    }
	    if (navItem == null) {
	      navItem = {
	        type: 'hidden',
	        label: '',
	        path: '',
	        showChildren: true
	      };
	    }
	    console.log('GN', indent, model.get('type').substr(13), navItem);
	    navItem.flags = [];
	    navItem.children = [];
	    navItem.id = model.get('id');
	    navItem.fullPath = [].concat(navItem.path);
	    navItem.flags = {
	      visited: false,
	      complete: false,
	      correct: false
	    };
	    console.log('GN', indent, model.get('type').substr(13), 'setting fullPath to', navItem.fullPath.toString());
	    ref = model.children.models;
	    for (i = 0, len = ref.length; i < len; i++) {
	      child = ref[i];
	      childNavItem = this.generateNav(child, indent + '_');
	      navItem.children.push(childNavItem);
	      console.log(childNavItem);
	      console.log('concat', navItem.fullPath.toString(), childNavItem.fullPath.toString());
	      childNavItem.fullPath = navItem.fullPath.concat(childNavItem.fullPath);
	      console.log('GN', indent, model.get('type').substr(13), 'modified child fullPath', childNavItem, 'to', childNavItem.fullPath.toString());
	      flatPath = '/view/' + childNavItem.fullPath.join('/');
	      childNavItem.flatPath = flatPath;
	      this.state.itemsByPath[flatPath] = childNavItem;
	    }
	    this.state.itemsById[model.get('id')] = navItem;
	    console.log('create flat path', navItem.fullPath.toString(), navItem.fullPath.join('/'));
	    return navItem;
	  };

	  return NavStore;
	}(Store);

	navStore = new NavStore();

	window.__ns = navStore;

	module.exports = navStore;

/***/ },

/***/ 38:
/***/ function(module, exports) {

	'use strict';

	var APIUtil, createParsedJsonPromise;

	createParsedJsonPromise = function createParsedJsonPromise(promise) {
	  var jsonPromise;
	  jsonPromise = new Promise(function (resolve, reject) {
	    return promise.then(function (_this) {
	      return function (res) {
	        return res.json();
	      };
	    }(this)).then(function (_this) {
	      return function (json) {
	        if (json.status === 'error') {
	          console.error(json.value);
	        }
	        return resolve(json);
	      };
	    }(this))["catch"](function (_this) {
	      return function (error) {
	        return reject(error);
	      };
	    }(this));
	  });
	  return jsonPromise;
	};

	APIUtil = {
	  get: function get(endpoint) {
	    return fetch(endpoint, {
	      method: 'GET',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      }
	    });
	  },
	  post: function post(endpoint, body) {
	    if (body == null) {
	      body = {};
	    }
	    console.log('post', endpoint, body);
	    return fetch(endpoint, {
	      method: 'POST',
	      body: JSON.stringify(body),
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      }
	    });
	  },
	  postEvent: function postEvent(lo, eventAction, eventPayload) {
	    return APIUtil.post('/api/events', {
	      event: {
	        action: eventAction,
	        draft_id: lo.get('_id'),
	        draft_rev: lo.get('_rev'),
	        actor_time: new Date().toISOString(),
	        payload: eventPayload
	      }
	    });
	  },
	  saveState: function saveState(lo, state) {
	    return APIUtil.postEvent(lo, 'saveState', state);
	  },
	  fetchDraft: function fetchDraft(id) {
	    return createParsedJsonPromise(fetch("/api/drafts/" + id));
	  },
	  getAttempts: function getAttempts(lo) {
	    return createParsedJsonPromise(APIUtil.get("/api/assessments/attempts/user/4/draft/" + lo.get('_id')));
	  },
	  startAttempt: function startAttempt(lo, assessment, questions) {
	    return createParsedJsonPromise(APIUtil.post('/api/assessments/attempt/start', {
	      draftId: lo.get('_id'),
	      assessmentId: assessment.get('id'),
	      actor: 4,
	      questions: '@TODO'
	    }));
	  },
	  endAttempt: function endAttempt(attempt) {
	    console.log('EA', attempt);
	    return createParsedJsonPromise(APIUtil.post("/api/assessments/attempt/" + attempt.id + "/end"));
	  }
	};

	module.exports = APIUtil;

/***/ },

/***/ 39:
/***/ function(module, exports) {

	'use strict';

	var Dispatcher, OboModel, QuestionUtil;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	OboModel = window.ObojoboDraft.Common.models.OboModel;

	QuestionUtil = {
	  recordResponse: function recordResponse(id, response) {
	    return Dispatcher.trigger('question:recordResponse', {
	      value: {
	        id: id,
	        response: response
	      }
	    });
	  },
	  resetResponse: function resetResponse(id) {
	    return Dispatcher.trigger('question:resetResponse', {
	      value: {
	        id: id
	      }
	    });
	  },
	  setData: function setData(id, key, value) {
	    return Dispatcher.trigger('question:setData', {
	      value: {
	        key: id + ':' + key,
	        value: value
	      }
	    });
	  },
	  clearData: function clearData(id, key) {
	    return Dispatcher.trigger('question:clearData', {
	      value: {
	        key: id + ':' + key
	      }
	    });
	  },
	  viewQuestion: function viewQuestion(id) {
	    return Dispatcher.trigger('question:view', {
	      value: {
	        id: id
	      }
	    });
	  },
	  hideQuestion: function hideQuestion(id) {
	    return Dispatcher.trigger('question:hide', {
	      value: {
	        id: id
	      }
	    });
	  },
	  getViewState: function getViewState(state, model) {
	    var modelId;
	    modelId = model.get('id');
	    if (state.viewing === modelId) {
	      return 'active';
	    }
	    if (state.viewedQuestions[modelId]) {
	      return 'viewed';
	    }
	    return 'hidden';
	  },
	  getResponse: function getResponse(state, model) {
	    return state.responses[model.get('id')];
	  },
	  hasResponse: function hasResponse(state, model) {
	    return typeof state.responses[model.get('id')] !== 'undefined';
	  },
	  getData: function getData(state, model, key) {
	    return state.data[model.get('id') + ':' + key];
	  }
	};

	module.exports = QuestionUtil;

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Common, Logo, NavUtil, OBO, getBackgroundImage, logo;

	__webpack_require__(210);

	NavUtil = __webpack_require__(9);

	logo = __webpack_require__(234);

	OBO = window.OBO;

	Common = window.ObojoboDraft.Common;

	getBackgroundImage = Common.util.getBackgroundImage;

	Logo = React.createClass({
		displayName: 'Logo',

		render: function render() {
			var bg;
			bg = getBackgroundImage(logo);
			return React.createElement(
				'div',
				{ className: 'viewer--components--logo' + (this.props.inverted ? ' is-inverted' : ' is-not-inverted'), style: {
						backgroundImage: bg
					} },
				'Obojobo'
			);
		}
	});

	module.exports = Logo;

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var APIUtil,
	    AssessmentStore,
	    AssessmentUtil,
	    Dispatcher,
	    ErrorUtil,
	    OboModel,
	    QuestionUtil,
	    ScoreUtil,
	    Store,
	    assessmentStore,
	    extend = function extend(child, parent) {
	  for (var key in parent) {
	    if (hasProp.call(parent, key)) child[key] = parent[key];
	  }function ctor() {
	    this.constructor = child;
	  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
	},
	    hasProp = {}.hasOwnProperty;

	AssessmentUtil = __webpack_require__(73);

	ScoreUtil = __webpack_require__(74);

	QuestionUtil = __webpack_require__(39);

	APIUtil = __webpack_require__(38);

	Store = window.ObojoboDraft.Common.flux.Store;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	OboModel = window.ObojoboDraft.Common.models.OboModel;

	ErrorUtil = window.ObojoboDraft.Common.util.ErrorUtil;

	AssessmentStore = function (superClass) {
	  extend(AssessmentStore, superClass);

	  function AssessmentStore() {
	    AssessmentStore.__super__.constructor.call(this, 'assessmentstore');
	    this.state = {
	      assessments: {}
	    };
	    Dispatcher.on('assessment:startAttempt', function (_this) {
	      return function (payload) {
	        var id, model;
	        id = payload.value.id;
	        model = OboModel.models[id];
	        return APIUtil.startAttempt(model.getRoot(), model, {}).then(function (res) {
	          var c, child, i, len, ref;
	          if (res.status === 'error') {
	            return ErrorUtil.errorResponse(res);
	          }
	          model.children.at(1).children.reset();
	          ref = res.value.questions;
	          for (i = 0, len = ref.length; i < len; i++) {
	            child = ref[i];
	            c = OboModel.create(child);
	            console.log('ADD', child, c);
	            model.children.at(1).children.add(c);
	          }
	          if (!_this.state.assessments[id]) {
	            _this.state.assessments[id] = {
	              current: null,
	              attempts: []
	            };
	          }
	          _this.state.assessments[id].current = _this.generateNewAttempt(res.value.attemptId, res.value.questions);
	          console.log('NOW STATE IS', _this.state);
	          model.processTrigger('onStartAttempt');
	          return _this.triggerChange();
	        });
	      };
	    }(this));
	    Dispatcher.on('assessment:endAttempt', function (_this) {
	      return function (payload) {
	        var assessment, id, model;
	        console.log('ASS STATE', _this.state);
	        id = payload.value.id;
	        model = OboModel.models[id];
	        assessment = _this.state.assessments[id];
	        return APIUtil.endAttempt(assessment.current).then(function (res) {
	          if (res.status === 'error') {
	            return ErrorUtil.errorResponse(res);
	          }
	          assessment.current.questions.forEach(function (question) {
	            QuestionUtil.hideQuestion(question.id);
	            return QuestionUtil.resetResponse(question.id);
	          });
	          assessment.current.score = res.value.score;
	          assessment.attempts.push(assessment.current);
	          assessment.current = null;
	          model.processTrigger('onEndAttempt');
	          return _this.triggerChange();
	        });
	      };
	    }(this));
	    Dispatcher.on('question:setResponse', function (_this) {
	      return function (payload) {
	        var assessment, id, model, questionModel;
	        id = payload.value.id;
	        model = OboModel.models[id];
	        console.log('SET RESPONSE', payload, model);
	        assessment = AssessmentUtil.getAssessmentForModel(_this.state, model);
	        if ((assessment != null ? assessment.current : void 0) != null) {
	          questionModel = model.getParentOfType('ObojoboDraft.Chunks.Question');
	          console.log('QUESTION SET RESPONSE', questionModel);
	          APIUtil.postEvent(model.getRoot(), 'question:setResponse', {
	            attemptId: assessment.current.id,
	            questionId: questionModel.get('id'),
	            response: payload.value.response
	          });
	          return _this.triggerChange();
	        }
	      };
	    }(this));
	  }

	  AssessmentStore.prototype.generateNewAttempt = function (id, questions) {
	    return {
	      id: id,
	      questions: questions,
	      score: null
	    };
	  };

	  AssessmentStore.prototype.getState = function () {
	    return this.state;
	  };

	  AssessmentStore.prototype.setState = function (newState) {
	    return this.state = newState;
	  };

	  return AssessmentStore;
	}(Store);

	assessmentStore = new AssessmentStore();

	module.exports = assessmentStore;

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var APIUtil,
	    Dispatcher,
	    OboModel,
	    QuestionStore,
	    Store,
	    questionStore,
	    extend = function extend(child, parent) {
	  for (var key in parent) {
	    if (hasProp.call(parent, key)) child[key] = parent[key];
	  }function ctor() {
	    this.constructor = child;
	  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
	},
	    hasProp = {}.hasOwnProperty;

	APIUtil = __webpack_require__(38);

	Store = window.ObojoboDraft.Common.flux.Store;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	OboModel = window.ObojoboDraft.Common.models.OboModel;

	QuestionStore = function (superClass) {
	  extend(QuestionStore, superClass);

	  function QuestionStore() {
	    QuestionStore.__super__.constructor.call(this, 'questionStore');
	    this.state = {
	      viewing: null,
	      viewedQuestions: {},
	      responses: {},
	      data: {}
	    };
	    Dispatcher.on({
	      'question:recordResponse': function (_this) {
	        return function (payload) {
	          _this.state.responses[payload.value.id] = payload.value.response;
	          return _this.triggerChange();
	        };
	      }(this),
	      'question:resetResponse': function (_this) {
	        return function (payload) {
	          delete _this.state.responses[payload.value.id];
	          return _this.triggerChange();
	        };
	      }(this),
	      'question:setData': function (_this) {
	        return function (payload) {
	          _this.state.data[payload.value.key] = payload.value.value;
	          return _this.triggerChange();
	        };
	      }(this),
	      'question:clearData': function (_this) {
	        return function (payload) {
	          delete _this.state.data[payload.value.key];
	          return _this.triggerChange();
	        };
	      }(this),
	      'question:hide': function (_this) {
	        return function (payload) {
	          APIUtil.postEvent(OboModel.models[payload.value.id], 'question:hide', {
	            questionId: payload.value.id
	          });
	          delete _this.state.viewedQuestions[payload.value.id];
	          if (_this.state.viewing === payload.value.id) {
	            _this.state.viewing = null;
	          }
	          return _this.triggerChange();
	        };
	      }(this),
	      'question:view': function (_this) {
	        return function (payload) {
	          APIUtil.postEvent(OboModel.models[payload.value.id], 'question:view', {
	            questionId: payload.value.id
	          });
	          _this.state.viewedQuestions[payload.value.id] = true;
	          _this.state.viewing = payload.value.id;
	          return _this.triggerChange();
	        };
	      }(this)
	    });
	  }

	  QuestionStore.prototype.getState = function () {
	    return this.state;
	  };

	  QuestionStore.prototype.setState = function (newState) {
	    return this.state = newState;
	  };

	  return QuestionStore;
	}(Store);

	questionStore = new QuestionStore();

	module.exports = questionStore;

/***/ },

/***/ 72:
/***/ function(module, exports) {

	'use strict';

	var Dispatcher,
	    FocusUtil,
	    ScoreStore,
	    Store,
	    scoreStore,
	    extend = function extend(child, parent) {
	  for (var key in parent) {
	    if (hasProp.call(parent, key)) child[key] = parent[key];
	  }function ctor() {
	    this.constructor = child;
	  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
	},
	    hasProp = {}.hasOwnProperty;

	Store = window.ObojoboDraft.Common.flux.Store;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	FocusUtil = window.ObojoboDraft.Common.util.FocusUtil;

	ScoreStore = function (superClass) {
	  extend(ScoreStore, superClass);

	  function ScoreStore() {
	    ScoreStore.__super__.constructor.call(this, 'scoreStore');
	    this.state = {
	      scores: {}
	    };
	    Dispatcher.on({
	      'score:set': function (_this) {
	        return function (payload) {
	          console.log('setScore', payload);
	          _this.state.scores[payload.value.id] = payload.value.score;
	          if (payload.value.score === 100) {
	            FocusUtil.unfocus();
	          }
	          return _this.triggerChange();
	        };
	      }(this),
	      'score:clear': function (_this) {
	        return function (payload) {
	          delete _this.state.scores[payload.value.id];
	          return _this.triggerChange();
	        };
	      }(this)
	    });
	  }

	  ScoreStore.prototype.getState = function () {
	    return this.state;
	  };

	  ScoreStore.prototype.setState = function (newState) {
	    return this.state = newState;
	  };

	  return ScoreStore;
	}(Store);

	scoreStore = new ScoreStore();

	module.exports = scoreStore;

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AssessmentUtil, Dispatcher, QuestionUtil;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	QuestionUtil = __webpack_require__(39);

	AssessmentUtil = {
	  getAssessmentForModel: function getAssessmentForModel(state, model) {
	    var assessment, assessmentModel;
	    if (model.get('type') === 'ObojoboDraft.Sections.Assessment') {
	      assessmentModel = model;
	    } else {
	      assessmentModel = model.getParentOfType('ObojoboDraft.Sections.Assessment');
	    }
	    if (!assessmentModel) {
	      return null;
	    }
	    assessment = state.assessments[assessmentModel.get('id')];
	    if (!assessment) {
	      return null;
	    }
	    return assessment;
	  },
	  getLastAttemptScoreForModel: function getLastAttemptScoreForModel(state, model) {
	    var assessment;
	    assessment = AssessmentUtil.getAssessmentForModel(state, model);
	    if (!assessment) {
	      return null;
	    }
	    if (assessment.attempts.length === 0) {
	      return 0;
	    }
	    return assessment.attempts[assessment.attempts.length - 1].score;
	  },
	  getHighestAttemptScoreForModel: function getHighestAttemptScoreForModel(state, model) {
	    var assessment;
	    assessment = AssessmentUtil.getAssessmentForModel(state, model);
	    if (!assessment) {
	      return null;
	    }
	    return assessment.attempts.map(function (attempt) {
	      return attempt.score;
	    }).reduce(function (a, b) {
	      return Math.max(a, b);
	    }, 0);
	  },
	  getCurrentAttemptForModel: function getCurrentAttemptForModel(state, model) {
	    var assessment;
	    assessment = AssessmentUtil.getAssessmentForModel(state, model);
	    if (!assessment) {
	      return null;
	    }
	    return assessment.current;
	  },
	  getLastAttemptForModel: function getLastAttemptForModel(state, model) {
	    var assessment;
	    assessment = AssessmentUtil.getAssessmentForModel(state, model);
	    if (!assessment || assessment.attempts.length === 0) {
	      return null;
	    }
	    return assessment.attempts[assessment.attempts.length - 1];
	  },
	  isCurrentAttemptComplete: function isCurrentAttemptComplete(assessmentState, questionState, model) {
	    var current;
	    current = AssessmentUtil.getCurrentAttemptForModel(assessmentState, model);
	    if (!current) {
	      return null;
	    }
	    model.children.at(1).children.models.forEach(function (questionModel) {
	      if (!QuestionUtil.getResponse(questionState, questionModel)) {
	        return false;
	      }
	    });
	    return true;
	  },
	  startAttempt: function startAttempt(model) {
	    return Dispatcher.trigger('assessment:startAttempt', {
	      value: {
	        id: model.get('id')
	      }
	    });
	  },
	  endAttempt: function endAttempt(model) {
	    return Dispatcher.trigger('assessment:endAttempt', {
	      value: {
	        id: model.get('id')
	      }
	    });
	  }
	};

	module.exports = AssessmentUtil;

/***/ },

/***/ 74:
/***/ function(module, exports) {

	'use strict';

	var Dispatcher, ScoreUtil;

	Dispatcher = window.ObojoboDraft.Common.flux.Dispatcher;

	ScoreUtil = {
	  getScoreForModel: function getScoreForModel(state, model) {
	    var score;
	    score = state.scores[model.get('id')];
	    if (typeof score === "undefined" || score === null) {
	      return null;
	    }
	    return score;
	  },
	  setScore: function setScore(id, score) {
	    console.log('SET SCORE', id, score);
	    return Dispatcher.trigger('score:set', {
	      value: {
	        id: id,
	        score: score
	      }
	    });
	  },
	  clearScore: function clearScore(id) {
	    return Dispatcher.trigger('score:clear', {
	      value: {
	        id: id
	      }
	    });
	  }
	};

	module.exports = ScoreUtil;

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var InlineNavButton, NavUtil;

	__webpack_require__(209);

	NavUtil = __webpack_require__(9);

	InlineNavButton = React.createClass({
	  displayName: 'InlineNavButton',

	  onClick: function onClick() {
	    if (this.props.disabled) {
	      return;
	    }
	    switch (this.props.type) {
	      case 'prev':
	        return NavUtil.goPrev();
	      case 'next':
	        return NavUtil.goNext();
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      {
	        className: 'viewer--components--inline-nav-button' + ' is-' + this.props.type + (this.props.disabled ? ' is-disabled' : ' is-enabled'),
	        onClick: this.onClick
	      },
	      this.props.title
	    );
	  }
	});

	module.exports = InlineNavButton;

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Logo, Nav, NavUtil, arrowImg, getBackgroundImage, hamburgerImg, lockImg, navStore;

	__webpack_require__(211);

	navStore = __webpack_require__(17);

	NavUtil = __webpack_require__(9);

	Logo = __webpack_require__(69);

	hamburgerImg = __webpack_require__(232);

	arrowImg = __webpack_require__(231);

	lockImg = __webpack_require__(233);

	getBackgroundImage = window.ObojoboDraft.Common.util.getBackgroundImage;

	Nav = React.createClass({
			displayName: 'Nav',

			getInitialState: function getInitialState() {
					return {
							hover: false
					};
			},
			onClick: function onClick(item) {
					return NavUtil.gotoPath(item.flatPath);
			},
			hideNav: function hideNav() {
					return NavUtil.toggle();
			},
			onMouseOver: function onMouseOver() {
					return this.setState({
							hover: true
					});
			},
			onMouseOut: function onMouseOut() {
					return this.setState({
							hover: false
					});
			},
			render: function render() {
					var bg, list, lockEl;
					if (this.props.navState.open || this.state.hover) {
							bg = getBackgroundImage(arrowImg);
					} else {
							bg = getBackgroundImage(hamburgerImg);
					}
					if (this.props.navState.locked) {
							lockEl = React.createElement(
									'div',
									{ className: 'lock-icon' },
									React.createElement('img', { src: lockImg })
							);
					} else {
							lockEl = null;
					}
					list = NavUtil.getOrderedList(this.props.navState);
					return React.createElement(
							'div',
							{ className: 'viewer--components--nav' + (this.props.navState.locked ? ' is-locked' : ' is-unlocked') + (this.props.navState.open ? ' is-open' : ' is-closed') + (this.props.navState.disabled ? ' is-disabled' : ' is-enabled') },
							React.createElement(
									'button',
									{
											className: 'toggle-button',
											onClick: this.hideNav,
											onMouseOver: this.onMouseOver,
											onMouseOut: this.onMouseOut,
											style: {
													backgroundImage: bg,
													transform: !this.props.navState.open && this.state.hover ? 'rotate(180deg)' : '',
													filter: this.props.navState.open ? 'invert(100%)' : 'invert(0%)'
											}
									},
									'Toggle Navigation Menu'
							),
							React.createElement(
									'ul',
									null,
									list.map(function (item, index) {
											switch (item.type) {
													case 'heading':
															var isSelected = false;
															return React.createElement(
																	'li',
																	{ key: index, className: 'heading' + (isSelected ? ' is-selected' : ' is-not-select') },
																	React.createElement(
																			'a',
																			null,
																			item.label
																	)
															);
															break;

													case 'link':
															var isSelected = this.props.navState.navTargetId === item.id;
															//var isPrevVisited = this.props.navState.navTargetHistory.indexOf(item.id) > -1
															return React.createElement(
																	'li',
																	{ key: index, onClick: this.onClick.bind(null, item), className: 'link' + (isSelected ? ' is-selected' : ' is-not-select') + (item.flags.visited ? ' is-visited' : ' is-not-visited') + (item.flags.complete ? ' is-complete' : ' is-not-complete') + (item.flags.correct ? ' is-correct' : ' is-not-correct') },
																	React.createElement(
																			'a',
																			null,
																			item.label
																	),
																	lockEl
															);
															break;

													case 'sub-link':
															var isSelected = this.props.navState.navTargetIndex === index;

															return React.createElement(
																	'li',
																	{ key: index, onClick: this.onClick.bind(null, item), className: 'sub-link' + (isSelected ? ' is-selected' : ' is-not-select') + (item.flags.correct ? ' is-correct' : ' is-not-correct') },
																	React.createElement(
																			'a',
																			null,
																			item.label
																	),
																	lockEl
															);
															break;

													case 'seperator':
															return React.createElement(
																	'li',
																	{ key: index, className: 'seperator' },
																	React.createElement('hr', null)
															);
															break;

											}
									}.bind(this))
							),
							React.createElement(Logo, { inverted: true })
					);
			}
	});

	module.exports = Nav;

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AssessmentStore, Common, DOMUtil, Dispatcher, FocusBlocker, FocusStore, FocusUtil, InlineNavButton, Legacy, Logo, ModalContainer, ModalStore, ModalUtil, Nav, NavStore, NavUtil, OBO, OboModel, QuestionStore, ReactDOM, ScoreStore, Screen, SimpleDialog, ViewerApp;

	__webpack_require__(212);

	InlineNavButton = __webpack_require__(168);

	NavUtil = __webpack_require__(9);

	Logo = __webpack_require__(69);

	OBO = window.OBO;

	Common = window.ObojoboDraft.Common;

	Legacy = Common.models.Legacy;

	DOMUtil = Common.page.DOMUtil;

	Screen = Common.page.Screen;

	OboModel = Common.models.OboModel;

	Nav = __webpack_require__(170);

	ReactDOM = window.ReactDOM;

	Dispatcher = Common.flux.Dispatcher;

	ModalContainer = Common.components.ModalContainer;

	SimpleDialog = Common.components.modal.SimpleDialog;

	ModalUtil = Common.util.ModalUtil;

	FocusBlocker = Common.components.FocusBlocker;

	NavStore = __webpack_require__(17);

	ModalStore = window.ObojoboDraft.Common.stores.ModalStore;

	NavStore = __webpack_require__(17);

	ScoreStore = __webpack_require__(72);

	QuestionStore = __webpack_require__(71);

	AssessmentStore = __webpack_require__(70);

	FocusStore = ObojoboDraft.Common.stores.FocusStore;

	FocusUtil = ObojoboDraft.Common.util.FocusUtil;

	Dispatcher.on('all', function (eventName, payload) {
	  return console.log('EVENT TRIGGERED', eventName);
	});

	Dispatcher.on('viewer:alert', function (payload) {
	  return ModalUtil.show(React.createElement(
	    SimpleDialog,
	    { ok: true, title: payload.value.title },
	    payload.value.message
	  ));
	});

	ViewerApp = React.createClass({
	  displayName: 'ViewerApp',

	  getInitialState: function getInitialState() {
	    var state;
	    OBO.loadDependency('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css');
	    Dispatcher.on('viewer:scrollTo', function (payload) {
	      return ReactDOM.findDOMNode(this.refs.container).scrollTop = payload.value;
	    });
	    state = {
	      model: OboModel.create(this.props.json),
	      navState: null,
	      scoreState: null,
	      questionState: null,
	      assessmentState: null,
	      modalState: null,
	      focusState: null,
	      navTargetIndex: 0
	    };
	    NavStore.init(state.model, state.model.modelState.start);
	    state.navState = NavStore.getState();
	    state.scoreState = ScoreStore.getState();
	    state.questionState = QuestionStore.getState();
	    state.assessmentState = AssessmentStore.getState();
	    state.modalState = ModalStore.getState();
	    state.focusState = FocusStore.getState();
	    return state;
	  },
	  componentWillMount: function componentWillMount() {
	    NavStore.onChange(function (_this) {
	      return function () {
	        return _this.setState({
	          navState: NavStore.getState()
	        });
	      };
	    }(this));
	    ScoreStore.onChange(function (_this) {
	      return function () {
	        return _this.setState({
	          scoreState: ScoreStore.getState()
	        });
	      };
	    }(this));
	    QuestionStore.onChange(function (_this) {
	      return function () {
	        return _this.setState({
	          questionState: QuestionStore.getState()
	        });
	      };
	    }(this));
	    AssessmentStore.onChange(function (_this) {
	      return function () {
	        return _this.setState({
	          assessmentState: AssessmentStore.getState()
	        });
	      };
	    }(this));
	    ModalStore.onChange(function (_this) {
	      return function () {
	        return _this.setState({
	          modalState: ModalStore.getState()
	        });
	      };
	    }(this));
	    return FocusStore.onChange(function (_this) {
	      return function () {
	        return _this.setState({
	          focusState: FocusStore.getState()
	        });
	      };
	    }(this));
	  },
	  componentDidMount: function componentDidMount() {
	    return NavUtil.gotoPath(window.location.pathname);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var navTargetIndex, nextNavTargetIndex;
	    navTargetIndex = this.state.navState.navTargetIndex;
	    nextNavTargetIndex = nextstate.moduleData.navState.navTargetIndex;
	    if (this.state.navTargetIndex !== nextNavTargetIndex) {
	      this.needsScroll = true;
	      return this.setState({
	        navTargetIndex: nextNavTargetIndex
	      });
	    }
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    var el;
	    if (this.lastCanNavigate !== NavUtil.canNavigate(this.state.navState)) {
	      this.needsScroll = true;
	    }
	    this.lastCanNavigate = NavUtil.canNavigate(this.state.navState);
	    if (this.needsScroll != null) {
	      el = ReactDOM.findDOMNode(this.refs.prev);
	      if (el) {
	        ReactDOM.findDOMNode(this.refs.container).scrollTop = ReactDOM.findDOMNode(el).getBoundingClientRect().height;
	      } else {
	        ReactDOM.findDOMNode(this.refs.container).scrollTop = 0;
	      }
	      return delete this.needsScroll;
	    }
	  },
	  update: function update(json) {
	    var e, o;
	    try {
	      return o = JSON.parse(json);
	    } catch (error) {
	      e = error;
	      alert('Error parsing JSON');
	      this.setState({
	        model: this.state.model
	      });
	    }
	  },
	  onBack: function onBack() {
	    return NavUtil.goPrev();
	  },
	  onNext: function onNext() {
	    return NavUtil.goNext();
	  },
	  onMouseDown: function onMouseDown(event) {
	    if (this.state.focusState.focussedId == null) {
	      return;
	    }
	    if (!DOMUtil.findParentComponentIds(event.target).has(this.state.focusState.focussedId)) {
	      return FocusUtil.unfocus();
	    }
	  },
	  onScroll: function onScroll(event) {
	    var component, el;
	    if (this.state.focusState.focussedId == null) {
	      return;
	    }
	    component = FocusUtil.getFocussedComponent(this.state.focusState);
	    if (component == null) {
	      return;
	    }
	    el = component.getDomEl();
	    if (!el) {
	      return;
	    }
	    if (!Screen.isElementVisible(el)) {
	      return FocusUtil.unfocus();
	    }
	  },
	  render: function render() {
	    var ModuleComponent, modal, navTargetModel, navTargetTitle, nextEl, nextModel, prevEl, prevModel;
	    window.__lo = this.state.model;
	    window.__s = this.state;
	    ModuleComponent = this.state.model.getComponentClass();
	    console.log(this.props);
	    navTargetModel = NavUtil.getNavTargetModel(this.state.navState);
	    navTargetTitle = '?';
	    if (navTargetModel != null) {
	      navTargetTitle = navTargetModel.title;
	    }
	    prevModel = nextModel = null;
	    if (NavUtil.canNavigate(this.state.navState)) {
	      prevModel = NavUtil.getPrevModel(this.state.navState);
	      if (prevModel) {
	        prevEl = React.createElement(InlineNavButton, { ref: 'prev', type: 'prev', title: 'Back: ' + prevModel.title });
	      } else {
	        prevEl = React.createElement(InlineNavButton, { ref: 'prev', type: 'prev', title: 'Start of content', disabled: true });
	      }
	      nextModel = NavUtil.getNextModel(this.state.navState);
	      if (nextModel) {
	        nextEl = React.createElement(InlineNavButton, { ref: 'next', type: 'next', title: 'Next: ' + nextModel.title });
	      } else {
	        nextEl = React.createElement(InlineNavButton, { ref: 'next', type: 'next', title: 'End of content', disabled: true });
	      }
	    }
	    modal = ModalUtil.getCurrentModal(this.state.modalState);
	    return React.createElement(
	      'div',
	      { ref: 'container', onMouseDown: this.onMouseDown, onScroll: this.onScroll, className: 'viewer--viewer-app' + (this.state.navState.locked ? ' is-locked-nav' : ' is-unlocked-nav') + (this.state.navState.open ? ' is-open-nav' : ' is-closed-nav') + (this.state.navState.disabled ? ' is-disabled-nav' : ' is-enabled-nav') + ' is-focus-state-' + this.state.focusState.viewState },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'div',
	          { className: 'pad' },
	          React.createElement(
	            'span',
	            { className: 'module-title' },
	            this.state.model.title
	          ),
	          React.createElement(
	            'span',
	            { className: 'location' },
	            navTargetTitle
	          ),
	          React.createElement(Logo, null)
	        )
	      ),
	      React.createElement(Nav, { navState: this.state.navState }),
	      prevEl,
	      React.createElement(ModuleComponent, { model: this.state.model, moduleData: this.state }),
	      nextEl,
	      React.createElement(FocusBlocker, { moduleData: this.state }),
	      modal ? React.createElement(
	        ModalContainer,
	        null,
	        modal
	      ) : null
	    );
	  }
	});

	module.exports = ViewerApp;

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  components: {
	    ViewerApp: __webpack_require__(171)
	  },
	  stores: {
	    ScoreStore: __webpack_require__(72),
	    AssessmentStore: __webpack_require__(70),
	    NavStore: __webpack_require__(17),
	    QuestionStore: __webpack_require__(71)
	  },
	  util: {
	    AssessmentUtil: __webpack_require__(73),
	    NavUtil: __webpack_require__(9),
	    ScoreUtil: __webpack_require__(74),
	    APIUtil: __webpack_require__(38),
	    QuestionUtil: __webpack_require__(39)
	  }
	};

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	window.Viewer = __webpack_require__(172);

/***/ },

/***/ 209:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 210:
209,

/***/ 211:
209,

/***/ 212:
209,

/***/ 231:
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E %3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-290 387 30 20' style='enable-background:new -290 387 30 20;' xml:space='preserve'%3E %3Cpath d='M-272.5,405.4l-12.1-7.4c-0.6-0.4-0.6-1.7,0-2.1l12.1-7.4c0.5-0.3,1,0.3,1,1.1v14.7C-271.4,405.2-272,405.7-272.5,405.4z' fill='rgba(0, 0, 0, .2)' transform='translate(2, 0)'/%3E %3C/svg%3E"

/***/ },

/***/ 232:
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3Csvg width='20' height='10' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E %3Cline x1='0' y1='10' x2='100' y2='10' stroke='rgba(0, 0, 0, .2)' stroke-width='20' stroke-linecap='round' /%3E %3Cline x1='0' y1='50' x2='100' y2='50' stroke='rgba(0, 0, 0, .2)' stroke-width='20' stroke-linecap='round' /%3E %3Cline x1='0' y1='90' x2='100' y2='90' stroke='rgba(0, 0, 0, .2)' stroke-width='20' stroke-linecap='round' /%3E %3C/svg%3E"

/***/ },

/***/ 233:
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 10 16' style='enable-background:new 0 0 10 16;' xml:space='preserve'%3E %3Cpath fill='white' id='XMLID_6_' d='M9.1,6H8.5V3.5C8.5,1.5,6.9,0,5,0C3.1,0,1.6,1.5,1.6,3.5l0,2.5H0.9C0.4,6,0,6.4,0,6.9v8.2 C0,15.6,0.4,16,0.9,16h8.2c0.5,0,0.9-0.4,0.9-0.9V6.9C10,6.4,9.6,6,9.1,6z M3.3,3.4c0-0.9,0.8-1.6,1.7-1.6c0.9,0,1.7,0.8,1.7,1.7V6 H3.3V3.4z'/%3E %3C/svg%3E"

/***/ },

/***/ 234:
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E %3C!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='253px' height='64.577px' viewBox='0 0 253 64.577' enable-background='new 0 0 253 64.577' xml:space='preserve' fill='black'%3E %3Cpath d='M18.399,53.629c-0.01,0-0.021,0-0.031,0C7.023,53.396,0,43.151,0,33.793c0-10.79,8.426-19.905,18.399-19.905 c11.006,0,18.399,10.292,18.399,19.905c0,10.719-8.239,19.617-18.367,19.835C18.421,53.629,18.41,53.629,18.399,53.629z M18.399,18.257c-8.393,0-14.031,8.033-14.031,15.536c0.295,7.574,5.625,15.468,14.031,15.468c8.393,0,14.031-7.998,14.031-15.468 C32.43,25.372,26.005,18.257,18.399,18.257z'/%3E %3Cpath d='M58.15,53.629c-6.02,0-13.502-3.57-16.154-10.394c-0.287-0.733-0.603-1.542-0.603-3.281l0-38.454 c0-0.398,0.158-0.779,0.439-1.061S42.495,0,42.893,0h1.369c0.829,0,1.5,0.671,1.5,1.5v18.495c3.827-4.056,8.188-6.106,13.004-6.106 c11.111,0,17.989,10.332,17.989,19.905C76.444,44.75,68.099,53.629,58.15,53.629z M45.761,27.446v12.437 c0,4.652,7.208,9.378,12.389,9.378c8.516,0,14.236-7.998,14.236-15.468c0-7.472-5.208-15.536-13.621-15.536 C51.235,18.257,47.065,24.927,45.761,27.446z'/%3E %3Cpath d='M99.064,53.629c-0.01,0-0.021,0-0.031,0c-11.346-0.233-18.369-10.478-18.369-19.835 c0-10.79,8.426-19.905,18.399-19.905c11.005,0,18.398,10.292,18.398,19.905c0,10.719-8.239,19.617-18.366,19.835 C99.086,53.629,99.075,53.629,99.064,53.629z M99.064,18.257c-8.393,0-14.031,8.033-14.031,15.536 c0.294,7.574,5.624,15.468,14.031,15.468c8.393,0,14.031-7.998,14.031-15.468C113.096,25.372,106.67,18.257,99.064,18.257z'/%3E %3Cpath d='M153.252,53.629c-0.01,0-0.021,0-0.031,0c-11.346-0.233-18.369-10.478-18.369-19.835 c0-10.79,8.426-19.905,18.399-19.905c11.006,0,18.399,10.292,18.399,19.905c0,10.719-8.239,19.617-18.367,19.835 C153.273,53.629,153.263,53.629,153.252,53.629z M153.252,18.257c-8.393,0-14.031,8.033-14.031,15.536 c0.294,7.574,5.624,15.468,14.031,15.468c8.393,0,14.031-7.998,14.031-15.468C167.283,25.372,160.858,18.257,153.252,18.257z'/%3E %3Cpath d='M234.601,53.629c-0.01,0-0.021,0-0.031,0c-11.345-0.233-18.367-10.478-18.367-19.835 c0-10.79,8.426-19.905,18.398-19.905c11.006,0,18.399,10.292,18.399,19.905c0,10.719-8.239,19.617-18.367,19.835 C234.622,53.629,234.611,53.629,234.601,53.629z M234.601,18.257c-8.393,0-14.03,8.033-14.03,15.536 c0.294,7.574,5.624,15.468,14.03,15.468c8.394,0,14.031-7.998,14.031-15.468C248.632,25.372,242.206,18.257,234.601,18.257z'/%3E %3Cpath d='M193.62,53.629c-6.021,0-13.503-3.57-16.155-10.394l-0.098-0.239c-0.254-0.607-0.603-1.438-0.603-3.042 c0.002-15.911,0.098-38.237,0.099-38.461c0.003-0.826,0.674-1.494,1.5-1.494h1.368c0.829,0,1.5,0.671,1.5,1.5v18.495 c3.827-4.055,8.188-6.106,13.005-6.106c11.111,0,17.988,10.332,17.988,19.904C211.915,44.75,203.569,53.629,193.62,53.629z M181.231,27.446v12.437c0,4.652,7.208,9.378,12.389,9.378c8.515,0,14.235-7.998,14.235-15.468c0-7.472-5.207-15.536-13.619-15.536 C186.705,18.257,182.535,24.927,181.231,27.446z'/%3E %3Cpath d='M118.017,64.577c-0.013,0-0.026,0-0.039,0c-2.437-0.063-5.533-0.434-7.865-2.765 c-0.308-0.308-0.467-0.734-0.436-1.167c0.031-0.434,0.249-0.833,0.597-1.094l1.096-0.821c0.566-0.425,1.353-0.396,1.887,0.072 c1.083,0.947,2.617,1.408,4.691,1.408c2.913,0,6.3-2.752,6.3-6.3V16.073c0-0.829,0.671-1.5,1.5-1.5h1.368c0.829,0,1.5,0.671,1.5,1.5 v37.835C128.616,60.195,123.03,64.577,118.017,64.577z M127.116,8.268h-1.368c-0.829,0-1.5-0.671-1.5-1.5V2.389 c0-0.829,0.671-1.5,1.5-1.5h1.368c0.829,0,1.5,0.671,1.5,1.5v4.379C128.616,7.597,127.945,8.268,127.116,8.268z'/%3E %3C/svg%3E"

/***/ }

/******/ })));