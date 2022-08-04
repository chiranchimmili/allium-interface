import { createContext, useRef, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [port, setPort] = useState(0)
  const [streamName, setStreamName] = useState("")
  const [testType, setType] = useState("");
  const [packetCount, setPacketCount] = useState("");
  const [burstLength, setBurstLength] = useState("");
  const [speed, setSpeed] = useState("");
  const [mode, setMode] = useState("Continuous");
  const [IPG, setIPG] = useState("0");
  const [IBG, setIBG] = useState("0");
  const [ISG, setISG] = useState("0");
  const [ISGUnit, setISGUnit] = useState("0");
  const [IBGUnit, setIBGUnit] = useState("0");
  const [IPGUnit, setIPGUnit] = useState("0");

  const [macDa, setMacDa] = useState("");
  const [macSa, setMacSa] = useState("");
  const [vlan, setVlan] = useState("0x8100");
  const [vlanEn, setVlanEn] = useState(false);
  const [ethType, setEthType] = useState("0x0800");

  const [ipv4, ipv4En] = useState(false);
  const [version, setVersion] = useState("0x45");
  const [dscp, setDscp] = useState("0x00");
  const [identification, setIdentification] = useState("0x0000");
  const [flags, setFlags] = useState("0x4000");
  const [timetolive, setTimetolive] = useState("0x80");
  const [protocol, setProtocol] = useState("0x11");
  const [ipv4Da, setIpv4Da] = useState("");
  const [ipv4Sa, setIpv4Sa] = useState("");
  const [ipv4Length, setIpv4Length] = useState(0);

  const [udp, udpEn] = useState(false);
  const [udpDa, setUdpDa] = useState("");
  const [udpSa, setUdpSa] = useState("");
  const [udpLength, setUdpLength] = useState(0);

  const [payload, setPayload] = useState("None");
  const [payloadLength, setPayloadLength] = useState("");
  const [payloadPattern, setPayloadPattern] = useState("");
  const [BERTPattern, setBERTPattern] = useState("")

  const oldPayloadLength = useRef(0);

  const calculateIpv4Length = (bool, val) => {
    if (bool) {
      setIpv4Length(ipv4Length + val);
    } else {
      setIpv4Length(ipv4Length - val);
    }
  };
  const calculateUdpLength = (bool, val) => {
    if (bool) {
      setUdpLength(udpLength + val);
    } else {
      setUdpLength(udpLength - val);
    }
  };

  const calculateLengths = (newVal) => {
    if (newVal === "") {
      newVal = "0";
    }
    setIpv4Length(ipv4Length + parseInt(newVal) - oldPayloadLength.current);
    setUdpLength(udpLength + parseInt(newVal) - oldPayloadLength.current);
  };

  const [timer, setTimer] = useState(null);

  const updateLengths = (e) => {
    const newVal = e.currentTarget.value;
    if (payloadLength === "") {
      oldPayloadLength.current = 0;
    } else {
      oldPayloadLength.current = parseInt(payloadLength);
    }

    setPayloadLength(e.currentTarget.value);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      calculateLengths(newVal);
    }, 1);

    setTimer(newTimer);
  };

  const updateStreamName = (data, port) => {
    if (port == 0) {
        setStreamName(data)
        rowsData[selectedRow].streamName = data;
    } else {
        setStreamName(data)
      rowsData2[selectedRow2].streamName = data;
    }
  }

  const updateMode = (data, port) => {
    if (port == 0) {
      setMode(data)
      rowsData[selectedRow].mode = data
    }
    else {
      setMode(data)
      rowsData2[selectedRow2].mode = data
    }
  }

  const updateType = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].type = data
    }
    else {
      rowsData2[selectedRow2].type = data
    }
    setType(data)
  }

  const updatePacketCount = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].packetCount = data
    }
    else {
      rowsData2[selectedRow2].packetCount = data
    }
    setPacketCount(data)
  }

  const updateBurstLength = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].burstLength = data
    }
    else {
      rowsData2[selectedRow2].burstLength = data
    }
    setBurstLength(data)
  }
  const updateSpeed = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].speed = data
    }
    else {
      rowsData2[selectedRow2].speed = data
    }
    setSpeed(data)
  }
  const updateIPG = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].IPG = data
    }
    else {
      rowsData2[selectedRow2].IPG = data
    }
    setIPG(data)
  }
  const updateISG = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].ISG = data
    }
    else {
      rowsData2[selectedRow2].ISG = data
    }
    setISG(data)
  }
  const updateIBG = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].IBG = data
    }
    else {
      rowsData2[selectedRow2].IBG = data
    }
    setIBG(data)
  }
  const updateISGUnit = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].ISGUnit = data
    }
    else {
      rowsData2[selectedRow2].ISGUnit = data
    }
    setISGUnit(data)
  }
  const updateIPGUnit = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].IPGUnit = data
    }
    else {
      rowsData2[selectedRow2].IPGUnit = data
    }
    setIPGUnit(data)
  }
  const updateIBGUnit = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].IBGUnit = data
    }
    else {
      rowsData2[selectedRow2].IBGUnit = data
    }
    setIBGUnit(data)
  }
  // const updateMac = (data, port) => {
  //   if (port == 0) {
  //     rowsData[selectedRow].mac = data
  //   }
  //   else {
  //     rowsData2[selectedRow2].mac = data
  //   }
  //   macEn(data)
  // }

  const updateMacDa = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].macDa = data
    }
    else {
      rowsData2[selectedRow2].macDa = data
    }
    setMacDa(data)
  }

  const updateMacSa = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].macSa = data
    }
    else {
      rowsData2[selectedRow2].macSa = data
    }
    setMacSa(data)
  }

  const updateVlan = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].vlan = data
    }
    else {
      rowsData2[selectedRow2].vlan = data
    }
    setVlan(data)
  }
  const updateVlanEn = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].vlanEn = data
    }
    else {
      rowsData2[selectedRow2].vlanEN = data
    }
    setVlanEn(data)
  }

  const updateEthType = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].ethType = data
    }
    else {
      rowsData2[selectedRow2].ethType = data
    }
    setEthType(data)
  }

  const updateIpv4 = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].ipv4 = data
    }
    else {
      rowsData2[selectedRow2].ipv4 = data
    }
    ipv4En(data)
  }

  const updateVersion = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].version = data
    }
    else {
      rowsData2[selectedRow2].version = data
    }
    setVersion(data)
  }

  const updateDscp = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].dscp = data
    }
    else {
      rowsData2[selectedRow2].dscp = data
    }
    setDscp(data)
  }

  const updateIdentification = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].identification = data
    }
    else {
      rowsData2[selectedRow2].identification = data
    }
    setIdentification(data)
  }

  const updateFlags = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].flags = data
    }
    else {
      rowsData2[selectedRow2].flags = data
    }
    setFlags(data)
  }

  const updateTimetolive = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].timetolive = data
    }
    else {
      rowsData2[selectedRow2].timetolive = data
    }
    setTimetolive(data)
  }

  const updateProtocol = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].protocol = data
    }
    else {
      rowsData2[selectedRow2].protocol = data
    }
    setProtocol(data)
  }

  const updateIpv4Da = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].ipv4Da = data
    }
    else {
      rowsData2[selectedRow2].ipv4Da = data
    }
    setIpv4Da(data)
  }

  const updateIpv4Sa = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].ipv4Sa = data
    }
    else {
      rowsData2[selectedRow2].ipv4Sa = data
    }
    setIpv4Sa(data)
  }

  const updateUdp = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].udp = data
    }
    else {
      rowsData2[selectedRow2].udp = data
    }
    udpEn(data)
  }

  const updateUdpDa = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].udpDa = data
    }
    else {
      rowsData2[selectedRow2].udpDa = data
    }
    setUdpDa(data)
  }

  const updateUdpSa = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].udpSa = data
    }
    else {
      rowsData2[selectedRow2].udpSa = data
    }
    setUdpSa(data)
  }

  const updateUdpLength = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].udpLength = data
    }
    else {
      rowsData2[selectedRow2].udpLength = data
    }
    setUdpLength(data)
  }

  const updatePayload = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].payload = data
    }
    else {
      rowsData2[selectedRow2].payload = data
    }
    setPayload(data)
  }

  const updatePayloadLength = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].payloadLength = data
    }
    else {
      rowsData2[selectedRow2].payloadLength = data
    }
    setPayloadLength(data)
  }

  const updatePayloadPattern = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].payloadPattern = data
    }
    else {
      rowsData2[selectedRow2].payloadPattern = data
    }
    setPayloadPattern(data)
  }

  const updateBERTPattern = (data, port) => {
    if (port == 0) {
      rowsData[selectedRow].BERTPattern = data
    }
    else {
      rowsData2[selectedRow2].BERTPattern = data
    }
    setBERTPattern(data)
  }

  const updateAll = (port) => {
    if (port === 0) {
        if (rowsData[selectedRow]) {
            setPort(port)
            updateStreamName(rowsData[selectedRow].streamName, port)
            updateMode(rowsData[selectedRow].mode, port)
            updateType(rowsData[selectedRow].type, port)
            updatePacketCount(rowsData[selectedRow].packetCount, port)
            updateBurstLength(rowsData[selectedRow].burstLength, port)
            updateSpeed(rowsData[selectedRow].speed, port)
            updateIPG(rowsData[selectedRow].IPG, port)
            updateISG(rowsData[selectedRow].ISG, port)
            updateIBG(rowsData[selectedRow].IBG, port)
            updateIPGUnit(rowsData[selectedRow].IPGUnit, port)
            updateIBGUnit(rowsData[selectedRow].IPGUnit, port)
            updateISGUnit(rowsData[selectedRow].ISGUnit, port)
            updateMacDa(rowsData[selectedRow].macDa, port)
            updateMacSa(rowsData[selectedRow].macSa, port)
            updateVlanEn(rowsData[selectedRow].vlanEn, port)
            updateVlan(rowsData[selectedRow].vlan, port)
            updateEthType(rowsData[selectedRow].ethType, port)
            updateIpv4(rowsData[selectedRow].ipv4, port)
            updateDscp(rowsData[selectedRow].dscp, port)
            updateProtocol(rowsData[selectedRow].protocol, port)
            updateVersion(rowsData[selectedRow].version, port)
            updateIdentification(rowsData[selectedRow].identification, port)
            updateFlags(rowsData[selectedRow].flags, port)
            updateTimetolive(rowsData[selectedRow].timetolive, port)
            updateIpv4Da(rowsData[selectedRow].ipv4Da, port)
            updateIpv4Sa(rowsData[selectedRow].ipv4Sa, port)
            updateUdp(rowsData[selectedRow].udp, port)
            updateUdpDa(rowsData[selectedRow].udpDa, port)
            updateUdpSa(rowsData[selectedRow].udpSa, port)
            updatePayload(rowsData[selectedRow].payload, port)
            updatePayloadLength(rowsData[selectedRow].payloadLength, port)
            updatePayloadPattern(rowsData[selectedRow].payloadPattern, port)
            updateBERTPattern(rowsData[selectedRow].BERTPattern, port)
        }
    } else {
        if (rowsData2[selectedRow2]) {
            setPort(port)
            updateStreamName(rowsData2[selectedRow2].streamName, port)
            updateMode(rowsData2[selectedRow2].mode, port)
            updateType(rowsData2[selectedRow2].type, port)
            updatePacketCount(rowsData2[selectedRow2].packetCount, port)
            updateBurstLength(rowsData2[selectedRow2].burstLength, port)
            updateSpeed(rowsData2[selectedRow2].speed, port)
            updateIPG(rowsData2[selectedRow2].IPG, port)
            updateISG(rowsData2[selectedRow2].ISG, port)
            updateIBG(rowsData2[selectedRow].IBG, port)
            updateIPGUnit(rowsData2[selectedRow2].IPGUnit, port)
            updateIBGUnit(rowsData2[selectedRow2].IPGUnit, port)
            updateISGUnit(rowsData2[selectedRow2].ISGUnit, port)
            updateMacDa(rowsData2[selectedRow2].macDa, port)
            updateMacSa(rowsData2[selectedRow2].macSa, port)
            updateVlanEn(rowsData2[selectedRow2].vlanEn, port)
            updateVlan(rowsData2[selectedRow2].vlan, port)
            updateEthType(rowsData2[selectedRow2].ethType, port)
            updateIpv4(rowsData2[selectedRow2].ipv4, port)
            updateDscp(rowsData2[selectedRow2].dscp, port)
            updateProtocol(rowsData2[selectedRow2].protocol, port)
            updateVersion(rowsData2[selectedRow2].version, port)
            updateIdentification(rowsData2[selectedRow2].identification, port)
            updateFlags(rowsData2[selectedRow2].flags, port)
            updateTimetolive(rowsData2[selectedRow2].timetolive, port)
            updateIpv4Da(rowsData2[selectedRow2].ipv4Da, port)
            updateIpv4Sa(rowsData2[selectedRow2].ipv4Sa, port)
            updateUdp(rowsData2[selectedRow2].udp, port)
            updateUdpDa(rowsData2[selectedRow2].udpDa, port)
            updateUdpSa(rowsData2[selectedRow2].udpSa, port)
            updatePayload(rowsData2[selectedRow2].payload, port)
            updatePayloadLength(rowsData2[selectedRow2].payloadLength, port)
            updatePayloadPattern(rowsData2[selectedRow2].payloadPattern, port)
            updateBERTPattern(rowsData2[selectedRow2].BERTPattern, port)
        }
    }
  }

  const [modalOpen, setModalOpen] = useState("modalClosed");
  const [modal2Open, setModal2Open] = useState("modal2Closed");
  const [rowsData, setRowsData] = useState([
    // {
    //   port: 0,
    //   name: "New Stream",
    //   type: "Generation",
    //   mode: "Continuous",
    //   packetCount: "0",
    //   burstLength: "0",
    //   speed: "1000",
    //   IPG: "0",
    //   IBG: "0",
    //   ISG: "0",
    //   ISGUnit: "ms",
    //   IPGUnit: "ms",
    //   IBGUnit: "ms",
    //   macDa: "",
    //   macSa: "",
    //   vlan: "0x8100",
    //   vlanEn: false,
    //   ethType: "0x0800",
    //   ipv4: false,
    //   version: "0x45",
    //   dscp: "0x00",
    //   identification: "0x0000",
    //   flags: "0x4000",
    //   timetolive: "0x80",
    //   protocol: "0x11",
    //   ipv4Da: "",
    //   ipv4Sa: "",
    //   ipv4Length: 0,
    //   udp: false,
    //   udpDa: "",
    //   udpSa: "",
    //   udpLength: 0,
    //   payload: "None",
    //   payloadLength: "",
    //   payloadPattern: "",
    //   nextStream: -1,
    //   checked: false,
    // },
  ]);
  const [rowsData2, setRowsData2] = useState([
    // {
    //   port: 1,
    //   name: "New Stream",
    //   type: "Generation",
    //   mode: "Continuous",
    //   packetCount: "0",
    //   burstLength: "0",
    //   speed: "1000",
    //   IPG: "0",
    //   IBG: "0",
    //   ISG: "0",
    //   ISGUnit: "ms",
    //   IPGUnit: "ms",
    //   IBGUnit: "ms",
    //   macDa: "",
    //   macSa: "",
    //   vlan: "0x8100",
    //   vlanEn: false,
    //   ethType: "0x0800",
    //   ipv4: false,
    //   version: "0x45",
    //   dscp: "0x00",
    //   identification: "0x0000",
    //   flags: "0x4000",
    //   timetolive: "0x80",
    //   protocol: "0x11",
    //   ipv4Da: "",
    //   ipv4Sa: "",
    //   ipv4Length: 0,
    //   udp: false,
    //   udpDa: "",
    //   udpSa: "",
    //   udpLength: 0,
    //   payload: "None",
    //   payloadLength: "",
    //   payloadPattern: "",
    //   nextStream: -1,
    //   checked: false,
    // },
  ]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRow2, setSelectedRow2] = useState(0);
  const [selectedRows, setSelectedRows] = useState([...rowsData, ...rowsData2]);

  const updateSelectedRows = (index, bool) => {
    if (bool) {
      addIndex(index);
    } else {
      deleteIndex(index);
    }
  };

  const addIndex = (index) => {
    if (!selectedRows.includes(index)) {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const deleteIndex = (index) => {
    const rows = [...selectedRows];
    rows.splice(rows.indexOf(index), 1);
    setSelectedRows(rows);
  };

  const containsIndex = (index) => {
    const rows = [...selectedRows];
    if (rows.includes(index)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen, port, setPort, 
        setModalOpen, updateAll,
        modal2Open, streamName, updateStreamName,
        setModal2Open,
        rowsData,
        setRowsData,
        rowsData2,
        setRowsData2,
        selectedRow,
        setSelectedRow,
        selectedRow2,
        setSelectedRow2,
        selectedRows,
        setSelectedRows,
        updateSelectedRows,
        containsIndex, updateType, BERTPattern, updateBERTPattern,
        testType, mode, updateMode, packetCount, updatePacketCount, burstLength, updateBurstLength
        , speed, updateSpeed, IPG, updateIPG, IBG, updateIBG, ISG, updateISG, ISGUnit, updateISGUnit, IBGUnit, updateIBGUnit, IPGUnit, updateIPGUnit,
         macDa, updateMacDa, macSa, updateMacSa, vlan, updateVlan, vlanEn, updateVlanEn,
        ethType, updateEthType, ipv4, updateIpv4, ipv4Da, updateIpv4Da, ipv4Sa, updateIpv4Sa, version, updateVersion, dscp, updateDscp, identification, updateIdentification, flags, updateFlags,
        timetolive, updateTimetolive, protocol, updateProtocol, ipv4Length, udp, updateUdp, udpDa, updateUdpDa, udpSa, updateUdpSa, udpLength, payload, updatePayload, payloadLength, updatePayloadLength, payloadPattern, updatePayloadPattern, calculateIpv4Length, calculateUdpLength, updateLengths
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
