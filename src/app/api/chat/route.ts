import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // If no OpenAI key is set, return a simulated stream so the UI still functions
  if (!process.env.OPENAI_API_KEY) {
    const stream = new ReadableStream({
      async start(controller) {
        const text = "Hi, I am FOI.AI (Mock Mode). Please set OPENAI_API_KEY in your .env to enable true generative responses. Meanwhile, I'll pretend to execute your command...\n\n```bash\n$ echo 'Simulating system command...'\nSimulating system command...\n```";
        const chunks = text.split(' ');
        for (const chunk of chunks) {
          controller.enqueue(new TextEncoder().encode(`0:"${chunk} "\n`));
          await new Promise(r => setTimeout(r, 50));
        }
        controller.close();
      }
    });
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
  }

  // Real LLM integration with agentic shell capabilities
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: "You are FOI.AI, an autonomous agentic workspace assistant. You help the user with development, planning, and task execution. You have access to a simulated shell environment for the web version.",
    tools: {
      executeShellCommand: tool({
        description: 'Execute a bash shell command in the simulated agentic environment.',
        parameters: z.object({
          command: z.string().describe('The bash command string to execute.'),
        }),
        // @ts-ignore
        execute: async ({ command }: { command: string }) => {
          // In a real desktop/electron app, this would use Node's child_process.
          // For the web version, we mock the execution safely.
          return `[Simulated Web Execution]: Successfully ran command -> ${command}\nOutput: (Mocked response, system access requires Desktop App version)`;
        },
      }),
      readSystemFile: tool({
        description: 'Read the contents of a simulated system file.',
        parameters: z.object({
          filePath: z.string().describe('Absolute path to the file.'),
        }),
        // @ts-ignore
        execute: async ({ filePath }: { filePath: string }) => {
          return `[Simulated File Read]: Successfully read file -> ${filePath}\n(Mocked content, system access requires Desktop App version)`;
        },
      })
    },
    maxSteps: 5, // Allow the agent to call tools and continue
  });

  return result.toDataStreamResponse();
}
