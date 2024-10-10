import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config()
const inference = new HfInference("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");
let output = ""

let result = ""

// export const fetchInference = async function () {
//     try {
//         result = ""

//         for await (const chunk of inference.chatCompletionStream({
//             model: "tiiuae/falcon-7b-instruct",
//             messages: [
//                 { role: "user", content: "Iam a software engineer make a short resume summary for me"}],
//             max_tokens: 95,
//         })) {
//             output = chunk.choices[0]?.delta?.content || "";
//             // result += output
//             // .replace("User", "").replace(" summary", "").replace(":", "").replace(/[\r\n]+/g, '');
//             // Iam a software engineer, make a short resume summary for me."
//             console.log("the result:" + output)
//             return output;
//         }
//     } catch (error) {
//         console.error("Error during inference:", error);
//     }
// }
// fetchInference()
let input = ""
export const fetchInference = async function (inputElem ,outputElem, AssistantMessage) {
    try {
        outputElem = ''; // Clear previous 
        input = inputElem + "\n" + AssistantMessage  
        console.log("the user message is: " + input)
        for await (const chunk of inference.chatCompletionStream({
            model: "tiiuae/falcon-7b-instruct",
            messages: [{ role: "user", content: input}],
            max_tokens: 95,
        })) {
            output = chunk.choices[0]?.delta?.content || "";
            outputElem += output.replace("User", "").replace(" summary", "").replace(":", "").replace(/[\r\n]+/g, '');
            // console.log(output)
        }
        return outputElem

    } catch (error) {
        console.error("Error during inference:", error);
        outputElem = "Error occurred during inference.";
    }
}

// console.log(fetchInference("Iam a software engineer make a short resume summary for me"))

// const inputElem = 'I am a software engineer';
// const AssistantMessage = ', make a short resume summary for me.';

// fetchInference(inputElem, AssistantMessage)
//     .then(result => {
//         console.log('Inference result:', result); // Here you get the actual result
//     })
//     .catch(error => {
//         console.error('Error while fetching inference:', error);
//     });

