import React from 'react';

const StatsBar = ({ inputStats, outputStats }) => {
    return (
        <div className="card">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Input</h3>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{inputStats.characters.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Characters</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{inputStats.words.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Words</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Output</h3>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-2xl font-bold text-primary-600">{outputStats.characters.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Characters</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-primary-600">{outputStats.words.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Words</p>
                        </div>
                    </div>
                </div>
            </div>

            {inputStats.characters > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Reduction:</span>
                        <span className={`font-semibold ${outputStats.characters < inputStats.characters ? 'text-emerald-600' : 'text-gray-600'
                            }`}>
                            {inputStats.characters > 0
                                ? `${((1 - outputStats.characters / inputStats.characters) * 100).toFixed(1)}%`
                                : '0%'
                            }
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsBar;
