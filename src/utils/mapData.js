export function mapReceivedDataToChartDetails(receivedData) {
    const co2Data = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.co2) }));
    const dustData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.dust) }));
    const temperatureData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.temperature) }));
    const humidityData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.humidity) }));
    const illuminanceData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.Illuminance) }));
  
    return [
      { title: "CO2 측정", range: "400-5,000ppm, 해상도 1ppm", data: co2Data },
      { title: "미세먼지 측정", range: "OuE/ 1m-5000u/mt", data: dustData },
      { title: "온도측정", range: "-10°C~60°C, ±1°C", data: temperatureData },
      { title: "습도측정", range: "20%~85% RH, ±4%RH", data: humidityData },
      { title: "조도측정", range: "0~200K Lux, 14%", data: illuminanceData },
    ];
  }
  