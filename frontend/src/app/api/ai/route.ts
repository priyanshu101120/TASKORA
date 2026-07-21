import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages,
        max_tokens: 800,
      }),
    }
  );

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content || "Koi response nahi aaya";
  return Response.json({ output });
}




































































































































// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   const response = await fetch(
//     "https://api.bytez.com/models/v2/google/gemini-2.0-flash",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.BYTEZ_API_KEY}`,
//         "provider-key": process.env.GEMINI_API_KEY!, // ✅ Gemini key
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         messages,
//         stream: false,
//       }),
//     }
//   );

//   const text = await response.text();
//   console.log("Bytez response:", text);

//   try {
//     const data = JSON.parse(text);
//     return Response.json({ output: data.output ?? data.error ?? "No response" });
//   } catch {
//     return Response.json({ error: text }, { status: 500 });
//   }
// }