import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const WarningMessage = ({ data }) => {
  const { RUN_STAT, TEMPR_1: temperature1, TEMPR_2: temperature2, W_PRES: pressure, AC_CURR: current } = data;
  const [logEntries, setLogEntries] = useState([]);

  const runStatDescriptions = {
    0x04: 'Overheating detected!',
    0x10: 'Valve stuck detected!',
    0x20: 'Leakage detected!'
  };

  useEffect(() => {
    // console.log('Data received:', data);
    const newLogEntries = [];
    
    // Parse RUN_STAT bitmask and log conditions
    const runStatValue = parseInt(RUN_STAT, 16);
    Object.keys(runStatDescriptions).forEach(flag => {
      if (runStatValue & flag) {
        newLogEntries.push({ logName: `SEN_IGN_STAT`, log: runStatDescriptions[flag] });
      }
    });

    // Additional checks for other conditions if needed
    if (temperature1 < 0 || temperature1 > 35) {
      newLogEntries.push({ logName: 'TEMPR_1', log: 'Temperature 1 is out of the safe range!' });
    }
    if (temperature2 < 0 || temperature2 > 35) {
      newLogEntries.push({ logName: 'TEMPR_2', log: 'Temperature 2 is out of the safe range!' });
    }
    if (pressure < 20 || pressure > 120) {
      newLogEntries.push({ logName: 'W_PRES', log: 'Water pressure is out of the safe range!' });
    }
    if (current < 0 || current > 50) {
      newLogEntries.push({ logName: 'AC_CURR', log: 'Current is out of the safe range!' });
    }

    setLogEntries(newLogEntries);
  }, [data]);

  useEffect(() => {
    const postLogWarnings = async (logs) => {
      try {
        console.log('Sending logs to backend:', logs);
        const result = await axios.post(`${BACKURL}/log/postLogWarnings`, logs);
        console.log('Logs created successfully:', result.data);
        return result.data;
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
      <ToastContainer autoClose={2500} />
      {logEntries.length === 0 && <p>All conditions are normal.</p>}
    </div>
  );
};

export default WarningMessage;
