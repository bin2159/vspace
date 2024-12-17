import vm from 'vm'

class CodeExecutor {
    constructor(sandbox = {}, timeout = 1000) {
        this.sandbox = { ...sandbox }; // Make a copy of the sandbox
        this.timeout = timeout; // Maximum time (ms) allowed for execution
    }
    async execute(code) {
        try {
            // Create a new isolated context (sandbox) for the code to run in
            const context = vm.createContext(this.sandbox);

            // Wrap the user's code in an async IIFE so that await can be used
            const wrappedCode = `(async () => { ${code} })()`;

            // Run the wrapped code in the context
            const result = await vm.runInContext(wrappedCode, context, { timeout: this.timeout });

            return {
                success: true,
                result
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    updateContext(newContext) {
        Object.assign(this.sandbox, newContext);
    }
    resetContext(newSandbox = {}) {
        this.sandbox = { ...newSandbox };
    }
    setTimeout(newTimeout) {
        this.timeout = newTimeout;
    }
}
export default CodeExecutor
