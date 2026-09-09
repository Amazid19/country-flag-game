// Streamer.bot WebSocket কানেকশন
const ws = new WebSocket('ws://127.0.0.1:8080/');

// ১১৭টি দেশের পূর্ণাঙ্গ ডাটা (FlagCDN থেকে অফিশিয়াল ইমেজ লিঙ্কসহ)
let countries = [
    { name: "Afghanistan", code: "AF", flagImg: "https://flagcdn.com/w80/af.png", score: 0 },
    { name: "Albania", code: "AL", flagImg: "https://flagcdn.com/w80/al.png", score: 0 },
    { name: "Algeria", code: "DZ", flagImg: "https://flagcdn.com/w80/dz.png", score: 0 },
    { name: "Andorra", code: "AD", flagImg: "https://flagcdn.com/w80/ad.png", score: 0 },
    { name: "Angola", code: "AO", flagImg: "https://flagcdn.com/w80/ao.png", score: 0 },
    { name: "Argentina", code: "AR", flagImg: "https://flagcdn.com/w80/ar.png", score: 0 },
    { name: "Armenia", code: "AM", flagImg: "https://flagcdn.com/w80/am.png", score: 0 },
    { name: "Australia", code: "AU", flagImg: "https://flagcdn.com/w80/au.png", score: 0 },
    { name: "Austria", code: "AT", flagImg: "https://flagcdn.com/w80/at.png", score: 0 },
    { name: "Azerbaijan", code: "AZ", flagImg: "https://flagcdn.com/w80/az.png", score: 0 },
    { name: "Bahamas", code: "BS", flagImg: "https://flagcdn.com/w80/bs.png", score: 0 },
    { name: "Bahrain", code: "BH", flagImg: "https://flagcdn.com/w80/bh.png", score: 0 },
    { name: "Bangladesh", code: "BD", flagImg: "https://flagcdn.com/w80/bd.png", score: 0 },
    { name: "Barbados", code: "BB", flagImg: "https://flagcdn.com/w80/bb.png", score: 0 },
    { name: "Belarus", code: "BY", flagImg: "https://flagcdn.com/w80/by.png", score: 0 },
    { name: "Belgium", code: "BE", flagImg: "https://flagcdn.com/w80/be.png", score: 0 },
    { name: "Belize", code: "BZ", flagImg: "https://flagcdn.com/w80/bz.png", score: 0 },
    { name: "Benin", code: "BJ", flagImg: "https://flagcdn.com/w80/bj.png", score: 0 },
    { name: "Bhutan", code: "BT", flagImg: "https://flagcdn.com/w80/bt.png", score: 0 },
    { name: "Bolivia", code: "BO", flagImg: "https://flagcdn.com/w80/bo.png", score: 0 },
    { name: "Bosnia", code: "BA", flagImg: "https://flagcdn.com/w80/ba.png", score: 0 },
    { name: "Botswana", code: "BW", flagImg: "https://flagcdn.com/w80/bw.png", score: 0 },
    { name: "Brazil", code: "BR", flagImg: "https://flagcdn.com/w80/br.png", score: 0 },
    { name: "Brunei", code: "BN", flagImg: "https://flagcdn.com/w80/bn.png", score: 0 },
    { name: "Bulgaria", code: "BG", flagImg: "https://flagcdn.com/w80/bg.png", score: 0 },
    { name: "Burkina Faso", code: "BF", flagImg: "https://flagcdn.com/w80/bf.png", score: 0 },
    { name: "Burundi", code: "BI", flagImg: "https://flagcdn.com/w80/bi.png", score: 0 },
    { name: "Cambodia", code: "KH", flagImg: "https://flagcdn.com/w80/kh.png", score: 0 },
    { name: "Cameroon", code: "CM", flagImg: "https://flagcdn.com/w80/cm.png", score: 0 },
    { name: "Canada", code: "CA", flagImg: "https://flagcdn.com/w80/ca.png", score: 0 },
    { name: "Chad", code: "TD", flagImg: "https://flagcdn.com/w80/td.png", score: 0 },
    { name: "Chile", code: "CL", flagImg: "https://flagcdn.com/w80/cl.png", score: 0 },
    { name: "China", code: "CN", flagImg: "https://flagcdn.com/w80/cn.png", score: 0 },
    { name: "Colombia", code: "CO", flagImg: "https://flagcdn.com/w80/co.png", score: 0 },
    { name: "Comoros", code: "KM", flagImg: "https://flagcdn.com/w80/km.png", score: 0 },
    { name: "Congo", code: "CG", flagImg: "https://flagcdn.com/w80/cg.png", score: 0 },
    { name: "Costa Rica", code: "CR", flagImg: "https://flagcdn.com/w80/cr.png", score: 0 },
    { name: "Croatia", code: "HR", flagImg: "https://flagcdn.com/w80/hr.png", score: 0 },
    { name: "Cuba", code: "CU", flagImg: "https://flagcdn.com/w80/cu.png", score: 0 },
    { name: "Cyprus", code: "CY", flagImg: "https://flagcdn.com/w80/cy.png", score: 0 },
    { name: "Czechia", code: "CZ", flagImg: "https://flagcdn.com/w80/cz.png", score: 0 },
    { name: "Denmark", code: "DK", flagImg: "https://flagcdn.com/w80/dk.png", score: 0 },
    { name: "Djibouti", code: "DJ", flagImg: "https://flagcdn.com/w80/dj.png", score: 0 },
    { name: "Dominica", code: "DM", flagImg: "https://flagcdn.com/w80/dm.png", score: 0 },
    { name: "Ecuador", code: "EC", flagImg: "https://flagcdn.com/w80/ec.png", score: 0 },
    { name: "Egypt", code: "EG", flagImg: "https://flagcdn.com/w80/eg.png", score: 0 },
    { name: "Estonia", code: "EE", flagImg: "https://flagcdn.com/w80/ee.png", score: 0 },
    { name: "Ethiopia", code: "ET", flagImg: "https://flagcdn.com/w80/et.png", score: 0 },
    { name: "Fiji", code: "FJ", flagImg: "https://flagcdn.com/w80/fj.png", score: 0 },
    { name: "Finland", code: "FI", flagImg: "https://flagcdn.com/w80/fi.png", score: 0 },
    { name: "France", code: "FR", flagImg: "https://flagcdn.com/w80/fr.png", score: 0 },
    { name: "Gabon", code: "GA", flagImg: "https://flagcdn.com/w80/ga.png", score: 0 },
    { name: "Gambia", code: "GM", flagImg: "https://flagcdn.com/w80/gm.png", score: 0 },
    { name: "Georgia", code: "GE", flagImg: "https://flagcdn.com/w80/ge.png", score: 0 },
    { name: "Germany", code: "DE", flagImg: "https://flagcdn.com/w80/de.png", score: 0 },
    { name: "Ghana", code: "GH", flagImg: "https://flagcdn.com/w80/gh.png", score: 0 },
    { name: "Greece", code: "GR", flagImg: "https://flagcdn.com/w80/gr.png", score: 0 },
    { name: "Guatemala", code: "GT", flagImg: "https://flagcdn.com/w80/gt.png", score: 0 },
    { name: "Guinea", code: "GN", flagImg: "https://flagcdn.com/w80/gn.png", score: 0 },
    { name: "Guyana", code: "GY", flagImg: "https://flagcdn.com/w80/gy.png", score: 0 },
    { name: "Haiti", code: "HT", flagImg: "https://flagcdn.com/w80/ht.png", score: 0 },
    { name: "Honduras", code: "HN", flagImg: "https://flagcdn.com/w80/hn.png", score: 0 },
    { name: "Hungary", code: "HU", flagImg: "https://flagcdn.com/w80/hu.png", score: 0 },
    { name: "Iceland", code: "IS", flagImg: "https://flagcdn.com/w80/is.png", score: 0 },
    { name: "India", code: "IN", flagImg: "https://flagcdn.com/w80/in.png", score: 0 },
    { name: "Indonesia", code: "ID", flagImg: "https://flagcdn.com/w80/id.png", score: 0 },
    { name: "Iran", code: "IR", flagImg: "https://flagcdn.com/w80/ir.png", score: 0 },
    { name: "Iraq", code: "IQ", flagImg: "https://flagcdn.com/w80/iq.png", score: 0 },
    { name: "Ireland", code: "IE", flagImg: "https://flagcdn.com/w80/ie.png", score: 0 },
    { name: "Israel", code: "IL", flagImg: "https://flagcdn.com/w80/il.png", score: 0 },
    { name: "Italy", code: "IT", flagImg: "https://flagcdn.com/w80/it.png", score: 0 },
    { name: "Jamaica", code: "JM", flagImg: "https://flagcdn.com/w80/jm.png", score: 0 },
    { name: "Japan", code: "JP", flagImg: "https://flagcdn.com/w80/jp.png", score: 0 },
    { name: "Jordan", code: "JO", flagImg: "https://flagcdn.com/w80/jo.png", score: 0 },
    { name: "Kazakhstan", code: "KZ", flagImg: "https://flagcdn.com/w80/kz.png", score: 0 },
    { name: "Kenya", code: "KE", flagImg: "https://flagcdn.com/w80/ke.png", score: 0 },
    { name: "Kuwait", code: "KW", flagImg: "https://flagcdn.com/w80/kw.png", score: 0 },
    { name: "Laos", code: "LA", flagImg: "https://flagcdn.com/w80/la.png", score: 0 },
    { name: "Latvia", code: "LV", flagImg: "https://flagcdn.com/w80/lv.png", score: 0 },
    { name: "Lebanon", code: "LB", flagImg: "https://flagcdn.com/w80/lb.png", score: 0 },
    { name: "Libya", code: "LY", flagImg: "https://flagcdn.com/w80/ly.png", score: 0 },
    { name: "Lithuania", code: "LT", flagImg: "https://flagcdn.com/w80/lt.png", score: 0 },
    { name: "Luxembourg", code: "LU", flagImg: "https://flagcdn.com/w80/lu.png", score: 0 },
    { name: "Malaysia", code: "MY", flagImg: "https://flagcdn.com/w80/my.png", score: 0 },
    { name: "Maldives", code: "MV", flagImg: "https://flagcdn.com/w80/mv.png", score: 0 },
    { name: "Mali", code: "ML", flagImg: "https://flagcdn.com/w80/ml.png", score: 0 },
    { name: "Malta", code: "MT", flagImg: "https://flagcdn.com/w80/mt.png", score: 0 },
    { name: "Mexico", code: "MX", flagImg: "https://flagcdn.com/w80/mx.png", score: 0 },
    { name: "Mongolia", code: "MN", flagImg: "https://flagcdn.com/w80/mn.png", score: 0 },
    { name: "Morocco", code: "MA", flagImg: "https://flagcdn.com/w80/ma.png", score: 0 },
    { name: "Nepal", code: "NP", flagImg: "https://flagcdn.com/w80/np.png", score: 0 },
    { name: "Netherlands", code: "NL", flagImg: "https://flagcdn.com/w80/nl.png", score: 0 },
    { name: "New Zealand", code: "NZ", flagImg: "https://flagcdn.com/w80/nz.png", score: 0 },
    { name: "Nigeria", code: "NG", flagImg: "https://flagcdn.com/w80/ng.png", score: 0 },
    { name: "Norway", code: "NO", flagImg: "https://flagcdn.com/w80/no.png", score: 0 },
    { name: "Pakistan", code: "PK", flagImg: "https://flagcdn.com/w80/pk.png", score: 0 },
    { name: "Palestine", code: "PS", flagImg: "https://flagcdn.com/w80/ps.png", score: 0 },
    { name: "Peru", code: "PE", flagImg: "https://flagcdn.com/w80/pe.png", score: 0 },
    { name: "Philippines", code: "PH", flagImg: "https://flagcdn.com/w80/ph.png", score: 0 },
    { name: "Poland", code: "PL", flagImg: "https://flagcdn.com/w80/pl.png", score: 0 },
    { name: "Portugal", code: "PT", flagImg: "https://flagcdn.com/w80/pt.png", score: 0 },
    { name: "Qatar", code: "QA", flagImg: "https://flagcdn.com/w80/qa.png", score: 0 },
    { name: "Romania", code: "RO", flagImg: "https://flagcdn.com/w80/ro.png", score: 0 },
    { name: "Russia", code: "RU", flagImg: "https://flagcdn.com/w80/ru.png", score: 0 },
    { name: "Saudi Arabia", code: "SA", flagImg: "https://flagcdn.com/w80/sa.png", score: 0 },
    { name: "Singapore", code: "SG", flagImg: "https://flagcdn.com/w80/sg.png", score: 0 },
    { name: "South Africa", code: "ZA", flagImg: "https://flagcdn.com/w80/za.png", score: 0 },
    { name: "South Korea", code: "KR", flagImg: "https://flagcdn.com/w80/kr.png", score: 0 },
    { name: "Spain", code: "ES", flagImg: "https://flagcdn.com/w80/es.png", score: 0 },
    { name: "Sweden", code: "SE", flagImg: "https://flagcdn.com/w80/se.png", score: 0 },
    { name: "Switzerland", code: "CH", flagImg: "https://flagcdn.com/w80/ch.png", score: 0 },
    { name: "Syria", code: "SY", flagImg: "https://flagcdn.com/w80/sy.png", score: 0 },
    { name: "Thailand", code: "TH", flagImg: "https://flagcdn.com/w80/th.png", score: 0 },
    { name: "Turkey", code: "TR", flagImg: "https://flagcdn.com/w80/tr.png", score: 0 },
    { name: "Ukraine", code: "UA", flagImg: "https://flagcdn.com/w80/ua.png", score: 0 },
    { name: "UK", code: "UK", flagImg: "https://flagcdn.com/w80/gb.png", score: 0 },
    { name: "USA", code: "USA", flagImg: "https://flagcdn.com/w80/us.png", score: 0 },
    { name: "Vietnam", code: "VN", flagImg: "https://flagcdn.com/w80/vn.png", score: 0 }
];

// গ্রিড রেন্ডার ও সর্টিং ফাংশন (অফিসিয়াল ইমেজ ফ্ল্যাগসহ)
function renderGrid() {
    const grid = document.getElementById('flag-grid');
    grid.innerHTML = '';

    // স্কোর অনুযায়ী সর্টিং
    countries.sort((a, b) => b.score - a.score);

    countries.forEach(c => {
        const card = document.createElement('div');
        card.className = 'flag-card';
        card.innerHTML = `
            <img src="${c.flagImg}" alt="${c.name}" class="flag-img" style="width: 35px; height: 24px; object-fit: cover; border-radius: 3px; margin-bottom: 2px;" />
            <span class="country-code">${c.code}</span>
            <span class="score">${c.score}</span>
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
            renderGrid();
        }
    }
};

// কাউন্টডাউন টাইমার লজিক
let totalSeconds = 2 * 3600; 
function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    timerElement.innerText = 
        String(hours).padStart(2, '0') + ":" + 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');

    if (totalSeconds > 0) {
        totalSeconds--;
    }
}

setInterval(updateTimer, 1000);

// প্রথমবার পেজ লোড হওয়ার সময় গ্রিড রেন্ডার করা
renderGrid();
