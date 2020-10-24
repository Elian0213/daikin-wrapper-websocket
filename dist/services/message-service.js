"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var daikin_service_1 = require("./daikin-service");
var MessageService = /** @class */ (function () {
    function MessageService(config, daikinService) {
        var _this = this;
        this.handleRequest = function (data, socket) {
            _this.socket = socket;
            _this[data.name](data === null || data === void 0 ? void 0 : data.value);
        };
        this.getInfo = function (_data) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = (_a = this.socket)
                            .send;
                        _d = (_c = JSON).stringify;
                        _e = {
                            name: 'getInfo'
                        };
                        return [4 /*yield*/, this.daikinService.getInfo()];
                    case 1:
                        _b.apply(_a, [_d.apply(_c, [(_e.data = _f.sent(),
                                    _e)])]);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSensorInfo = function (_data) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = (_a = this.socket)
                            .send;
                        _d = (_c = JSON).stringify;
                        _e = {
                            name: 'getSensorInfo'
                        };
                        return [4 /*yield*/, this.daikinService.getTemperature()];
                    case 1:
                        _b.apply(_a, [_d.apply(_c, [(_e.data = _f.sent(),
                                    _e)])]);
                        return [2 /*return*/];
                }
            });
        }); };
        // Setters
        this.setData = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var error, _a, _b, _c, _d;
            var _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        error = function () {
                            _this.socket.send(JSON.stringify({
                                status: 400,
                                message: 'Invalid data format'
                            }));
                        };
                        console.log(data);
                        if (!(data === null || data === void 0 ? void 0 : data.f_dir) || !(data === null || data === void 0 ? void 0 : data.f_rate) || !(data === null || data === void 0 ? void 0 : data.mode)) {
                            error();
                            return [2 /*return*/];
                        }
                        if (!(data === null || data === void 0 ? void 0 : data.pow) || !(data === null || data === void 0 ? void 0 : data.shum) || !(data === null || data === void 0 ? void 0 : data.stemp)) {
                            error();
                            return [2 /*return*/];
                        }
                        _b = (_a = this.socket).send;
                        _d = (_c = JSON).stringify;
                        _e = {
                            name: 'setData'
                        };
                        return [4 /*yield*/, this.daikinService.postInfo(data)];
                    case 1:
                        _b.apply(_a, [_d.apply(_c, [(_e.data = _f.sent(),
                                    _e)])]);
                        return [2 /*return*/];
                }
            });
        }); };
        this.config = config;
        this.daikinService = daikinService;
    }
    MessageService = __decorate([
        tsyringe_1.autoInjectable(),
        __param(0, tsyringe_1.inject('Config')),
        __metadata("design:paramtypes", [Object, daikin_service_1["default"]])
    ], MessageService);
    return MessageService;
}());
exports["default"] = MessageService;
