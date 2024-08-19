export function mapReceivedDataToChartDetails(data) {
  const mapData = (key, factor = 1) => {
    return data.map((item, index) => ({
      index: index + 1,
      value: parseFloat(item[key]) * factor,
    }));
  };

  return [
    { title: "현재온도", range: "-10°C~60°C, ±1°C", data: mapData('TEMPR_1', 0.1) },
    { title: "현재온도2", range: "-10°C~60°C, ±1°C", data: mapData('TEMPR_2', 0.1) },
    { title: "현재압력", range: "0~200K Pa, 14%", data: mapData('W_PRES') },
    { title: "현재전류", range: "20%~85% A, ±4%A", data: mapData('AC_CURR', 0.1) },
    { title: "현재수압", range: "0~10 Bar, ±0.5%", data: mapData('WATER_PRESSURE') }
  ];
}