import React from "react";
import "./InvoicePage.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "jspdf-autotable";

function InvoicePage() {
    const location = useLocation();
    const { formData } = location.state || {};

    if (!formData) {
        return <p>No data available</p>;
    }

    const groupedData = Object.entries(formData).reduce((acc, [item, details]) => {
        const { section } = details;
        if (!acc[section]) acc[section] = [];
        acc[section].push({ item, ...details });
        return acc;
    }, {});

    const downloadInvoiceAsPDF = () => {
        const doc = new jsPDF();

        let currentY = 10; // Track vertical position
        const groupedData = Object.entries(formData).reduce((acc, [item, details]) => {
            const { section } = details;
            if (!acc[section]) acc[section] = [];
            acc[section].push({ item, ...details });
            return acc;
        }, {});

        Object.entries(groupedData).forEach(([section, items]) => {
            // Add a section title
            doc.setFontSize(14);
            doc.text(section, 10, currentY);
            currentY += 10;

            // Convert the items into rows for the table
            const rows = items.map((detail) => [
                detail.item || "N/A", // Item name
                detail.okay ? "Yes" : "No", // Okay column
                detail.notOkay ? "Yes" : "No", // Not Okay column
                detail.adjusted ? "Yes" : "No", // Adjusted column
                detail.notChecked ? "Yes" : "No", // Not Checked column
                detail.comments || "N/A", // Comments column
            ]);

            // Add the table
            doc.autoTable({
                head: [["Item", "Okay", "Not Okay", "Adjusted", "Not Checked", "Comments"]],
                body: rows,
                startY: currentY,
                theme: "grid",
                styles: { cellPadding: 2, fontSize: 10 },
                headStyles: { fillColor: [41, 128, 185] },
                didParseCell: (data) => {
                    // Check if it's a cell in the body
                    if (data.section === "body") {
                        const cellText = data.cell.raw;
                        // Apply green for "Yes" and red for "No"
                        if (cellText === "Yes") {
                            data.cell.styles.textColor = [34, 139, 34]; // Green
                        } else if (cellText === "No") {
                            data.cell.styles.textColor = [255, 0, 0]; // Red
                        }
                    }
                },
            });

            currentY = doc.previousAutoTable.finalY + 10; // Update Y position after the table
        });

        doc.save("invoice.pdf");
    };
    return (
        <div>
            <section className="wrapper-invoice">
                <div className="btn_container">
                    <button className="dowloadPdfBtn" onClick={downloadInvoiceAsPDF}>
                        Download as PDF
                    </button>
                </div>

                <div className="invoice" id="invoice-content">
                    <div className="invoice-information">
                        <p><b>Order ID:</b> #12345</p>
                        <p><b>Invoice #:</b> 2024001</p>
                        <p><b>Created Date:</b> 16-Nov-2024</p>
                    </div>

                    <div className="invoice-logo-brand">
                        <img src="./logo.jpeg" alt="Logo" />
                    </div>

                    <div className="invoice-body">
                        {Object.entries(groupedData).map(([section, items]) => (
                            <div key={section}>
                                <h3>{section}</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Okay</th>
                                            <th>Not Okay</th>
                                            <th>Adjusted</th>
                                            <th>Not Checked</th>
                                            <th>Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((detail, index) => (
                                            <tr key={index}>
                                                <td>{detail.item}</td>
                                                <td style={{ color: detail.okay ? "green" : "red" }}>
                                                    {detail.okay ? "Yes" : "No"}
                                                </td>
                                                <td style={{ color: detail.notOkay ? "green" : "red" }}>
                                                    {detail.notOkay ? "Yes" : "No"}
                                                </td>
                                                <td style={{ color: detail.adjusted ? "green" : "red" }}>
                                                    {detail.adjusted ? "Yes" : "No"}
                                                </td>
                                                <td style={{ color: detail.notChecked ? "green" : "red" }}>
                                                    {detail.notChecked ? "Yes" : "No"}
                                                </td>
                                                <td className="comments-column">{detail.comments}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>

                    <div className="invoice-total-amount">
                        <p><b>Total Amount: $209.50</b></p>
                    </div>

                    <div className="invoice-footer">
                        <p>Thank you, happy shopping again!</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InvoicePage;
