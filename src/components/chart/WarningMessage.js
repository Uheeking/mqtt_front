import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const WarningMessage = ({ data }) => {
  const { dust: fineDust, co2, temperature, humidity, Illuminance: illuminance } = data;
  const [logEntries, setLogEntries] = useState([]);

  useEffect(() => {
    console.log('Data received:', data);
    const newLogEntries = [];

    if (fineDust > 150) {
      newLogEntries.push({ logName: 'fineDust', log: 'High levels of fine dust detected!' });
    }
    if (co2 > 1000) {
      newLogEntries.push({ logName: 'co2', log: 'High levels of CO2 detected!' });
    }
    if (temperature < 0 || temperature > 35) {
      newLogEntries.push({ logName: 'temperature', log: 'Temperature is out of the safe range!' });
    }
    if (humidity < 20 || humidity > 80) {
      newLogEntries.push({ logName: 'humidity', log: 'Humidity is out of the safe range!' });
    }
    if (illuminance > 80000) {
      newLogEntries.push({ logName: 'illuminance', log: 'High levels of illuminance detected!' });
    }

    setLogEntries(newLogEntries);
  }, [data]);

  useEffect(() => {
    const postLogWarnings = async (logs) => {
      try {
        console.log('Sending logs to backend:', logs);
        // const result = await axios.post(`${BACKURL}/postLogWarnings`, logs);
        // console.log('Logs created successfully:', result.data);
        // return result.data;
      } catch (error) {
        console.error('Error creating logs:', error);
        throw error;
      }
    };

    if (logEntries.length > 0) {
      postLogWarnings(logEntries);

      // Show the toast notifications
      logEntries.forEach(({ log }) => {
        toast.warn(log);
      });
    }
  }, [logEntries]);

  return (
    <div>
      <ToastContainer className="mt-20" />
      {logEntries.length === 0 && <p>All conditions are normal.</p>}
    </div>
  );
};

export default WarningMessage;