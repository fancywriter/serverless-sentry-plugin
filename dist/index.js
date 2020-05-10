"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
var SemVer = require("semver");
var superagent_1 = require("superagent");
var uuid_1 = require("uuid");
var git_rev_1 = require("./git-rev");
/**
 * Serverless Plugin forward Lambda exceptions to Sentry (https://sentry.io)
 */
var SentryPlugin = /** @class */ (function () {
    function SentryPlugin(serverless, options) {
        var _this = this;
        this.serverless = serverless;
        this.options = options;
        this.custom = this.serverless.service.custom;
        this.provider = this.serverless.getProvider("aws");
        this.hooks = {
            "before:package:initialize": function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.validate()];
            }); }); },
            "after:package:initialize": function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.setRelease()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.instrumentFunctions()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            "before:deploy:deploy": function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.setRelease()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.instrumentFunctions()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            "after:deploy:deploy": function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createSentryRelease()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.deploySentryRelease()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            "before:invoke:local:invoke": function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.setRelease()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.instrumentFunctions()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            "before:offline:start": function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.setRelease()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.instrumentFunctions()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            "before:offline:start:init": function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.setRelease()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.instrumentFunctions()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
        };
        this.configPlugin();
    }
    SentryPlugin.prototype.configPlugin = function () {
        this.sentry = {};
        if (typeof this.custom.sentry === "object") {
            Object.assign(this.sentry, this.custom.sentry);
        }
    };
    SentryPlugin.prototype.validate = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                if (this.validated) {
                    // Already ran
                    return [2 /*return*/];
                }
                // Check required serverless version
                if (SemVer.gt("1.12.0", this.serverless.getVersion())) {
                    throw new Error("Serverless verion must be >= 1.12.0");
                }
                // Set configuration
                this.validated = true;
                this.sentry = __assign({}, (_a = this.serverless.service.custom) === null || _a === void 0 ? void 0 : _a.sentry);
                // Validate Sentry options
                if (!this.sentry.dsn) {
                    throw Error("Sentry DSN must be set.");
                }
                // Set default option values
                if (!this.sentry.environment) {
                    this.sentry.environment = (_b = this.options.stage) !== null && _b !== void 0 ? _b : undefined;
                }
                if (this.sentry.authToken && (!this.sentry.organization || !this.sentry.project)) {
                    this.serverless.cli.log("Sentry: In order to use the Sentry API " +
                        "make sure to set `organization` and `project` in your `serverless.yml`.");
                    this.sentry.authToken = undefined;
                }
                return [2 /*return*/];
            });
        });
    };
    SentryPlugin.prototype.instrumentFunction = function (originalDefinition) {
        var _a;
        var newDefinition = __assign({}, originalDefinition);
        var sentryConfig = __assign({}, this.sentry);
        var localConfig = newDefinition.sentry;
        if (typeof localConfig === "object") {
            Object.assign(sentryConfig, localConfig);
        }
        // Environment variables have to be a string in order to be processed properly
        newDefinition.environment = (_a = newDefinition.environment) !== null && _a !== void 0 ? _a : {};
        if (typeof sentryConfig.dsn !== "undefined") {
            newDefinition.environment.SENTRY_DSN = String(sentryConfig.dsn);
        }
        if (typeof sentryConfig.release === "object" && sentryConfig.release.version) {
            newDefinition.environment.SENTRY_RELEASE = String(sentryConfig.release.version);
        }
        if (typeof sentryConfig.environment !== "undefined") {
            newDefinition.environment.SENTRY_ENVIRONMENT = String(sentryConfig.environment);
        }
        if (typeof sentryConfig.autoBreadcrumbs !== "undefined") {
            newDefinition.environment.SENTRY_AUTO_BREADCRUMBS = String(sentryConfig.autoBreadcrumbs);
        }
        if (typeof sentryConfig.sourceMaps !== "undefined") {
            newDefinition.environment.SENTRY_SOURCEMAPS = String(sentryConfig.sourceMaps);
        }
        if (typeof sentryConfig.filterLocal !== "undefined") {
            newDefinition.environment.SENTRY_FILTER_LOCAL = String(sentryConfig.filterLocal);
        }
        if (typeof sentryConfig.captureErrors !== "undefined") {
            newDefinition.environment.SENTRY_CAPTURE_ERRORS = String(sentryConfig.captureErrors);
        }
        if (typeof sentryConfig.captureUnhandledRejections !== "undefined") {
            newDefinition.environment.SENTRY_CAPTURE_UNHANDLED = String(sentryConfig.captureUnhandledRejections);
        }
        if (typeof sentryConfig.captureMemoryWarnings !== "undefined") {
            newDefinition.environment.SENTRY_CAPTURE_MEMORY = String(sentryConfig.captureMemoryWarnings);
        }
        if (typeof sentryConfig.captureTimeoutWarnings !== "undefined") {
            newDefinition.environment.SENTRY_CAPTURE_TIMEOUTS = String(sentryConfig.captureTimeoutWarnings);
        }
        return newDefinition;
    };
    SentryPlugin.prototype.instrumentFunctions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var functionNames, functions;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isInstrumented) {
                    return [2 /*return*/]; // already instrumented in a previous step; no need to run again
                }
                functionNames = this.serverless.service.getAllFunctions();
                functions = functionNames.reduce(function (functions, functionName) {
                    var _a;
                    var functionObject = _this.serverless.service.getFunction(functionName);
                    if (((_a = functionObject.sentry) !== null && _a !== void 0 ? _a : true) !== false) {
                        process.env.SLS_DEBUG && _this.serverless.cli.log("Sentry: Instrumenting " + functionObject.name);
                        functions[functionName] = _this.instrumentFunction(functionObject);
                    }
                    else {
                        process.env.SLS_DEBUG && _this.serverless.cli.log("Sentry: Skipping " + functionObject.name);
                    }
                    return functions;
                }, {});
                this.serverless.service.update({ functions: functions });
                this.isInstrumented = true;
                return [2 /*return*/];
            });
        });
    };
    SentryPlugin.prototype._resolveGitRefs = function (gitRev, release) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var origin, commit, repository, refs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, gitRev.origin()];
                    case 1:
                        origin = _b.sent();
                        return [4 /*yield*/, gitRev.long()];
                    case 2:
                        commit = _b.sent();
                        repository = (_a = /[:/]([^/]+\/[^/]+?)(?:\.git)?$/i.exec(origin)) === null || _a === void 0 ? void 0 : _a[1];
                        if (repository && origin.includes("gitlab")) {
                            // GitLab uses spaces around the slashes in the repository name
                            repository = repository.replace(/\//g, " / ");
                        }
                        if (Array.isArray(release.refs)) {
                            refs = release.refs;
                            refs.forEach(function (ref) {
                                if (ref && ref.repository === "git") {
                                    ref.repository = repository !== null && repository !== void 0 ? repository : "";
                                }
                                if (ref && ref.commit === "git") {
                                    ref.commit = commit;
                                }
                                if (ref && ref.previousCommit === "git") {
                                    delete ref.previousCommit; // not available via git
                                }
                            });
                            return [2 /*return*/, __assign(__assign({}, release), { refs: refs })];
                        }
                        else {
                            return [2 /*return*/, __assign(__assign({}, release), { refs: undefined })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SentryPlugin.prototype.setRelease = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var release, version, gitRev, version_1, _b, err_1, str;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.sentry.release && typeof this.sentry.release === "string") {
                            // Expand to the long form
                            release = {
                                version: this.sentry.release,
                            };
                        }
                        else {
                            release = this.sentry.release;
                        }
                        version = release === null || release === void 0 ? void 0 : release.version;
                        if (typeof version === "undefined" || String(version) === "false") {
                            // nothing to do
                            this.sentry.release = undefined;
                            return [2 /*return*/];
                        }
                        if (!(version === true || version === "true" || version === "git")) return [3 /*break*/, 9];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        gitRev = new git_rev_1.default({ cwd: this.serverless.config.servicePath });
                        return [4 /*yield*/, gitRev.exactTag()];
                    case 2:
                        if (!((_a = (_c.sent())) !== null && _a !== void 0)) return [3 /*break*/, 3];
                        _b = _a;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, gitRev.short()];
                    case 4:
                        _b = (_c.sent());
                        _c.label = 5;
                    case 5:
                        version_1 = _b;
                        release.version = version_1;
                        if (!release.refs) {
                            // By default use git to resolve repository and commit hash
                            release.refs = [
                                {
                                    repository: "git",
                                    commit: "git",
                                },
                            ];
                        }
                        return [4 /*yield*/, this._resolveGitRefs(gitRev, release)];
                    case 6:
                        release = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _c.sent();
                        // No git available.
                        if (version === "git") {
                            // Error out
                            throw new Error("Sentry: No Git available - " + err_1.toString());
                        }
                        // Fall back to use a random number instead.
                        process.env.SLS_DEBUG &&
                            this.serverless.cli.log("Sentry: No Git available. Creating a random release version...");
                        release.version = this.getRandomVersion();
                        release.refs = undefined;
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (version === "random") {
                            process.env.SLS_DEBUG && this.serverless.cli.log("Sentry: Creating a random release version...");
                            release.version = this.getRandomVersion();
                        }
                        else {
                            str = String(version).trim();
                            process.env.SLS_DEBUG && this.serverless.cli.log("Sentry: Setting release version to \"" + str + "\"...");
                            release.version = this.getRandomVersion();
                        }
                        _c.label = 10;
                    case 10:
                        this.sentry.release = release;
                        return [2 /*return*/];
                }
            });
        });
    };
    SentryPlugin.prototype.createSentryRelease = function () {
        return __awaiter(this, void 0, void 0, function () {
            var organization, project, release, payload, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sentry.authToken || !this.sentry.release) {
                            // Nothing to do
                            return [2 /*return*/];
                        }
                        organization = this.sentry.organization;
                        project = this.sentry.project;
                        release = this.sentry.release;
                        payload = {
                            version: release.version,
                            refs: release.refs,
                            projects: [project],
                        };
                        this.serverless.cli.log("Sentry: Creating new release \"" + release.version + "\"...: " + JSON.stringify(payload));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, superagent_1.default
                                .post("https://sentry.io/api/0/organizations/" + organization + "/releases/")
                                .set("Authorization", "Bearer " + this.sentry.authToken)
                                .send(payload)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        if (err_2 && err_2.response && err_2.response.text) {
                            this.serverless.cli.log("Sentry: Received error response from Sentry:\n" + err_2.response.text);
                        }
                        throw new Error("Sentry: Error uploading release - " + err_2.toString());
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SentryPlugin.prototype.deploySentryRelease = function () {
        return __awaiter(this, void 0, void 0, function () {
            var organization, release, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sentry.authToken || !this.sentry.release) {
                            // Nothing to do
                            return [2 /*return*/];
                        }
                        organization = this.sentry.organization;
                        release = this.sentry.release;
                        this.serverless.cli.log("Sentry: Deploying release \"" + release.version + "\"...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, superagent_1.default
                                .post("https://sentry.io/api/0/organizations/" + organization + "/releases/" + encodeURIComponent(release.version) + "/deploys/")
                                .set("Authorization", "Bearer " + this.sentry.authToken)
                                .send({
                                environment: this.sentry.environment,
                                name: "Deployed " + this.serverless.service.getServiceName(),
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        if (err_3 && err_3.response && err_3.response.text) {
                            this.serverless.cli.log("Sentry: Received error response from Sentry:\n" + err_3.response.text);
                        }
                        throw new Error("Sentry: Error deploying release - " + err_3.toString());
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SentryPlugin.prototype.getRandomVersion = function () {
        return uuid_1.v4().replace(/-/g, "");
    };
    return SentryPlugin;
}());
exports.SentryPlugin = SentryPlugin;
module.exports = SentryPlugin;
