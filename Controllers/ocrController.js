const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const extractCodeFromImage = async (req, res) => {
  try {
    const { image, mimeType } = req.body;

    if (!image || !mimeType) {
      return res.status(400).json({ error: "Image data and mimeType are required." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig,
    });

    const result = await model.generateContent([
      {
        text: `Extract the code from this image. and with proper tabs
         also make it syntactically correct and in runnable form as per the language 
         and note you should not have to change any logic even if it is wrong`,
      },
      {
        inlineData: {
          mimeType: mimeType,
          data: image,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (err) {
    console.error("OCR extraction error:", err);
    res.status(500).json({ error: "Failed to extract code. Please try again." });
  }
};

module.exports = { extractCodeFromImage };
