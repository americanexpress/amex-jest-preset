/*
 * Copyright (c) 2017 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

module.exports = () => `
  html, body {
    font-family: sans-serif;
    font-size: 1rem;
  }
  body {
    padding: 1rem 1rem;
  }
  .summary {
    color: #999;
    margin-bottom: 1em;
  }
  .suite-info {
    padding-bottom: 1em;
    font-weight: bold;
    font-size: 0.9rem;
    color: black;
  }
  .suite-table {
    width: 100%;
    margin-bottom: 1em;
  }
  .suite-table tr.passed {
    background-color: mintcream;
    color: green;
  }
  .suite-table tr.failed {
    background-color: LavenderBlush;
    color: red;
  }
  .suite-table td {
    font-size: 0.85rem;
    border-bottom: 1px solid #aaa;
    vertical-align: top;
    padding: 0.5rem;
  }
  .suite-table span.result {
    float: right;
  }
`;
