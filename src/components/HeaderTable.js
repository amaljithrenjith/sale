
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addHeader } from '../redux/actions';
import "../App.css"


const HeaderTable = () => {
  const headerData = useSelector((state) => state.headerData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get('http://5.189.180.8:8010/header');
        dispatch(addHeader(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching header data:', error);
        setLoading(false);
      }
    };

    if (loading) {
      fetchHeaderData();
    }
  }, [dispatch, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="table-container">
      <h2>Header Table</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            
          </tr>
        </thead>
        <tbody>
          {headerData.map((item, index) => (
            <tr key={index}>
              <td>{item.column1}</td>
              <td>{item.column2}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeaderTable;
