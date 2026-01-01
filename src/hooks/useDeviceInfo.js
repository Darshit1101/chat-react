import { getBrowser, getClientFingerprint,getOS } from "../utils/deviceInfo";
import { useEffect, useState } from "react";

const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const fingerprint = await getClientFingerprint();
        const userAgent = navigator.userAgent;

        const info = {
          browser: getBrowser(userAgent),
          os: getOS(userAgent),
          userAgent,
          visitorId: fingerprint.visitorId,
        };

        setDeviceInfo(info);
      } catch (err) {
        console.error("Error fetching device info===>", err);
      }
    };

    fetchDeviceInfo();
  }, []);

  return { deviceInfo };
};

export default useDeviceInfo;
