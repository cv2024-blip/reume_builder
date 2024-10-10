import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyC37dU2iy9lCQC4fcTo5IE_k-kHoaiorD8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let input = ""


export const fetchInference = async function (inputElem ,outputElem, AssistantMessage) {
    try {
        outputElem = ''; // Clear previous 
        input =  inputElem + " " + AssistantMessage 
        console.log("the user message is: " + input)
        const result = await model.generateContent(input);
        console.log("AI response" + result.response.text())
        outputElem = result.response.text();
        return outputElem;

    } catch (error) {
        console.error("Error during inference:", error);
        outputElem = "Error occurred during inference.";
    }
}
