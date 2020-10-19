"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var fs = require("file-system");
var tsyringe_1 = require("tsyringe");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        /**
         * Load config from a filepath.
         * @param path to file where config json file is specified.
         */
        this.loadConfigFromPath = function (path) {
            var config = JSON.parse(fs.readFileSync(path).toString());
            if (config == null) {
                throw new Error('config was not read properly. Please copy config.example.json and fill in the properties.');
            }
            return config;
        };
    }
    ConfigService = __decorate([
        tsyringe_1.autoInjectable()
    ], ConfigService);
    return ConfigService;
}());
exports["default"] = ConfigService;
