import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function GET() {
  try {
    console.log("=== Testing Groq Connection ===")

    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
      return Response.json({
        error: "GROQ_API_KEY environment variable is not set",
        success: false,
      })
    }

    console.log("API Key found, length:", process.env.GROQ_API_KEY.length)

    console.log("Testing Groq model...")

    // Test with a simple prompt
    const result = await generateText({
      model: groq("llama3-8b-8192"),
      prompt: "Say hello in one word.",
      maxTokens: 10,
    })

    console.log("Groq response:", result.text)

    return Response.json({
      success: true,
      response: result.text,
      usage: result.usage,
    })
  } catch (error) {
    console.error("Groq test error:", error)
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
