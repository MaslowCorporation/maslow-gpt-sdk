import { GetGPTOutputStatus } from "./pieces/GetGPTOutputStatus.js";
/**
 *
 * Uncomment this code below, and run the
 *
 * npm run run-service GetGPTOutput
 *
 * command to test this SDK method quickly and dirty ;-)
 *
 **
(async () => {
  await TestGetGPTOutput();
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
export default function GetGPTOutput({ model_chosen, prompt, apiKey, params, progressIntervalMs, onJobCreated, onSuccess, onError, onProgress, print, jobId, }: {
    model_chosen?: string;
    prompt: string;
    apiKey: string;
    params?: any;
    progressIntervalMs: number;
    onProgress?: (progress: GetGPTOutputStatus) => void;
    onSuccess?: (output: any) => void;
    onJobCreated?: (jobId: string) => void;
    onError?: (error: any) => void;
    print?: boolean;
    jobId?: string;
}): Promise<any>;
//# sourceMappingURL=GetGPTOutput.d.ts.map