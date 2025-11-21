import equal from 'deep-equal';

let queryString: string[] = [];
let queryOutput: object[] = [];

export const useValidation = () => {
    const setRequirements = async (stringReq: string[], outputReqPath: string) => {
        console.log('-- Validator: Loading requirements --');
        console.log('-- Validator: String requirements:', stringReq);
        console.log('-- Validator: Output path:', outputReqPath);
        queryString = stringReq;

        // If no output path, skip fetching
        if (!outputReqPath || outputReqPath === '') {
            console.log('-- Validator: No output path provided, skipping fetch --');
            queryOutput = [];
            return;
        }

        try {
            console.log('-- Validator: Fetching from:', outputReqPath);
            const response = await fetch(outputReqPath);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const arrayBuf = await response.json();
            console.log('-- Validator: Loaded output requirements:', arrayBuf);
            queryOutput = arrayBuf;
        } catch (err: any) {
            console.error('-- Validator: Error loading requirements:', err.message);
            console.error('-- Validator: Failed path:', outputReqPath);
            queryOutput = [];
        }
    };

    const validate = (query: string, output: object[]): boolean => {
        if (queryOutput.length > 0) {
            if (!valQueryOutput(output)) {
                return false;
            }
        }

        if (queryString) {
            if (!valQueryString(query)) {
                return false;
            }
        }

        return true;
    };

    const valQueryOutput = (output: object[]): boolean => {
        return equal(output, queryOutput);
    };

    const valQueryString = (query: string): boolean => {
        const splQuery = query.split(' ');
        let cnt: number = 0;
        for (let i = 0; i < splQuery.length; i += 1) {
            if (queryString.includes(splQuery[i])) {
                cnt += 1;
            }
        }

        return cnt === queryString.length;
    };

    return {
        setRequirements,
        validate,
    };
};
