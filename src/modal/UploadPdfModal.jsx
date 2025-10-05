import React from "react";

const UploadPdfModal = ({ onClose, onUpload, loading }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Upload PDF</h2>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition">
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 16v-8m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                            />
                        </svg>
                        <p className="text-gray-600 text-sm">
                            Drag and drop or click to upload
                            <br />
                            <span className="text-gray-500 text-xs">
                                PDFs supported
                            </span>
                        </p>
                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={onUpload}
                        />
                    </label>
                </div>

                {loading && (
                    <p className="text-blue-600 text-sm mt-3">Extracting text from PDF...</p>
                )}

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPdfModal
