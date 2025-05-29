import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  try {
    console.log("=== Chat API Request Started ===")

    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set")
      return new Response(
        JSON.stringify({
          error: "API key not configured",
          code: "NO_API_KEY",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const { messages } = await req.json()
    console.log("Received messages:", messages?.length || 0, "messages")

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid messages format",
          code: "INVALID_MESSAGES",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("Creating streamText with DeepSeek...")

    const result = streamText({
      model: groq("llama3-8b-8192"),
      messages,
      system: `You are Angie, a friendly AI assistant specifically designed to help young professionals settle into Kingston, Ontario, Canada. You have extensive knowledge about:

- Job market and career opportunities in Kingston
- Housing and rental market (including popular neighborhoods like downtown/Princess Street, University District, waterfront areas)
- Social events and networking opportunities for young professionals
- Local culture, restaurants, cafes, and nightlife
- Transportation and getting around Kingston
- Services and resources for new residents
- Cost of living and budgeting advice
- Queen's University area and its impact on the city
- Seasonal considerations (especially winter preparation)
- Local tech scene and startup ecosystem

Your personality is:
- Warm, welcoming, and enthusiastic about Kingston
- Professional but approachable
- Knowledgeable about the challenges young professionals face when relocating
- Encouraging and supportive
- Specific and practical in your advice

Always provide helpful, accurate information about Kingston while maintaining a friendly, personal touch. When you don't know something specific, be honest about it but offer to help in other ways.`,
      temperature: 0.7,
      maxTokens: 500,
    })

    console.log("StreamText created successfully, returning response...")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("=== Chat API Error ===")
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)

    // Return a more specific error message
    let errorMessage = "Failed to process chat request"
    let errorCode = "UNKNOWN_ERROR"

    if (error.message?.includes("API key")) {
      errorMessage = "Invalid API key configuration"
      errorCode = "INVALID_API_KEY"
    } else if (error.message?.includes("network") || error.message?.includes("fetch")) {
      errorMessage = "Network connection error"
      errorCode = "NETWORK_ERROR"
    } else if (error.message?.includes("rate limit")) {
      errorMessage = "Rate limit exceeded, please try again later"
      errorCode = "RATE_LIMIT"
    } else if (error.message?.includes("model")) {
      errorMessage = "AI model not available"
      errorCode = "MODEL_ERROR"
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        code: errorCode,
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
