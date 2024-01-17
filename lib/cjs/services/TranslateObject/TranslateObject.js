"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetQtyKeysInObj_js_1 = __importDefault(require("../GetQtyKeysInObj/GetQtyKeysInObj.js"));
const AppStrings_js_1 = require("../../stringRepos/AppStrings/AppStrings.js");
const TranslateText_js_1 = __importDefault(require("../TranslateText/TranslateText.js"));
const Delay_js_1 = require("../Delay/Delay.js");
const RunIfPossible_js_1 = require("../RunIfPossible/RunIfPossible.js");
/**
 *
 * Uncomment this code below, and run the
 *
 * npm run run-service TranslateObject
 *
 * command to test this SDK method quickly and dirty ;-)
 *
 **
(async () => {
  await TestTranslateObject();
})();
*/
/**
 *
 * @param progressIntervalMs,
 * how much time between each
 * job progress callback update
 * , in milliseconds
 *
 * @param prompt, the question you want to ask to ChatGPT. A string.
 *
 * @param apiKey, the MaslowGPT API Key, a string.
 *
 * @param params, an object of options,
 * for your background job in the backend,
 * if you need to customize the shizzle.
 *
 * @param jobId, a job id,
 * in order to keep polling for status of an existing job,
 * in case of a network disruption
 *
 * @param onJobCreated, a callback that gives you the job id
 * of the latest job you just created in the backend.
 * This job id allows you to check your background job, using
 * the GetWorkStatus method, and also this method
 * (using the jobId property).
 *
 * @param onSuccess, a callback that gives you the fruit of your backend's
 * hard work
 *
 * @param onError, a callback when the shizzle got messy.
 *
 * @param onProgress, a callback that gets called every progressIntervalMs
 * milliseconds, to give updates on the ongoing background job
 *
 * @param print, do we print some basic logging info ?
 *
 * @param model_chosen, the openai model you want to use.
 * "gpt-4", "gpt-3.5-turbo", etc...
 *
 * @returns
 */
function TranslateObject({ model_chosen, obj, language, apiKey, retries = 10, progressIntervalMs = 1000, onJobCreated, onSuccess, onError, onProgress, print = false, jobId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let newObj = {};
        let currentIndex = 1;
        let retriesCount = 1;
        let totalStrings = (0, GetQtyKeysInObj_js_1.default)(obj);
        let inputCostDollar = 0, outputCostDollar = 0, feeDollar = 0, totalCostDollar = 0, totalCostAPICredits = 0;
        let translatedTextData;
        print ? console.log(AppStrings_js_1.app_strings.t("x7CTz5XP")) : 42;
        try {
            for (var key in obj) {
                print
                    ? console.log(`\n(${currentIndex}/${totalStrings}):\n\n${AppStrings_js_1.app_strings.t("xWtfTMu")}`)
                    : 42;
                translatedTextData = yield (0, TranslateText_js_1.default)({
                    text: obj[key],
                    language,
                    apiKey,
                    model_chosen,
                    print: false,
                    progressIntervalMs,
                    onJobCreated: (jobId) => {
                        //console.log(`The background HTTP job got created successfully ! it's id is: ${jobId}`);
                    },
                    onSuccess: (output) => {
                        //console.log(`Success: ${JSON.stringify(output, null, 2)}`);
                    },
                    onError: (e) => {
                        //console.log(`Error: ${JSON.stringify(e?.response?.data, null, 2)}`);
                    },
                    onProgress: (progress) => {
                        //console.log(`Job Progress: ${JSON.stringify(progress, null, 2)}`);
                    },
                });
                yield (0, Delay_js_1.Delay)(5000);
                while (retriesCount <= retries && !translatedTextData) {
                    print
                        ? console.log(AppStrings_js_1.app_strings.t("x8H4nyVx") + ` ${retriesCount}/${retries}`)
                        : 42;
                    translatedTextData = yield (0, TranslateText_js_1.default)({
                        text: obj[key],
                        language,
                        apiKey,
                        model_chosen,
                        print: false,
                        progressIntervalMs,
                        onJobCreated: (jobId) => {
                            //console.log(`The background HTTP job got created successfully ! it's id is: ${jobId}`);
                        },
                        onSuccess: (output) => {
                            //console.log(`Success: ${JSON.stringify(output, null, 2)}`);
                        },
                        onError: (e) => {
                            //console.log(`Error: ${JSON.stringify(e?.response?.data, null, 2)}`);
                        },
                        onProgress: (progress) => {
                            //console.log(`Job Progress: ${JSON.stringify(progress, null, 2)}`);
                        },
                    });
                    yield (0, Delay_js_1.Delay)(5000);
                    retriesCount++;
                }
                if (!translatedTextData) {
                    throw new Error(`${AppStrings_js_1.app_strings.t("xlqky0Sfn3")}: ${obj[key]}`);
                }
                else {
                    retriesCount = 1;
                }
                newObj[key] = translatedTextData.answer.result;
                inputCostDollar += translatedTextData.usage.inputCostDollar;
                outputCostDollar += translatedTextData.usage.outputCostDollar;
                feeDollar += translatedTextData.usage.feeDollar;
                totalCostDollar += translatedTextData.usage.totalCostDollar;
                totalCostAPICredits += translatedTextData.usage.totalCostAPICredits;
                currentIndex++;
                print ? console.log(`✅ ` + AppStrings_js_1.app_strings.t("xlqZy0Sf") + `: ${translatedTextData.answer.result}`) : 42;
            }
            /*
            The goal of the 3 sister code lines below,
            is to get an object like {
          answer: any,
          usage: {
            "inputCostDollar": number,
            "outputCostDollar": number,
            "feeDollar": number,
            "totalCostDollar": number,
            "totalCostAPICredits": number,
            "APICreditsLeft": number
          }
        }
            */
            translatedTextData.answer = newObj;
            translatedTextData.usage.inputCostDollar = inputCostDollar;
            translatedTextData.usage.outputCostDollar = outputCostDollar;
            translatedTextData.usage.feeDollar = feeDollar;
            translatedTextData.usage.totalCostDollar = totalCostDollar;
            translatedTextData.usage.totalCostAPICredits = totalCostAPICredits;
            (0, RunIfPossible_js_1.RunIfPossible)({ func: onSuccess, args: translatedTextData });
            return translatedTextData;
        }
        catch (err) {
            // Handle network errors or exceptions
            print && console.error(`${AppStrings_js_1.app_strings.t("xlqkylp0Sfn3")}: `, err);
            (0, RunIfPossible_js_1.RunIfPossible)({ func: onError, args: err });
            return null;
        }
    });
}
exports.default = TranslateObject;
