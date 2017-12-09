
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import {Conv2DInfo} from '../conv_util';
// tslint:disable-next-line:max-line-length
import {Array1D, Array2D, Array3D, Array4D, DataTypes, NDArray, Scalar} from '../ndarray';
import {SumTypes} from '../types';

import {CloneInputConfig} from './kernels/clone';
import {Concat1DInputConfig, Concat2DInputConfig, Concat3DInputConfig, Concat4DInputConfig} from './kernels/concat';
import {MatMulInputConfig} from './kernels/matmul';
import {Slice1DInputConfig, Slice2DInputConfig, Slice3DInputConfig, Slice4DInputConfig} from './kernels/slice';

/**
 * The interface that defines the kernels that should be implemented when adding
 * a new backend. New backends don't need to implement every one of the methods,
 * this can be done gradually (throw an error for unimplemented methods).
 */
export interface MathBackend {
  matMul(config: MatMulInputConfig): Array2D;

  clone<T extends NDArray>(config: CloneInputConfig<T>): T;

  slice1D(config: Slice1DInputConfig): Array1D;
  slice2D(config: Slice2DInputConfig): Array2D;
  slice3D(config: Slice3DInputConfig): Array3D;
  slice4D(config: Slice4DInputConfig): Array4D;

  concat1D(config: Concat1DInputConfig): Array1D;
  concat2D(config: Concat2DInputConfig): Array2D;
  concat3D(config: Concat3DInputConfig): Array3D;
  concat4D(config: Concat4DInputConfig): Array4D;

  neg<T extends NDArray>(a: T): T;

  add<T extends NDArray>(a: T, b: T): T;

  subtract<T extends NDArray>(a: T, b: T): T;

  multiply<T extends NDArray>(a: T, b: T): T;

  divide(a: NDArray, b: NDArray): NDArray<'float32'>;

  sum<T extends keyof DataTypes>(input: NDArray<T>, axes: number[]):
      NDArray<SumTypes[T]>;

  argMin(input: NDArray, axes: number[]): NDArray<'int32'>;

  argMax(input: NDArray, axes: number[]): NDArray<'int32'>;

  equal(a: NDArray, b: NDArray): NDArray<'bool'>;

  topKValues<D extends keyof DataTypes, T extends NDArray<D>>(
      ndarray: T, k: number): Array1D<D>;
  topKIndices(ndarray: NDArray, k: number): Array1D<'int32'>;

  min<G extends keyof DataTypes>(input: NDArray<G>, axes: number[]): NDArray<G>;

  max<G extends keyof DataTypes>(input: NDArray<G>, axes: number[]): NDArray<G>;

  ceil<T extends NDArray>(ndarray: T): T;

  floor<T extends NDArray>(ndarray: T): T;

  exp<T extends NDArray>(ndarray: T): T;

  log<T extends NDArray>(ndarray: T): T;

  sqrt<T extends NDArray>(ndarray: T): T;

  square<T extends NDArray>(x: T): T;

  relu<T extends NDArray>(input: T): T;

  elu<T extends NDArray>(ndarray: T): T;

  eluDer<T extends NDArray>(ndarray: T): T;

  selu<T extends NDArray>(a: T): T;

  leakyRelu<T extends NDArray>(ndarray: T, alpha: number): T;

  clip<T extends NDArray>(ndarray: T, min: number, max: number): T;

  abs<T extends NDArray>(ndarray: T): T;

  sigmoid<T extends NDArray>(ndarray: T): T;

  sin<T extends NDArray>(ndarray: T): T;

  cos<T extends NDArray>(ndarray: T): T;

  tan<T extends NDArray>(ndarray: T): T;

  asin<T extends NDArray>(ndarray: T): T;

  acos<T extends NDArray>(ndarray: T): T;

  atan<T extends NDArray>(ndarray: T): T;

  sinh<T extends NDArray>(ndarray: T): T;

  cosh<T extends NDArray>(ndarray: T): T;

  tanh<T extends NDArray>(ndarray: T): T;

  step<T extends NDArray>(ndarray: T, alpha: number): T;

  conv2d(x: Array4D, filter: Array4D, bias: Array1D|null, convInfo: Conv2DInfo):
      Array4D;

  conv2dDerInput(dy: Array4D, filter: Array4D, convInfo: Conv2DInfo): Array4D;

  conv2dDerFilter(x: Array4D, dY: Array4D, convInfo: Conv2DInfo): Array4D;

  conv2dDerBias(dY: Array4D): Array1D;

  depthwiseConv2D(input: Array4D, filter: Array4D, convInfo: Conv2DInfo):
      Array4D;

  maxPool(x: Array4D, convInfo: Conv2DInfo): Array4D;

  maxPoolBackprop(dy: Array4D, x: Array4D, convInfo: Conv2DInfo): Array4D;

  minPool(x: Array4D, convInfo: Conv2DInfo): Array4D;

  avgPool(x: Array4D, convInfo: Conv2DInfo): Array4D;

  tile<D extends keyof DataTypes, T extends NDArray<D>>(a: T, reps: number[]):
      T;

  transpose<D extends keyof DataTypes, T extends NDArray<D>>(
      a: T, perm: number[]): T;

  resizeBilinear3D(
      x: Array3D, newShape2D: [number, number], alignCorners: boolean): Array3D;

  batchNormalization2D(
      x: Array2D, mean: Array2D|Array1D, variance: Array2D|Array1D,
      varianceEpsilon: number, scale?: Array2D|Array1D,
      offset?: Array2D|Array1D): Array2D;

  batchNormalization3D(
      x: Array3D, mean: Array3D|Array1D, variance: Array3D|Array1D,
      varianceEpsilon: number, scale?: Array3D|Array1D,
      offset?: Array3D|Array1D): Array3D;

  multinomial(probabilities: Array2D, numSamples: number, seed: number):
      Array2D<'int32'>;

  oneHot(indices: Array1D, depth: number, onValue: number, offValue: number):
      Array2D;
}
