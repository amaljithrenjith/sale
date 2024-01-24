
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addDetail, removeDetail } from '../redux/actions';
import { useReactToPrint } from 'react-to-print';

const DetailTable = () => {
  const detailData = useSelector((state) => state.detailData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    item: '',
    quantity: 0,
    price: 0,
    
  });

  const [errors, setErrors] = useState({
    item: '',
    quantity: '',
    price: '',
    
  });

  const componentRef = useRef();


  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get('http://5.189.180.8:8010/detail');
        dispatch(addDetail(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching detail data:', error);
        setLoading(false);
      }
    };

    if (loading) {
      fetchDetailData();
    }
  }, [dispatch, loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.item.trim()) {
      newErrors.item = 'Item is required';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    // Add more validation rules for other fields based on your data

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleAddRow = () => {
    // Validate inputs
    if (validateInputs()) {
      // If valid, add the form data to the Redux store
      dispatch(addDetail(formData));
      // Reset form data
      setFormData({
        item: '',
        quantity: 0,
        price: 0,
        // Reset other fields based on your data
      });
    }
  };
  

  const handleRemoveRow = (index) => {
    // Remove the row from the Redux store
    dispatch(removeDetail(index));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="table-container">
      <h2>Detail Table</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {detailData.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              
              <td>
                <button type="button" onClick={() => handleRemoveRow(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-container" ref={componentRef}>
        <h3>Add New Row</h3>
        <form>
          <label>
            Item:
            <input type="text" name="item" value={formData.item} onChange={handleInputChange} />
            {errors.item && <span className="error">{errors.item}</span>}
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </label>
          <label>
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            {errors.price && <span className="error">{errors.price}</span>}
          </label>
          {/* Add more input fields based on your data */}
          <button type="button" onClick={handleAddRow}>
            Add Row
          </button>
          <button type="button" onClick={handlePrint}>
            Print
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailTable;
