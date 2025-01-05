import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceForm.module.css'; // Import the CSS Module


// Checklist extracted from the document
const checklist = [
  {
    section: 'A. Engine',
    items: [
      'Change oil and filter',
      'Change fuel lines and tank cap',
      'Check fuel filter',
      'Check air filter if needed',
      'Check spark plugs',
      'Check distributor cap & rotor',
      'Pressure test cooling system',
      'Check all hoses under pressure',
      'Check all belts & tensioners',
      'Check water pump and fan bearing',
      'Check complete exhaust system',
      'Check for engine oil leaks',
    ],
  },
  {
    section: 'B. Under The Hood Fluid Levels',
    items: [
      'Radiator Coolant',
      'Brake oil',
      'Steering oil',
      'Windshield washer',
      'Automatic transmission fluid',
      'Check AC Gas (blows cold)',
    ],
  },
  {
    section: 'C. Chassis',
    items: [
      'Check steering play',
      'Check power steering hose',
      'Check steering pitman arm, drag link & idler arm',
      'Check tie rod ends',
      'Check front springs',
      'Check front shocks',
      'Check ball joints',
      'Check rear springs',
      'Check rear shocks',
      'Check bell housing bolts',
      'Check transmission mounts',
      'Check U-joints & grease',
      'Check carrier bearings',
      'Check slip joint & grease',
      'Check wheels and axle seals',
    ],
  },
  {
    section: 'E. Brakes',
    items: [
      'Check for fluid leaks',
      'Check front pads & rotors',
      'Check rear brakes & adjustment',
      'Check parking brake operation',
    ],
  },
  {
    section: 'F. Drivability Checks',
    items: [
      'Check window glass and operation',
      'Check emergency exits',
      'Check mirrors, sport mirrors & brackets',
      'Check wiper blades',
      'Check if washer fluid sprays',
      'Check heater & AC fans',
      'Check heater, AC & defrost controls',
      'Check accelerator & linkage',
      'Check & lube all hinges, latches & locks',
      'Check & lube passenger doors',
      'Check fuel tank & mounting',
      'Check tire condition & match',
      'Check tire rims & lug nuts',
      'Check tire inflation',
      'Check mud flaps',
    ],
  },
  {
    section: 'G. Computer Diagnosis',
    items: [
      'Engine Control Module',
      'Air Bag System',
      'Transmission Control Module',
      'ABS',
      'Electronic Power Steering',
      'Tire Pressure Monitoring System',
      'Body Control Module',
    ],
  },
  {
    section: 'H. Safety / Emergency Items',
    items: [
      'Fire extinguisher',
      'First aid kit',
      'Operating flashlight',
      'Reflective triangles',
      'Toolkit',
    ],
  },
  {
    section: 'I. Wrap-Up',
    items: [
      'Check for leaks',
      'Recheck oil level',
      'Wash engine & chassis if applicable',
      'Install next PM due mileage in pocket',
      'Note any other repairs needed',
      'Computer Diagnosis',
    ],
  },
];


const ServiceForm = () => {
  
  
  const [formData, setFormData] = useState(
    checklist.reduce((acc, section) => {
      section.items.forEach((item) => {
        acc[item] = {
          status: '', // Store the selected radio button status
          comments: '',
          section: section.section  // Add the section here
        };
      });
      return acc;
    }, {})
  );

  const [extraData, setExtraData] = useState({
    chasisNo: '',
    vehicleModel: '',
    date: '',
    orderId: '',
    invoice: ''
  });

  const handleRadioChange = (item, value) => {
    setFormData((prev) => ({
      ...prev,
      [item]: { ...prev[item], status: value },
    }));
  };

  const handleCommentChange = (item, value) => {
    setFormData((prev) => ({
      ...prev,
      [item]: { ...prev[item], comments: value },
    }));
  };

  const handleExtraDataChange = (e) => {
    const { name, value } = e.target;
    setExtraData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  useEffect(() => {
    const container = document.getElementById('service-form-container'); // Ensure your container has this id
    if (container) {
      container.scrollTop = 0; // Scroll to the top of the specific container
    }
  }, []);
  return (
    <div style={{ padding: '20px' }} id="service-form-container">
      <h2>Service Checklist</h2>

      {/* New Input Fields */}
      <div className={styles.vehicleDetails}>
        <h3>Vehicle Details</h3>
        <div className={styles.gridLayout}>
          <label className={styles.label}>
            Chasis No:
            <input
              type="text"
              name="chasisNo"
              value={extraData.chasisNo}
              onChange={handleExtraDataChange}
              className={styles.inputField}
            />
          </label>
          <label className={styles.label}>
            Vehicle Model:
            <input
              type="text"
              name="vehicleModel"
              value={extraData.vehicleModel}
              onChange={handleExtraDataChange}
              className={styles.inputField}
            />
          </label>
          <label className={styles.label}>
            Date:
            <input
              type="date"
              name="date"
              value={extraData.date}
              onChange={handleExtraDataChange}
              className={styles.inputField}
            />
          </label>
          <label className={styles.label}>
            Order ID:
            <input
              type="text"
              name="orderId"
              value={extraData.orderId}
              onChange={handleExtraDataChange}
              className={styles.inputField}
            />
          </label>
          <label className={styles.label}>
            Invoice:
            <input
              type="text"
              name="invoice"
              value={extraData.invoice}
              onChange={handleExtraDataChange}
              className={styles.inputField}
            />
          </label>
        </div>
      </div>

      {/* Checklist */}
      {checklist.map((section) => (
        <div key={section.section} style={{ marginBottom: '20px' }}>
          <h3>{section.section}</h3>
          {section.items.map((item) => (
            <div key={item} style={{ marginBottom: '15px' }}>
              <p>{item}</p>

              {/* Replace checkboxes with radio buttons */}
              <label>
                <input
                  type="radio"
                  name={item}
                  value="okay"
                  checked={formData[item].status === 'okay'}
                  onChange={() => handleRadioChange(item, 'okay')}
                />{' '}
                Inspected Okay
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name={item}
                  value="notOkay"
                  checked={formData[item].status === 'notOkay'}
                  onChange={() => handleRadioChange(item, 'notOkay')}
                />{' '}
                Inspected Not Okay
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name={item}
                  value="adjusted"
                  checked={formData[item].status === 'adjusted'}
                  onChange={() => handleRadioChange(item, 'adjusted')}
                />{' '}
                Repaired & Adjusted
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name={item}
                  value="notChecked"
                  checked={formData[item].status === 'notChecked'}
                  onChange={() => handleRadioChange(item, 'notChecked')}
                />{' '}
                Not Checked
              </label>

              <textarea
                placeholder="Comments / Parts List"
                value={formData[item].comments}
                onChange={(e) => handleCommentChange(item, e.target.value)}
                className={styles.textarea}
              />
            </div>
          ))}
        </div>
      ))}

      {/* <Link
        to={"/invoice"}
        style={{ textDecoration: "none", color: "blue" }}
        state={{ formData: formData, extraData: extraData }}
      >
        View Invoice
      </Link> */}
      <Link
        to={"/invoice"}
        style={{ textDecoration: "none", color: "blue" }}
        state={{ formData: formData, extraData: extraData }}
      >
        View Invoice
      </Link>
    </div>
  );
};

export default ServiceForm;