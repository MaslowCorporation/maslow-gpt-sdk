import { Constants } from "../../../constants/constants.js";
import TranslateObject from "../TranslateObject.js";

export const TestTranslateObject = async () => {
  console.log(`Some test !`);

  return TranslateObject({
    model_chosen: "gpt-4",
    obj: {
      tudor: "Meunier, tu dors, ton moulin va trop fort",
      gang: "Bonjour, je m'appelle D'Artagneul et je suis un guerrier médiéval et spirituel, du royaume de Bordeciel",
    },
    retries: 13,
    language: "Créole Francais",
    progressIntervalMs: 1000,

    onJobCreated: (jobId) => {
      console.log(`The background HTTP job got created successfully ! it's id is: ${jobId}`);
    },
    onSuccess: (output) => {
      console.log(`Success: ${JSON.stringify(output, null, 2)}`);
    },
    onError: (e) => {
      console.log(`Error: ${JSON.stringify(e?.response?.data, null, 2)}`);
    },
    onProgress: (progress) => {
      console.log(`Job Progress: ${JSON.stringify(progress, null, 2)}`);
    },
    apiKey: Constants.MASLOW_GPT_API_KEY,
    print: true,
    // jobId: "<SOME_JOB_ID>"
  });
};
