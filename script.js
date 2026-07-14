// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1234567890ABCDEFGHIJKLMNOPQRST",
    authDomain: "shivleela-letters.firebaseapp.com",
    databaseURL: "https://shivleela-letters-default-rtdb.firebaseio.com",
    projectId: "shivleela-letters",
    storageBucket: "shivleela-letters.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefg1234567890"
};

// Initialize Firebase (will be updated with real credentials)
let db;
let initialized = false;

function initializeFirebase() {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        initialized = true;
        console.log("Firebase initialized successfully");
    } catch (error) {
        console.log("Firebase config not set. Using local storage.");
        // Fallback to localStorage if Firebase is not configured
    }
}

// Initialize Firebase on page load
initializeFirebase();

// DOM Elements
const apologyForm = document.getElementById('apologyForm');
const photoInput = document.getElementById('photo');
const audioInput = document.getElementById('audio');
const photoPreview = document.getElementById('photoPreview');
const audioPreview = document.getElementById('audioPreview');
const qrSection = document.getElementById('qrSection');
const loading = document.getElementById('loading');
const downloadQrBtn = document.getElementById('downloadQr');
const viewLetterBtn = document.getElementById('viewLetter');
const createNewBtn = document.getElementById('createNew');

// Photo preview
photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            photoPreview.innerHTML = `<img src="${event.target.result}" alt="Photo preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// Audio preview
audioInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            audioPreview.innerHTML = `<audio controls src="${event.target.result}"></audio>`;
        };
        reader.readAsDataURL(file);
    }
});

// Form submission
apologyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const photoFile = photoInput.files[0];
    const audioFile = audioInput.files[0];

    // Show loading
    loading.classList.remove('hidden');
    apologyForm.style.display = 'none';

    try {
        // Convert files to base64
        let photoData = null;
        let audioData = null;

        if (photoFile) {
            photoData = await fileToBase64(photoFile);
        }

        if (audioFile) {
            audioData = await fileToBase64(audioFile);
        }

        // Create unique ID
        const uniqueId = generateUniqueId();

        // Prepare data
        const letterData = {
            id: uniqueId,
            name: name,
            message: message,
            photo: photoData,
            audio: audioData,
            createdAt: new Date().toISOString(),
            timestamp: Date.now()
        };

        // Save to database
        if (initialized) {
            // Save to Firebase
            await db.ref('letters/' + uniqueId).set(letterData);
        } else {
            // Save to localStorage as fallback
            localStorage.setItem('letter_' + uniqueId, JSON.stringify(letterData));
        }

        // Generate QR code
        const websiteBUrl = `https://ashishthombre9761-lgtm.github.io/ashishthombre9761-gmail.com/?id=${uniqueId}`;
        generateQRCode(websiteBUrl, uniqueId);

        // Hide loading and show QR section
        loading.classList.add('hidden');
        qrSection.classList.remove('hidden');

        // Store current letter ID for view button
        window.currentLetterId = uniqueId;

    } catch (error) {
        console.error('Error creating letter:', error);
        alert('Error creating letter. Please try again.');
        loading.classList.add('hidden');
        apologyForm.style.display = 'block';
    }
});

// Convert file to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Generate unique ID
function generateUniqueId() {
    return 'letter_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Generate QR Code
function generateQRCode(url, letterId) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code

    new QRCode(qrCodeContainer, {
        text: url,
        width: 250,
        height: 250,
        colorDark: '#667eea',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Store QR URL for download
    window.qrUrl = url;
}

// Download QR Code
downloadQrBtn.addEventListener('click', () => {
    const canvas = document.querySelector('#qrCodeContainer canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'letter-qrcode.png';
        link.click();
    }
});

// View Letter
viewLetterBtn.addEventListener('click', () => {
    if (window.currentLetterId) {
        window.open(`https://ashishthombre9761-lgtm.github.io/ashishthombre9761-gmail.com/?id=${window.currentLetterId}`, '_blank');
    }
});

// Create New Letter
createNewBtn.addEventListener('click', () => {
    apologyForm.reset();
    photoPreview.innerHTML = '';
    audioPreview.innerHTML = '';
    qrSection.classList.add('hidden');
    apologyForm.style.display = 'block';
    window.scrollTo(0, 0);
});

// Copy to clipboard (helper function)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard!');
    });
}
