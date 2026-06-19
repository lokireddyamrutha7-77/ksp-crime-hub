import React, { useState } from 'react';

function FIRGenerator() {
    const [description, setDescription] = useState('');
    const [fir, setFir] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateFIR = async () => {
        if (!description.trim()) return;
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/fir/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: description })
            });
            const data = await response.json();
            if (data.success) {
                setFir(data.fir);
            }
        } catch (error) {
            alert('Error connecting to backend!');
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        if (!fir) return;
        const text = `
KARNATAKA STATE POLICE - FIR REPORT
=====================================
FIR Number: ${fir.fir_number}
Date: ${fir.date_of_complaint}
Time: ${fir.time_of_incident}
Place: ${fir.place_of_incident}
Complainant: ${fir.complainant_name}
Crime Type: ${fir.crime_type}
Description: ${fir.crime_description}
Accused: ${fir.accused_description}
BNS Sections: ${fir.bns_sections?.join(', ')}
District: ${fir.district}
Severity: ${fir.severity}
Investigating Officer: ${fir.investigating_officer}
    `;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#1a365d', borderBottom: '3px solid #e53e3e', paddingBottom: '10px' }}>
                🚔 KSP Voice FIR Generator
            </h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Describe the crime in English or Kannada — AI will generate a complete FIR
            </p>

            {/* Input Section */}
            <div style={{ marginBottom: '20px' }}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the crime here...
Example: On 15 June at 9 PM, complainant Ravi Kumar reported motorcycle theft near Mysuru Bus Stand. The bike is a red Honda Activa KA-09-1234."
                    style={{
                        width: '100%',
                        height: '120px',
                        padding: '12px',
                        fontSize: '14px',
                        border: '2px solid #cbd5e0',
                        borderRadius: '8px',
                        resize: 'vertical',
                        fontFamily: 'Arial'
                    }}
                />
                <button
                    onClick={generateFIR}
                    disabled={loading}
                    style={{
                        marginTop: '10px',
                        padding: '12px 30px',
                        backgroundColor: loading ? '#999' : '#e53e3e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? '⏳ Generating FIR...' : '📋 Generate FIR'}
                </button>
            </div>

            {/* FIR Output Section */}
            {fir && (
                <div style={{
                    border: '2px solid #2d3748',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    {/* FIR Header */}
                    <div style={{
                        backgroundColor: '#1a365d',
                        color: 'white',
                        padding: '15px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '18px' }}>
                                KARNATAKA STATE POLICE
                            </h2>
                            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                                First Information Report
                            </p>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: copied ? '#48bb78' : '#fff',
                                color: copied ? 'white' : '#1a365d',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }}
                        >
                            {copied ? '✅ Copied!' : '📋 Copy FIR'}
                        </button>
                    </div>

                    {/* FIR Body */}
                    <div style={{ padding: '20px', backgroundColor: '#f7fafc' }}>

                        {/* Severity Badge */}
                        <div style={{ marginBottom: '15px' }}>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                backgroundColor:
                                    fir.severity === 'High' ? '#fed7d7' :
                                        fir.severity === 'Medium' ? '#fefcbf' : '#c6f6d5',
                                color:
                                    fir.severity === 'High' ? '#c53030' :
                                        fir.severity === 'Medium' ? '#b7791f' : '#276749'
                            }}>
                                ⚠️ Severity: {fir.severity}
                            </span>
                            <span style={{
                                marginLeft: '10px',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                backgroundColor: '#bee3f8',
                                color: '#2b6cb0'
                            }}>
                                🚔 {fir.crime_type}
                            </span>
                        </div>

                        {/* FIR Details Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginBottom: '15px'
                        }}>
                            {[
                                { label: 'FIR Number', value: fir.fir_number },
                                { label: 'Date', value: fir.date_of_complaint },
                                { label: 'Time', value: fir.time_of_incident },
                                { label: 'District', value: fir.district },
                                { label: 'Place', value: fir.place_of_incident },
                                { label: 'Complainant', value: fir.complainant_name },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    backgroundColor: 'white',
                                    padding: '10px',
                                    borderRadius: '6px',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <div style={{ fontSize: '11px', color: '#718096', marginBottom: '2px' }}>
                                        {item.label}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Crime Description */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            marginBottom: '12px'
                        }}>
                            <div style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>
                                Crime Description
                            </div>
                            <div style={{ fontSize: '14px', color: '#2d3748', lineHeight: '1.6' }}>
                                {fir.crime_description}
                            </div>
                        </div>

                        {/* BNS Sections */}
                        <div style={{
                            backgroundColor: '#fff5f5',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #feb2b2'
                        }}>
                            <div style={{ fontSize: '11px', color: '#c53030', marginBottom: '6px', fontWeight: 'bold' }}>
                                ⚖️ Applicable BNS/IPC Sections
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {fir.bns_sections?.map((section, i) => (
                                    <span key={i} style={{
                                        padding: '4px 10px',
                                        backgroundColor: '#c53030',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '13px',
                                        fontWeight: 'bold'
                                    }}>
                                        {section}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default FIRGenerator;