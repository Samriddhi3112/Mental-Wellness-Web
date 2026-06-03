import { getToken, getMessaging, isSupported } from "firebase/messaging";
import { app } from "../firebase/firebaseConfig";

export const getFCMToken = async () => {
  try {
    const supported = await isSupported();

    if (!supported) {
      console.log("FCM is not supported in this browser/environment");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/mental_wellness_web/firebase-messaging-sw.js",
    );

    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey:
        "BHZE9ugTutmL3K5j4j_it82ZrTJbA7XossXYdd7hQtc2km13ilNzmy3izUk4nr1Wz-NVuBECcCx6SGi6G7v3dJI",
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};
