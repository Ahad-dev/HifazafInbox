import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { sendEmail } from "../services/user.services";
import { SparklesText } from './magicui/sparkles-text';
import { ShineBorder } from './magicui/shine-border';
import { RainbowButton } from './magicui/rainbow-button';

const BulkEmailSender = ({ userEmail }) => {
    const [template, setTemplate] = useState("");
    const [subject, setSubject] = useState("");
    const [excelFile, setExcelFile] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [activeTab, setActiveTab] = useState('template');

    const handleFileChange = (e) => {
        setExcelFile(e.target.files[0]);
    };

    const handleAttachmentChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(prev => [...prev, ...files]);
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!excelFile || !template || !subject) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("excelFile", excelFile);
        formData.append("template", template);
        formData.append("subject", subject);
        formData.append("userEmail", userEmail);
        
        attachments.forEach((file, index) => {
            formData.append(`attachments`, file);
        });

        try {
            const data = await sendEmail(formData);
            setResults(data.results);  
            alert("Emails sent successfully!");
        } catch (error) {
            console.error("Error sending emails:", error);
            alert("Error sending emails. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            <SparklesText>Send Templated Emails</SparklesText>
                        </h2>
                        <p className="text-gray-600 mt-1">Create and send personalized emails to multiple recipients</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                                {userEmail.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-gray-700 font-medium">{userEmail}</span>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${excelFile ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                1
                            </div>
                            <div className="ml-2 text-sm font-medium">Upload Excel</div>
                        </div>
                        <div className="flex-1 h-1 mx-4 bg-gray-200">
                            <div className={`h-full ${subject ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: subject ? '100%' : '0%' }}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${subject ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                2
                            </div>
                            <div className="ml-2 text-sm font-medium">Add Details</div>
                        </div>
                        <div className="flex-1 h-1 mx-4 bg-gray-200">
                            <div className={`h-full ${template ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: template ? '100%' : '0%' }}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${template ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                3
                            </div>
                            <div className="ml-2 text-sm font-medium">Send</div>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        {/* Excel File Upload */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-500 transition-colors">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Excel File Upload
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {excelFile && (
                                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{excelFile.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Email Subject */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-500 transition-colors">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Email Subject
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                placeholder="Enter email subject"
                            />
                        </div>

                        {/* Email Template */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-500 transition-colors">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Template
                                </label>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('template')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            activeTab === 'template'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Template
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('preview')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            activeTab === 'preview'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>
                            {activeTab === 'template' ? (
                                <Editor
                                    apiKey="0ibojf2y9x3pjkci0u03qczrgc8p12mkv387pbnbjqvakgr9"
                                    value={template}
                                    onEditorChange={(content) => setTemplate(content)}
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount"
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help"
                                    }}
                                />
                            ) : (
                                <div className="border rounded-md p-4 bg-white min-h-[400px]">
                                    <div dangerouslySetInnerHTML={{ __html: template }} />
                                </div>
                            )}
                            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Use double curly braces for placeholders (e.g., name, company)</span>
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-500 transition-colors">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Email Attachments
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">Any file type</p>
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleAttachmentChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {attachments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {attachments.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                                            <span className="text-sm text-gray-600">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeAttachment(index)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <RainbowButton
                        type="submit"
                        disabled={loading}
                        className="w-full text-black hover:scale-105 transition-all duration-300 ease-in-out"
                        variant=""
                        size="lg"
                    >
                        <ShineBorder
                            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={2}
                        />
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Sending Emails...</span>
                            </div>
                        ) : (
                            "Send Emails"
                        )}
                    </RainbowButton>
                </form>

                {results && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            <SparklesText>Email Results</SparklesText>
                        </h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.map((result, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {result.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                        ${result.status === "success"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {result.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkEmailSender; 