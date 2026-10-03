import RestTestSuite from "./tests/restTests";
import GrpcTestSuite from "./tests/grpcTests";
import { performance } from "perf_hooks";
import { EndpointReturn, TestResult } from "./types";

import * as _ from "lodash";

const runTest: (func: () => any, expected?: any) => Promise<TestResult> = async (
  func: () => Promise<EndpointReturn>,
  expected?: any,
) => {
  const start = performance.now();
  const result = await func();
  const end = performance.now();

  let pass = result?.ok;

  // Function to compare arrays of objects by 'id'. 
  function compareArraysById(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;

    // Extract ids from both arrays
    const ids1 = arr1.map(item => item.id).sort();
    const ids2 = arr2.map(item => item.id).sort();

    // Compare the sorted arrays of ids
    return _.isEqual(ids1, ids2);
  }

  if (expected !== undefined) {
    if (Array.isArray(expected) && Array.isArray(result?.payload)) {
      // Compare arrays of objects by 'id'
      pass = compareArraysById(result.payload, expected) && result?.ok;
    } else if (typeof expected === 'object' && typeof result?.payload === 'object') {
      // Compare single objects by 'id'
      pass = expected.id === result.payload.id && result?.ok;
    } else {
      pass = false;
    }
  }

  let message = pass
    ? "ok."
    : `failed.
Expected:
${JSON.stringify(expected, undefined, 2)}
Received:
${JSON.stringify(result?.payload, undefined, 2)}`;

  return {
    ok: pass,
    time: end - start,
    message,
  };
};

export const avgRuntime: (func: () => any, iterations: number, expected?: any) => Promise<TestResult> = async (
  func: () => any,
  iterations: number,
  expected?: any,
) => {
  const promises = [];
  for (let i = 0; i < iterations; i++) {
    promises.push(runTest(func, expected));
  }

  const results = await Promise.all(promises);
  return {
    ok: results?.reduce((acc, curr) => acc && curr.ok, true),
    time: results?.reduce((acc, curr) => acc + curr.time, 0) / iterations,
    message: results?.[0]?.message,
  };
};

export async function runTests(awsUrl: string, resultCache: any, iterations: number, ws?: any) {
  const restTestSuite = new RestTestSuite(awsUrl);
  const grpcTestSuite = new GrpcTestSuite(awsUrl);

  // Warmup
  await restTestSuite.runSuite(1);
  await grpcTestSuite.runSuite(1);
  resultCache[awsUrl] = {};
  resultCache[awsUrl]["rest"] = await restTestSuite.runSuite(iterations);
  resultCache[awsUrl]["grpc"] = await grpcTestSuite.runSuite(iterations);

  if (ws) ws.send(JSON.stringify(resultCache[awsUrl]));
}
