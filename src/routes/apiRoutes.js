import express from 'express';
import { fetchInference } from '../modules/api/inference.js'; // Ensure the path is correct

const router = express.Router();

// Define your inference route
router.post('/inference', async (req, res) => {
    const { input_text, assistantMessage } = req.body; // Ensure this matches your frontend request
    console.log('Incoming request:', req.body); // Log the incoming request
    
    try {
        const result = await fetchInference(input_text, "", assistantMessage);
        console.log('Inference result:', result); // Log the result
        res.json({result}); // Send JSON response
    } catch (error) {
        console.error('Error during inference:', error);
        res.status(500).json({ error: error.message }); // Return error message
    }
});

export default router;
