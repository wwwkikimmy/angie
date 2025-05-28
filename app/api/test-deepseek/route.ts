import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

export async function GET() {
  try {
    console.log("=== Testing DeepSeek Connection ===")

    // Check if API key exists
    if (!process.env.DEEPSEEK_API_KEY) {
      return Response.json({
        error: "DEEPSEEK_API_KEY environment variable is not set",
        success: false,
      })
    }

    console.log("API Key found, length:", process.env.DEEPSEEK_API_KEY.length)

    // Create DeepSeek client
    const deepseek = createOpenAI({
      name: "deepseek",
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com/v1",
    })

    console.log("DeepSeek client created")

    // Test with a simple prompt
    const result = await generateText({
      model: deepseek("deepseek-chat"),
      prompt: "Say hello in one word.",
      maxTokens: 10,
    })

    console.log("DeepSeek response:", result.text)

    return Response.json({
      success: true,
      response: result.text,
      usage: result.usage,
    })
  } catch (error) {
    console.error("DeepSeek test error:", error)
    return Response.json({
      error: error.message,
      success: false,
      details: {
        name: error.name,
        stack: error.stack?.split("\n").slice(0, 5), // First 5 lines of stack
      },
    })
  }
}
