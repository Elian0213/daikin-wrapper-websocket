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
var axios_1 = require("axios");
var DaikinService = /** @class */ (function () {
    function DaikinService(config) {
        var _this = this;
        /**
         * This converts the weird CSV-like data that the Daikin API gives you into a JSON object
         * @param inputString
         */
        this.convertData = function (inputString) {
            var input = inputString;
            var escapeRegExp = function (str) { return str
                .replace(/([.*+?^=!:${}()|[\]/\\]")/g, '\\$1'); };
            var replaceAll = function (str, find, replace) { return str
                .replace(new RegExp(escapeRegExp(find), 'g'), replace); };
            if (Buffer.isBuffer(input)) {
                input = input.toString();
            }
            return JSON.parse("{\"" + replaceAll(replaceAll(input, '=', '":"'), ',', '","') + "\"}");
        };
        this.postInfo = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1["default"]
                        .get("http://" + this.config.daikinIP + "/aircon/set_control_info?pow=" + data.pow + "&mode=" + data.mode + "&stemp=" + data.stemp + "&shum=" + data.shum + "&f_rate=" + data.f_rate + "&f_dir=" + data.f_dir)
                        .then(function (resp) {
                        console.log(new Date() + " " + resp.data);
                        return {
                            status: 200,
                            message: 'AC Data updated'
                        };
                    })["catch"](function () {
                        console.log("[Daikin] Couldn't POST, are you sure " + _this.config.daikinIP + " is the IP of your AC?");
                        process.exit();
                    })
                    /**
                     * This is to obtain AC settings like,
                     * power status, heating/cooling mode etc..
                     * @type controlInfo
                     */
                ];
            });
        }); };
        /**
         * This is to obtain AC settings like,
         * power status, heating/cooling mode etc..
         * @type controlInfo
         */
        this.getInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1["default"]
                        .get("http://" + this.config.daikinIP + "/aircon/get_control_info")
                        .then(function (data) { return _this.convertData(data.data); })["catch"](function () {
                        // Should never happen, so exit process.
                        console.log("[Daikin] Couldn't fetch, are you sure " + _this.config.daikinIP + " is the IP of your AC?");
                        process.exit();
                    })
                    /**
                     * Obtain sensor information like
                     * Temperature inside & outside :D
                     * @type sensorInfo
                     */
                ];
            });
        }); };
        /**
         * Obtain sensor information like
         * Temperature inside & outside :D
         * @type sensorInfo
         */
        this.getTemperature = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1["default"]
                        .get("http://" + this.config.daikinIP + "/aircon/get_sensor_info")
                        .then(function (data) { return _this.convertData(data.data); })["catch"](function () {
                        // Should never happen, so exit process.
                        console.log("[Daikin] Couldn't fetch, are you sure " + _this.config.daikinIP + " is the IP of your AC?");
                        process.exit();
                    })];
            });
        }); };
        this.config = config;
    }
    DaikinService = __decorate([
        tsyringe_1.autoInjectable(),
        __param(0, tsyringe_1.inject('Config')),
        __metadata("design:paramtypes", [Object])
    ], DaikinService);
    return DaikinService;
}());
exports["default"] = DaikinService;
