import equal from "deep-equal";

let queryString: string[] = [];
let queryOutput: object[] = [];

export const useValidation = () => {
  const setRequirements = async (
    stringReq: string[],
    outputReqPath: string
  ) => {
    console.log("-- Validator: Loading requirements --");
    queryString = stringReq;

    try {
      const response = await fetch(outputReqPath);
      const arrayBuf = await response.json();
      queryOutput = arrayBuf;
    } catch (err: any) {
      console.log(err.message);
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
    const splQuery = query.split(" ");
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
