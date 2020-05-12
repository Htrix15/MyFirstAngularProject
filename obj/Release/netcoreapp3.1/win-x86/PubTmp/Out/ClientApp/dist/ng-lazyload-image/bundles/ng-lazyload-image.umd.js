(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-lazyload-image', ['exports', '@angular/common', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['ng-lazyload-image'] = {}, global.ng.common, global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var cssClassNames = {
        loaded: 'ng-lazyloaded',
        loading: 'ng-lazyloading',
        failed: 'ng-failed-lazyloaded'
    };
    function removeCssClassName(element, cssClassName) {
        element.className = element.className.replace(cssClassName, '');
    }
    function addCssClassName(element, cssClassName) {
        if (!element.className.includes(cssClassName)) {
            element.className += " " + cssClassName;
        }
    }
    function hasCssClassName(element, cssClassName) {
        return element.className && element.className.includes(cssClassName);
    }

    function getNavigator() {
        return typeof window !== 'undefined' ? window.navigator : undefined;
    }
    function isChildOfPicture(element) {
        return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
    }
    function isImageElement(element) {
        return element.nodeName.toLowerCase() === 'img';
    }
    function setImage(element, imagePath, useSrcset) {
        if (isImageElement(element)) {
            if (useSrcset && 'srcset' in element) {
                element.srcset = imagePath;
            }
            else {
                element.src = imagePath;
            }
        }
        else {
            element.style.backgroundImage = "url('" + imagePath + "')";
        }
        return element;
    }
    function setSources(attrName) {
        return function (image) {
            var sources = image.parentElement.getElementsByTagName('source');
            for (var i = 0; i < sources.length; i++) {
                var attrValue = sources[i].getAttribute(attrName);
                if (attrValue) {
                    // Check if `srcset` is supported by the current browser
                    if ('srcset' in sources[i]) {
                        sources[i].srcset = attrValue;
                    }
                    else {
                        sources[i].src = attrValue;
                    }
                }
            }
        };
    }
    var setSourcesToDefault = setSources('defaultImage');
    var setSourcesToLazy = setSources('lazyLoad');
    var setSourcesToError = setSources('errorImage');
    function setImageAndSources(setSourcesFn) {
        return function (element, imagePath, useSrcset) {
            if (isImageElement(element) && isChildOfPicture(element)) {
                setSourcesFn(element);
            }
            if (imagePath) {
                setImage(element, imagePath, useSrcset);
            }
        };
    }
    var setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
    var setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
    var setImageAndSourcesToError = setImageAndSources(setSourcesToError);

    var end = function (_a) {
        var element = _a.element;
        addCssClassName(element, cssClassNames.loaded);
        removeCssClassName(element, cssClassNames.loading);
    };
    var ɵ0 = end;
    var loadImage = function (_a) {
        var element = _a.element, useSrcset = _a.useSrcset, imagePath = _a.imagePath, decode = _a.decode;
        var img;
        if (isImageElement(element) && isChildOfPicture(element)) {
            var parentClone = element.parentNode.cloneNode(true);
            img = parentClone.getElementsByTagName('img')[0];
            setSourcesToLazy(img);
            setImage(img, imagePath, useSrcset);
        }
        else {
            img = new Image();
            if (isImageElement(element) && element.sizes) {
                img.sizes = element.sizes;
            }
            if (useSrcset && 'srcset' in img) {
                img.srcset = imagePath;
            }
            else {
                img.src = imagePath;
            }
        }
        if (decode && img.decode) {
            return img.decode().then(function () { return imagePath; });
        }
        return new Promise(function (resolve, reject) {
            img.onload = function () { return resolve(imagePath); };
            img.onerror = function () { return reject(null); };
        });
    };
    var setErrorImage = function (_a) {
        var element = _a.element, errorImagePath = _a.errorImagePath, useSrcset = _a.useSrcset;
        setImageAndSourcesToError(element, errorImagePath, useSrcset);
        addCssClassName(element, cssClassNames.failed);
    };
    var ɵ1 = setErrorImage;
    var setLoadedImage = function (_a) {
        var element = _a.element, imagePath = _a.imagePath, useSrcset = _a.useSrcset;
        setImageAndSourcesToLazy(element, imagePath, useSrcset);
    };
    var ɵ2 = setLoadedImage;
    var setup = function (_a) {
        var element = _a.element, defaultImagePath = _a.defaultImagePath, useSrcset = _a.useSrcset;
        setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
        addCssClassName(element, cssClassNames.loading);
        if (hasCssClassName(element, cssClassNames.loaded)) {
            removeCssClassName(element, cssClassNames.loaded);
        }
    };
    var ɵ3 = setup;
    var isBot = function (navigator) {
        if (navigator && navigator.userAgent) {
            return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(navigator.userAgent);
        }
        return false;
    };
    var sharedPreset = {
        finally: end,
        loadImage: loadImage,
        setErrorImage: setErrorImage,
        setLoadedImage: setLoadedImage,
        setup: setup,
        isBot: isBot
    };

    var observers = new WeakMap();
    var intersectionSubject = new rxjs.Subject();
    function loadingCallback(entrys) {
        entrys.forEach(function (entry) { return intersectionSubject.next(entry); });
    }
    var uniqKey = {};
    var getIntersectionObserver = function (attributes) {
        var scrollContainerKey = attributes.scrollContainer || uniqKey;
        var options = {
            root: attributes.scrollContainer || null
        };
        if (attributes.offset) {
            options.rootMargin = attributes.offset + "px";
        }
        var observer = observers.get(scrollContainerKey);
        if (!observer) {
            observer = new IntersectionObserver(loadingCallback, options);
            observers.set(scrollContainerKey, observer);
        }
        observer.observe(attributes.element);
        return rxjs.Observable.create(function (obs) {
            var subscription = intersectionSubject.pipe(operators.filter(function (entry) { return entry.target === attributes.element; })).subscribe(obs);
            return function () {
                subscription.unsubscribe();
                observer.unobserve(attributes.element);
            };
        });
    };

    var isVisible = function (_a) {
        var event = _a.event;
        return event.isIntersecting;
    };
    var getObservable = function (attributes, _getInterObserver) {
        if (_getInterObserver === void 0) { _getInterObserver = getIntersectionObserver; }
        if (attributes.customObservable) {
            return attributes.customObservable;
        }
        return _getInterObserver(attributes);
    };
    var intersectionObserverPreset = Object.assign({}, sharedPreset, {
        isVisible: isVisible,
        getObservable: getObservable
    });

    var isVisible$1 = function () {
        return true;
    };
    var ɵ0$1 = isVisible$1;
    var getObservable$1 = function () {
        return rxjs.of('load');
    };
    var ɵ1$1 = getObservable$1;
    var loadImage$1 = function (_a) {
        var imagePath = _a.imagePath;
        return [imagePath];
    };
    var ɵ2$1 = loadImage$1;
    var ssrPreset = Object.assign({}, sharedPreset, {
        isVisible: isVisible$1,
        getObservable: getObservable$1,
        loadImage: loadImage$1
    });

    function createHooks(platformId, options) {
        var defaultPreset = intersectionObserverPreset;
        var isBot = options && options.isBot ? options.isBot : defaultPreset.isBot;
        if (isBot(getNavigator(), platformId)) {
            return Object.assign(ssrPreset, { isBot: isBot });
        }
        else if (!options) {
            return defaultPreset;
        }
        var hooks = {};
        if (options.preset) {
            Object.assign(hooks, options.preset);
        }
        else {
            Object.assign(hooks, defaultPreset);
        }
        Object.keys(options)
            .filter(function (key) { return key !== 'preset'; })
            .forEach(function (key) {
            hooks[key] = options[key];
        });
        return hooks;
    }

    function lazyLoadImage(hookSet, attributes) {
        return function (evntObservable) {
            return evntObservable.pipe(operators.tap(function (data) { return attributes.onStateChange.emit({ reason: 'observer-emit', data: data }); }), operators.filter(function (event) {
                return hookSet.isVisible({
                    element: attributes.element,
                    event: event,
                    offset: attributes.offset,
                    scrollContainer: attributes.scrollContainer
                });
            }), operators.take(1), operators.tap(function () { return attributes.onStateChange.emit({ reason: 'start-loading' }); }), operators.mergeMap(function () { return hookSet.loadImage(attributes); }), operators.tap(function () { return attributes.onStateChange.emit({ reason: 'mount-image' }); }), operators.tap(function (imagePath) {
                return hookSet.setLoadedImage({
                    element: attributes.element,
                    imagePath: imagePath,
                    useSrcset: attributes.useSrcset
                });
            }), operators.tap(function () { return attributes.onStateChange.emit({ reason: 'loading-succeeded' }); }), operators.map(function () { return true; }), operators.catchError(function (error) {
                attributes.onStateChange.emit({ reason: 'loading-failed', data: error });
                hookSet.setErrorImage(attributes);
                return rxjs.of(false);
            }), operators.tap(function () {
                attributes.onStateChange.emit({ reason: 'finally' });
                hookSet.finally(attributes);
            }));
        };
    }

    var LazyLoadImageDirective = /** @class */ (function () {
        function LazyLoadImageDirective(el, ngZone, platformId, options) {
            this.onStateChange = new core.EventEmitter(); // Emits an event on every state change
            this.onLoad = new core.EventEmitter(); // @deprecated use `onStateChange` instead.
            this.elementRef = el;
            this.ngZone = ngZone;
            this.propertyChanges$ = new rxjs.ReplaySubject();
            this.platformId = platformId;
            this.hooks = createHooks(platformId, options);
        }
        LazyLoadImageDirective.prototype.ngOnChanges = function () {
            if (this.debug === true && !this.debugSubscription) {
                this.debugSubscription = this.onStateChange.subscribe(function (e) { return console.log(e); });
            }
            this.propertyChanges$.next({
                element: this.elementRef.nativeElement,
                imagePath: this.lazyImage,
                defaultImagePath: this.defaultImage,
                errorImagePath: this.errorImage,
                useSrcset: this.useSrcset,
                offset: this.offset ? this.offset | 0 : 0,
                scrollContainer: this.scrollTarget,
                customObservable: this.customObservable,
                decode: this.decode,
                onStateChange: this.onStateChange
            });
        };
        LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
            var _this = this;
            // Don't do anything if SSR and the user isn't a bot
            if (common.isPlatformServer(this.platformId) && !this.hooks.isBot(getNavigator(), this.platformId)) {
                return null;
            }
            this.ngZone.runOutsideAngular(function () {
                _this.loadSubscription = _this.propertyChanges$
                    .pipe(operators.tap(function (attributes) { return attributes.onStateChange.emit({ reason: 'setup' }); }), operators.tap(function (attributes) { return _this.hooks.setup(attributes); }), operators.switchMap(function (attributes) {
                    if (!attributes.imagePath) {
                        return rxjs.never();
                    }
                    return _this.hooks.getObservable(attributes).pipe(lazyLoadImage(_this.hooks, attributes));
                }))
                    .subscribe(function (success) { return _this.onLoad.emit(success); });
            });
        };
        LazyLoadImageDirective.prototype.ngOnDestroy = function () {
            var _a, _b;
            (_a = this.loadSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            (_b = this.debugSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        };
        LazyLoadImageDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: ['options',] }] }
        ]; };
        __decorate([
            core.Input('lazyLoad')
        ], LazyLoadImageDirective.prototype, "lazyImage", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "defaultImage", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "errorImage", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "customObservable", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "offset", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "useSrcset", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "decode", void 0);
        __decorate([
            core.Input()
        ], LazyLoadImageDirective.prototype, "debug", void 0);
        __decorate([
            core.Output()
        ], LazyLoadImageDirective.prototype, "onStateChange", void 0);
        __decorate([
            core.Output()
        ], LazyLoadImageDirective.prototype, "onLoad", void 0);
        LazyLoadImageDirective = __decorate([
            core.Directive({
                selector: '[lazyLoad]'
            }),
            __param(2, core.Inject(core.PLATFORM_ID)), __param(3, core.Optional()), __param(3, core.Inject('options'))
        ], LazyLoadImageDirective);
        return LazyLoadImageDirective;
    }());

    var LazyLoadImageModule = /** @class */ (function () {
        function LazyLoadImageModule() {
        }
        LazyLoadImageModule_1 = LazyLoadImageModule;
        LazyLoadImageModule.forRoot = function (options) {
            return {
                ngModule: LazyLoadImageModule_1,
                providers: [{ provide: 'options', useValue: options }]
            };
        };
        var LazyLoadImageModule_1;
        LazyLoadImageModule = LazyLoadImageModule_1 = __decorate([
            core.NgModule({
                declarations: [LazyLoadImageDirective],
                exports: [LazyLoadImageDirective]
            })
        ], LazyLoadImageModule);
        return LazyLoadImageModule;
    }());

    var Rect = /** @class */ (function () {
        function Rect(left, top, right, bottom) {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        }
        Rect.fromElement = function (element) {
            var _a = element.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
            if (left === 0 && top === 0 && right === 0 && bottom === 0) {
                return Rect.empty;
            }
            else {
                return new Rect(left, top, right, bottom);
            }
        };
        Rect.fromWindow = function (_window) {
            return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
        };
        Rect.prototype.inflate = function (inflateBy) {
            this.left -= inflateBy;
            this.top -= inflateBy;
            this.right += inflateBy;
            this.bottom += inflateBy;
        };
        Rect.prototype.intersectsWith = function (rect) {
            return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
        };
        Rect.prototype.getIntersectionWith = function (rect) {
            var left = Math.max(this.left, rect.left);
            var top = Math.max(this.top, rect.top);
            var right = Math.min(this.right, rect.right);
            var bottom = Math.min(this.bottom, rect.bottom);
            if (right >= left && bottom >= top) {
                return new Rect(left, top, right, bottom);
            }
            else {
                return Rect.empty;
            }
        };
        Rect.empty = new Rect(0, 0, 0, 0);
        return Rect;
    }());

    var scrollListeners = new WeakMap();
    function sampleObservable(obs, scheduler) {
        return obs.pipe(operators.sampleTime(100, scheduler), operators.share(), operators.startWith(''));
    }
    // Only create one scroll listener per target and share the observable.
    // Typical, there will only be one observable per application
    var getScrollListener = function (scrollTarget) {
        if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
            console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
            return rxjs.empty();
        }
        var scrollListener = scrollListeners.get(scrollTarget);
        if (scrollListener) {
            return scrollListener;
        }
        var srollEvent = rxjs.Observable.create(function (observer) {
            var eventName = 'scroll';
            var handler = function (event) { return observer.next(event); };
            var options = { passive: true, capture: false };
            scrollTarget.addEventListener(eventName, handler, options);
            return function () { return scrollTarget.removeEventListener(eventName, handler, options); };
        });
        var listener = sampleObservable(srollEvent);
        scrollListeners.set(scrollTarget, listener);
        return listener;
    };

    var isVisible$2 = function (_a, getWindow) {
        var element = _a.element, offset = _a.offset, scrollContainer = _a.scrollContainer;
        if (getWindow === void 0) { getWindow = function () { return window; }; }
        var elementBounds = Rect.fromElement(element);
        if (elementBounds === Rect.empty) {
            return false;
        }
        var windowBounds = Rect.fromWindow(getWindow());
        elementBounds.inflate(offset);
        if (scrollContainer) {
            var scrollContainerBounds = Rect.fromElement(scrollContainer);
            var intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
            return elementBounds.intersectsWith(intersection);
        }
        else {
            return elementBounds.intersectsWith(windowBounds);
        }
    };
    var getObservable$2 = function (attributes) {
        if (attributes.customObservable) {
            return attributes.customObservable.pipe(operators.startWith(''));
        }
        if (attributes.scrollContainer) {
            return getScrollListener(attributes.scrollContainer);
        }
        return getScrollListener(window);
    };
    var ɵ0$2 = getObservable$2;
    var scrollPreset = Object.assign({}, sharedPreset, {
        isVisible: isVisible$2,
        getObservable: getObservable$2
    });

    exports.LazyLoadImageDirective = LazyLoadImageDirective;
    exports.LazyLoadImageModule = LazyLoadImageModule;
    exports.intersectionObserverPreset = intersectionObserverPreset;
    exports.scrollPreset = scrollPreset;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-lazyload-image.umd.js.map
