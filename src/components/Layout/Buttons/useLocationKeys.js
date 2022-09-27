// import React, {useEffect, useState} from 'react';
//
// const UseLocationKeys = () => {
//
//     //Define variable to manage back and forward buttons
//     const [ locationKeys, setLocationKeys ] = useState([])
//
//     //This useEffect manages the browserbuttons (back-button and forward-button), to allow the
//     //state to be updated based on back and forward browser-clicks
//     useEffect(() => {
//         return history.listen(location => {
//             if (history.action === 'PUSH') {
//                 setLocationKeys([ location.key ])
//             }
//             if (history.action === 'POP') {
//                 if (locationKeys[1] === location.key) {
//                     setLocationKeys(([ _, ...keys ]) => keys)
//                     //Forward event:
//                     //We want to force the user to use the in-built buttons as much as possible
//                     //in this application. The way the back-event code is written, no forward event is possible
//                     //from this location
//
//                 } else {
//                     setLocationKeys((keys) => [ location.key, ...keys ])
//                     // Back event
//                     console.log("back button pressed")
//                     history.push('/')
//                 }
//             }
//         })
//     }, [ locationKeys ])
//     return { locationKeys, setLocationKeys }
//
//
// };
//
// export default UseLocationKeys;