import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getDatabase,
ref,
push,
onValue,
remove,
update

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {

getAuth,
signOut

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyDILlEvHJ05IUg146N17zVwGG5RD7X50Y4",

authDomain: "servicio-tecnico-8a5ef.firebaseapp.com",

databaseURL: "https://servicio-tecnico-8a5ef-default-rtdb.firebaseio.com",

projectId: "servicio-tecnico-8a5ef",

storageBucket: "servicio-tecnico-8a5ef.firebasestorage.app",

messagingSenderId: "895895342548",

appId: "1:895895342548:web:c400eb7e17ff78f57c1a41",

measurementId: "G-HTXDTJ735G"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

const equiposRef = ref(db,"equipos");

let contador = 
