
'use client';
import React, { useState } from 'react';

const BaccaratSimulator = () => {
  const [results, setResults] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [history, setHistory] = useState([]);

  const handleResult = (value) => {
    const updatedResults = [...results, value];
    setResults(updatedResults);
    const predictionResult = simulatePrediction(updatedResults);
    setPrediction(predictionResult.prediction);
    setAccuracy(predictionResult.accuracy);
    setHistory([...history, {
      round: updatedResults.length,
      result: value,
      predicted: predictionResult.prediction,
      hit: predictionResult.prediction === value,
    }]);
  };

  const simulatePrediction = (data) => {
    const last = data[data.length - 1];
    const prediction = Math.random() < 0.7 ? last : (last === '閒' ? '莊' : '閒');
    const accuracy = 70;
    return { prediction, accuracy };
  };

  return (
    <div className="p-4 flex flex-col gap-4 max-w-md mx-auto">
      <div className="bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold text-center">百家樂 AI 模擬器</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <button onClick={() => handleResult('閒')} className="text-lg py-4 bg-blue-200 rounded">閒</button>
          <button onClick={() => handleResult('和')} className="text-lg py-4 bg-green-200 rounded">和</button>
          <button onClick={() => handleResult('莊')} className="text-lg py-4 bg-red-200 rounded">莊</button>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-lg">AI 預測：<span className="font-semibold">{prediction}</span> ({accuracy}%)</h2>
          <div className="w-full bg-gray-200 h-2 mt-1">
            <div className="bg-blue-500 h-2" style={{ width: `${accuracy}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto mt-4">
        <h2 className="text-lg font-semibold text-center">歷史紀錄</h2>
        <table className="w-full text-sm whitespace-nowrap mt-2">
          <thead>
            <tr className="text-left">
              <th className="px-2">局數</th>
              <th className="px-2">結果</th>
              <th className="px-2">預測</th>
              <th className="px-2">是否命中</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="text-center border-t">
                <td className="px-2 py-1">{h.round}</td>
                <td className="px-2 py-1">{h.result}</td>
                <td className="px-2 py-1">{h.predicted}</td>
                <td className="px-2 py-1">{h.hit ? '✔️' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BaccaratSimulator;
