import { initializeApp } from 'firebase/app'
import { getToken, getMessaging, onMessage } from 'firebase/messaging'
import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

onMessage(messaging, payload => {
    console.log('Message received. ', payload)
})

export const useMessaging = () => {
    const setToken = async () => {
        const token = await getToken(messaging, { vapidKey: import.meta.env.SNOWPACK_PUBLIC_FCM_VAPID_KEY })
        const timetableLatestGrdp = (localStorage.getItem('timetable-latest-grdp')?.split('') || ['1', '-', '1']).join('')
        if (token) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(token)
            await fetch('http://localhost:5000/api/fcm/regFCMToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, timetableLatestGrdp })
            })
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.')
            // ...
        }
    }

    return { setToken }
}