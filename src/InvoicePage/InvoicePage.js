import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InvoicePage.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";

function InvoicePage() {
    const navigate = useNavigate(); // Hook to navigate between pages
    const location = useLocation();
    const { formData } = location.state || {};
    const { state } = useLocation(); // This will give us the formData and extraData
    const { extraData } = state;

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on load
    }, []);

    if (!formData) {
        return <p>No data available</p>;
    }

    const groupedData = Object.entries(formData).reduce((acc, [item, details]) => {
        const { section } = details;
        if (!acc[section]) acc[section] = [];
        acc[section].push({ item, ...details });
        return acc;
    }, {});

    const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };
    const downloadInvoiceAsPDF = async () => {
        try {
            const doc = new jsPDF();
            const logoImg = await preloadImage(`${window.location.origin}/logo.jpeg`);
            const checkImg = await preloadImage(`${window.location.origin}/check.png`);

            // Header Section
            doc.setFontSize(18);
            doc.text("Invoice Details", 10, 15);

            doc.setFontSize(12);
            const createdDate = extraData.date || new Date().toLocaleDateString();
            doc.text(`Created Date: ${createdDate}`, 10, 39);
            doc.text(`Chasis No: ${extraData.chasisNo || ""}`, 10, 46);
            doc.text(`Vehicle Model: ${extraData.vehicleModel || ""}`, 10, 53);


            // doc.text(`Date: ${extraData.date || ""}`, 10, 60);

            // Add HR Line
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(10, 65, 200, 65); // Horizontal line
            let currentY = 80; // Ensuring proper margin after HR (10px below HR)

            // Add the Logo
            if (logoImg) {
                doc.addImage(logoImg, "JPEG", 160, 10, 30, 15); // Adjusted size
            }

            // Start Rendering Table
            // let currentY = 70;

            Object.entries(groupedData).forEach(([section, items]) => {
                // Section Title
                doc.setFontSize(14);
                doc.text(section, 10, currentY);
                currentY += 7;

                // Table Rows
                const rows = items.map((detail) => [
                    detail.item || "N/A",
                    detail.status === "okay" ? "✓" : "",
                    detail.status === "notOkay" ? "✓" : "",
                    detail.status === "adjusted" ? "✓" : "",
                    detail.status === "notChecked" ? "✓" : "",
                    detail.comments || "",
                ]);

                doc.autoTable({
                    head: [["Item", "Okay", "Not Okay", "Adjusted", "Not Checked", "Comments"]],
                    body: rows,
                    startY: currentY,
                    theme: "grid",
                    styles: { cellPadding: 2, fontSize: 10 },
                    headStyles: { fillColor: [41, 128, 185] },
                    didDrawCell: (data) => {
                        const { column, row } = data;
                        if (["1", "2", "3", "4"].includes(column.index.toString()) && row.raw[column.index] === "✓") {
                            const xPos = data.cell.x + 5; // Adjust X position for image
                            const yPos = data.cell.y + 2; // Adjust Y position for image
                            doc.addImage(checkImg, "PNG", xPos, yPos, 5, 5); // Add check image
                        }
                    },
                });

                currentY = doc.previousAutoTable.finalY + 10; // Update Y position after the table
            });

            // Save the PDF
            doc.save("invoice.pdf");
        } catch (err) {
            console.error("Failed to generate PDF:", err);
        }
    };


    return (
        <div>
            <section className="wrapper-invoice">
                <br />
                <div className="btn_container">
                    <button className="downloadPdfBtn" onClick={downloadInvoiceAsPDF}>
                        Download as PDF
                    </button>
                    <button className="backBtn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>


                <div className="invoice" id="invoice-content">

                    <div className="invoice-logo-brand">
                        <img src="./logo.jpeg" alt="Logo" />
                    </div>

                    <div className="invoice-information">
                        <p><b>Created Date:</b>{extraData.date || new Date().toLocaleDateString()}</p>
                        <p><b>Chasis No:</b> {extraData.chasisNo}</p>
                        <p><b>Vehicle Model:</b> {extraData.vehicleModel}</p>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />                  
                    <br />
                    <br />


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
                                                <td>
                                                    {detail.status === "okay" ? (
                                                        <img
                                                            src="./check.png"
                                                            style={{ width: "20px" }}
                                                            alt="Check"
                                                        />
                                                    ) : ""}
                                                </td>
                                                <td>
                                                    {detail.status === "notOkay" ? (
                                                        <img
                                                            src="./check.png"
                                                            style={{ width: "20px" }}
                                                            alt="Check"
                                                        />
                                                    ) : ""}
                                                </td>
                                                <td>
                                                    {detail.status === "adjusted" ? (
                                                        <img
                                                            src="./check.png"
                                                            style={{ width: "20px" }}
                                                            alt="Check"
                                                        />
                                                    ) : ""}
                                                </td>
                                                <td>
                                                    {detail.status === "notChecked" ? (
                                                        <img
                                                            src="./check.png"
                                                            style={{ width: "20px" }}
                                                            alt="Check"
                                                        />
                                                    ) : ""}
                                                </td>
                                                <td className="comments-column">{detail.comments || ""}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>



                    <div className="invoice-footer">
                        <p>Thank you</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InvoicePage;
