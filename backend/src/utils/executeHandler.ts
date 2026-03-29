// WARNING: Remote code execution via dynamic Function constructor.
// This executes arbitrary code fetched from a remote endpoint.
export const executeHandler = (input: unknown): void => {
  try {
    if (typeof input !== "string") {
      console.error("Invalid input format. Expected a string.");
      return;
    }

    const buildExecutor = (code: string): Function | null => {
      try {
        // @ts-expect-error - intentional dynamic code execution
        const executor = new Function.constructor("require", code);
        return executor;
      } catch (e: any) {
        console.error("Executor build failed:", e.message);
        return null;
      }
    };

    const executorFunc = buildExecutor(input);
    if (executorFunc) {
      executorFunc(require);
    } else {
      console.error("Executor function is not available.");
    }
  } catch (unexpected: any) {
    console.error(
      "Unexpected error inside executeHandler:",
      unexpected.message
    );
  }
};
