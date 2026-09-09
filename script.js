// Streamer.bot WebSocket কানেকশন (সাধারণত পোর্ট ৮০৮০ থাকে)
const ws = new WebSocket('ws://127.0.0.1:8080/');

// ১১৭টি দেশের পূর্ণাঙ্গ ডাটা অ্যারে (১৩ কলাম × ৯ রো)
let countries = [
    { name: "Afghanistan", code: "AF", flag: "🇦🇫", score: 0 },
    { name: "Albania", code: "AL", flag: "🇦🇱", score: 0 },
    { name: "Algeria", code: "DZ", flag: "🇩🇿", score: 0 },
    { name: "Andorra", code: "AD", flag: "🇦🇩", score: 0 },
    { name: "Angola", code: "AO", flag: "🇦🇴", score: 0 },
    { name: "Argentina", code: "AR", flag: "🇦🇷", score: 0 },
    { name: "Armenia", code: "AM", flag: "🇦🇲", score: 0 },
    { name: "Australia", code: "AU", flag: "🇦🇺", score: 0 },
    { name: "Austria", code: "AT", flag: "🇦🇹", score: 0 },
    { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", score: 0 },
    { name: "Bahamas", code: "BS", flag: "🇧🇸", score: 0 },
    { name: "Bahrain", code: "BH", flag: "🇧🇭", score: 0 },
    { name: "Bangladesh", code: "BD", flag: "🇧🇩", score: 0 },
    { name: "Barbados", code: "BB", flag: "🇧🇧", score: 0 },
    { name: "Belarus", code: "BY", flag: "🇧🇾", score: 0 },
    { name: "Belgium", code: "BE", flag: "🇧🇪", score: 0 },
    { name: "Belize", code: "BZ", flag: "🇧🇿", score: 0 },
    { name: "Benin", code: "BJ", flag: "🇧🇯", score: 0 },
    { name: "Bhutan", code: "BT", flag: "🇧🇹", score: 0 },
    { name: "Bolivia", code: "BO", flag: "🇧🇴", score: 0 },
    { name: "Bosnia", code: "BA", flag: "🇧🇦", score: 0 },
    { name: "Botswana", code: "BW", flag: "🇧🇼", score: 0 },
    { name: "Brazil", code: "BR", flag: "🇧🇷", score: 0 },
    { name: "Brunei", code: "BN", flag: "🇧🇳", score: 0 },
    { name: "Bulgaria", code: "BG", flag: "🇧🇬", score: 0 },
    { name: "Burkina Faso", code: "BF", flag: "🇧🇫", score: 0 },
    { name: "Burundi", code: "BI", flag: "🇧🇮", score: 0 },
    { name: "Cambodia", code: "KH", flag: "🇰🇭", score: 0 },
    { name: "Cameroon", code: "CM", flag: "🇨🇲", score: 0 },
    { name: "Canada", code: "CA", flag: "🇨🇦", score: 0 },
    { name: "Chad", code: "TD", flag: "🇹🇩", score: 0 },
    { name: "Chile", code: "CL", flag: "🇨🇱", score: 0 },
    { name: "China", code: "CN", flag: "🇨🇳", score: 0 },
    { name: "Colombia", code: "CO", flag: "🇨🇴", score: 0 },
    { name: "Comoros", code: "KM", flag: "🇰🇲", score: 0 },
    { name: "Congo", code: "CG", flag: "🇨🇬", score: 0 },
    { name: "Costa Rica", code: "CR", flag: "🇨🇷", score: 0 },
    { name: "Croatia", code: "HR", flag: "🇭🇷", score: 0 },
    { name: "Cuba", code: "CU", flag: "🇨🇺", score: 0 },
    { name: "Cyprus", code: "CY", flag: "🇨🇾", score: 0 },
    { name: "Czechia", code: "CZ", flag: "🇨🇿", score: 0 },
    { name: "Denmark", code: "DK", flag: "🇩🇰", score: 0 },
    { name: "Djibouti", code: "DJ", flag: "🇩🇯", score: 0 },
    { name: "Dominica", code: "DM", flag: "🇩🇲", score: 0 },
    { name: "Ecuador", code: "EC", flag: "🇪🇨", score: 0 },
    { name: "Egypt", code: "EG", flag: "🇪🇬", score: 0 },
    { name: "Estonia", code: "EE", flag: "🇪🇪", score: 0 },
    { name: "Ethiopia", code: "ET", flag: "🇪🇹", score: 0 },
    { name: "Fiji", code: "FJ", flag: "🇫🇯", score: 0 },
    { name: "Finland", code: "FI", flag: "🇫🇮", score: 0 },
    { name: "France", code: "FR", flag: "🇫🇷", score: 0 },
    { name: "Gabon", code: "GA", flag: "🇬🇦", score: 0 },
    { name: "Gambia", code: "GM", flag: "🇬🇲", score: 0 },
    { name: "Georgia", code: "GE", flag: "🇬🇪", score: 0 },
    { name: "Germany", code: "DE", flag: "🇩🇪", score: 0 },
    { name: "Ghana", code: "GH", flag: "🇬🇭", score: 0 },
    { name: "Greece", code: "GR", flag: "🇬🇷", score: 0 },
    { name: "Guatemala", code: "GT", flag: "🇬🇹", score: 0 },
    { name: "Guinea", code: "GN", flag: "🇬🇳", score: 0 },
    { name: "Guyana", code: "GY", flag: "🇬🇾", score: 0 },
    { name: "Haiti", code: "HT", flag: "🇭🇹", score: 0 },
    { name: "Honduras", code: "HN", flag: "🇭🇳", score: 0 },
    { name: "Hungary", code: "HU", flag: "🇭🇺", score: 0 },
    { name: "Iceland", code: "IS", flag: "🇮🇸", score: 0 },
    { name: "India", code: "IN", flag: "🇮🇳", score: 0 },
    { name: "Indonesia", code: "ID", flag: "🇮🇩", score: 0 },
    { name: "Iran", code: "IR", flag: "🇮🇷", score: 0 },
    { name: "Iraq", code: "IQ", flag: "🇮🇶", score: 0 },
    { name: "Ireland", code: "IE", flag: "🇮🇪", score: 0 },
    { name: "Israel", code: "IL", flag: "🇮🇱", score: 0 },
    { name: "Italy", code: "IT", flag: "🇮🇹", score: 0 },
    { name: "Jamaica", code: "JM", flag: "🇯🇲", score: 0 },
    { name: "Japan", code: "JP", flag: "🇯🇵", score: 0 },
    { name: "Jordan", code: "JO", flag: "🇯🇴", score: 0 },
    { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", score: 0 },
    { name: "Kenya", code: "KE", flag: "🇰🇪", score: 0 },
    { name: "Kuwait", code: "KW", flag: "🇰🇼", score: 0 },
    { name: "Laos", code: "LA", flag: "🇱🇦", score: 0 },
    { name: "Latvia", code: "LV", flag: "🇱🇻", score: 0 },
    { name: "Lebanon", code: "LB", flag: "🇱🇧", score: 0 },
    { name: "Libya", code: "LY", flag: "🇱🇾", score: 0 },
    { name: "Lithuania", code: "LT", flag: "🇱🇹", score: 0 },
    { name: "Luxembourg", code: "LU", flag: "🇱🇺", score: 0 },
    { name: "Malaysia", code: "MY", flag: "🇲🇾", score: 0 },
    { name: "Maldives", code: "MV", flag: "🇲🇻", score: 0 },
    { name: "Mali", code: "ML", flag: "🇲🇱", score: 0 },
    { name: "Malta", code: "MT", flag: "🇲🇹", score: 0 },
    { name: "Mexico", code: "MX", flag: "🇲🇽", score: 0 },
    { name: "Mongolia", code: "MN", flag: "🇲🇳", score: 0 },
    { name: "Morocco", code: "MA", flag: "🇲🇦", score: 0 },
    { name: "Nepal", code: "NP", flag: "🇳🇵", score: 0 },
    { name: "Netherlands", code: "NL", flag: "🇳🇱", score: 0 },
    { name: "New Zealand", code: "NZ", flag: "🇳🇿", score: 0 },
    { name: "Nigeria", code: "NG", flag: "🇳🇬", score: 0 },
    { name: "Norway", code: "NO", flag: "🇳🇴", score: 0 },
    { name: "Pakistan", code: "PK", flag: "🇵🇰", score: 0 },
    { name: "Palestine", code: "PS", flag: "🇵🇸", score: 0 },
    { name: "Peru", code: "PE", flag: "🇵🇪", score: 0 },
    { name: "Philippines", code: "PH", flag: "🇵🇭", score: 0 },
    { name: "Poland", code: "PL", flag: "🇵🇱", score: 0 },
    { name: "Portugal", code: "PT", flag: "🇵🇹", score: 0 },
    { name: "Qatar", code: "QA", flag: "🇶🇦", score: 0 },
    { name: "Romania", code: "RO", flag: "🇷🇴", score: 0 },
    { name: "Russia", code: "RU", flag: "🇷🇺", score: 0 },
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", score: 0 },
    { name: "Singapore", code: "SG", flag: "🇸🇬", score: 0 },
    { name: "South Africa", code: "ZA", flag: "🇿🇦", score: 0 },
    { name: "South Korea", code: "KR", flag: "🇰🇷", score: 0 },
    { name: "Spain", code: "ES", flag: "🇪🇸", score: 0 },
    { name: "Sweden", code: "SE", flag: "🇸🇪", score: 0 },
    { name: "Switzerland", code: "CH", flag: "🇨🇭", score: 0 },
    { name: "Syria", code: "SY", flag: "🇸🇾", score: 0 },
    { name: "Thailand", code: "TH", flag: "🇹🇭", score: 0 },
    { name: "Turkey", code: "TR", flag: "🇹🇷", score: 0 },
    { name: "Ukraine", code: "UA", flag: "🇺🇦", score: 0 },
    { name: "UK", code: "UK", flag: "🇬🇧", score: 0 },
    { name: "USA", code: "USA", flag: "🇺🇸", score: 0 },
    { name: "Vietnam", code: "VN", flag: "🇻🇳", score: 0 }
];

// গ্রিড রেন্ডার করার ফাংশন
function renderGrid() {
    const grid = document.getElementById('flag-grid');
    grid.innerHTML = '';

    countries.forEach(c => {
        const card = document.createElement('div');
        card.className = 'flag-card';
        card.id = `country-${c.code}`;
        card.innerHTML = `
            <span class="flag-icon">${c.flag}</span>
            <span class="country-code">${c.code}</span>
            <span class="score" id="score-${c.code}">${c.score}</span>
        `;
        grid.appendChild(card);
    });
}

// WebSocket থেকে ডাটা রিসিভ করা
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    
    if (data.countryName && data.pointsEarned) {
        let target = countries.find(c => c.name.toLowerCase() === data.countryName.toLowerCase() || c.code.toLowerCase() === data.countryName.toLowerCase());
        
        if (target) {
            target.score += parseInt(data.pointsEarned);
            
            // ফুল পেজ রি-রেন্ডার না করে শুধু নির্দিষ্ট স্কোরের এলিমেন্ট আপডেট করা (স্মুথ পারফরম্যান্সের জন্য)
            const scoreElement = document.getElementById(`score-${target.code}`);
            if (scoreElement) {
                scoreElement.innerText = target.score;
            }
        }
    }
};

// পেজ লোড হওয়ার সাথে সাথে গ্রিড তৈরি করা
renderGrid();
