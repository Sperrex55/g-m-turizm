
document.addEventListener('DOMContentLoaded', () => {
    // Konteynerler ve modal öğeleri
    const places = [
        {
            name: 'Karaca Mağarası',
            description: 'Doğanın sanat eseri.',
            image: './resimler/karaca.png',
            info: 'Karaca Mağarası, Türkiye\'nin en büyük ve en güzel mağaralarından biridir.',
            gallery: ['./resimler/karaca2.jpg', './resimler/karaca1.webp', './resimler/karaca3.jpg']
        },
        {
            name: 'Tomara Şelalesi',
            description: 'Görkemli bir doğa harikası.',
            image: './resimler/tomara.jpg',
            info: 'Tomara Şelalesi, Gümüşhane\'nin en bilinen doğal güzelliklerinden biridir.',
            gallery: ['./resimler/tomara1.webp', './resimler/tomara2.jpg', './resimler/tomara3.webp']
        },
        {
            name: 'Santa Harabeleri',
            description: 'Tarihi taş yapılar.',
            image: './resimler/santa.jpg',
            info: 'Santa Harabeleri, Gümüşhane\'nin tarihî yerlerinden biridir.',
            gallery: ['./resimler/santa1.jpg', './resimler/santa2.jpg', './resimler/santa3.jpg']
        },
        {
            name: 'İmera Manastırı',
            description: 'Bir zamanlar Hristiyanların dini merkeziydi.',
            image: './resimler/imera.jpg',
            info: 'İmera Manastırı, Gümüşhane il sınırları içerisinde, Ortadoğu’nun en önemli manastırlarından biridir.',
            gallery: ['./resimler/imera1.png', './resimler/imera2.jpg', './resimler/imera3.jpg']
        }
    ];

    const placesContainer = document.querySelector('.places-container');
    const modal = document.getElementById('gallery-modal');
    const slidesContainer = modal.querySelector('.slides');
    const closeBtn = modal.querySelector('.close');
    const prevBtn = modal.querySelector('.prev');
    const nextBtn = modal.querySelector('.next');

    let currentIndex = 0;

    // Modal başlangıçta gizlensin
    modal.style.display = 'none'; // Sayfa yüklendiğinde modal gizlensin

    // Kart oluşturma
    places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        placeCard.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="place-image">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <div class="info-box">${place.info}</div>
        `;

        // Kart tıklama etkinliği
        placeCard.addEventListener('click', () => {
            slidesContainer.innerHTML = ''; // Önceki slider resimlerini temizle
            place.gallery.forEach(img => {
                const imgElement = document.createElement('img');
                imgElement.src = img;
                slidesContainer.appendChild(imgElement);
            });
            currentIndex = 0;
            updateSlider();
            modal.style.display = 'block'; // Modal açıldığında görünür olsun
            document.body.style.overflow = 'hidden'; // Sayfa kaydırma engellensin
        });

        placesContainer.appendChild(placeCard);
    });

    // Slider kontrol
    const updateSlider = () => {
        const width = modal.querySelector('.slider55').offsetWidth;
        slidesContainer.style.transform = `translateX(${-currentIndex * width}px)`;
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slidesContainer.children.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slidesContainer.children.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Modal kapatma
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Sayfa kaydırmasını geri getir
    });

    // Modal dışına tıklayınca kapatma
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Sayfa kaydırmasını geri getir
        }
    });

    // Ekran boyutu değiştiğinde slider güncelle
    window.addEventListener('resize', updateSlider);
    
    // Slider'ın yüksekliğini ekran boyutuna göre ayarla
    function adjustSliderHeight() {
        const slider = document.querySelector('.slider55');
        if (window.innerWidth <= 768) {
            slider.style.height = '300px'; // Mobil için yükseklik
        } else {
            slider.style.height = '500px'; // Masaüstü için yükseklik
        }
    }

    // Sayfa yüklendiğinde slider yüksekliğini ayarla
    adjustSliderHeight();

    // Sayfa boyutu değiştiğinde slider yüksekliğini ayarla
    window.addEventListener('resize', adjustSliderHeight);
});


document.addEventListener('DOMContentLoaded', function () {
    // Harita Konum Ayarları (Gümüşhane Koordinatları)
    const map = L.map('map-container').setView([40.462, 39.48], 12);

    // Harita Katmanı Ekleyin
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       
    }).addTo(map);

    // Marker Bilgileri
    const locations = [
        {
            coords: [40.4584609, 39.4787278], // Gümüşhane Belediyesi Yeni Konum
            title: 'Gümüşhane Belediyesi ',
            description: 'Gümüşhane Belediyesi\'nin yeni binası.',
            images: ['./resimler/belediye1.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.4584609,39.4787278'
        },
        {
            coords: [40.4363788, 39.5144286], // Gümüşhane Üniversitesi Yeni Konum
            title: 'Gümüşhane Üniversitesi ',
            description: 'Gümüşhane Üniversitesi Kampüsü.',
            images: ['./resimler/universite1.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.4363788,39.5144286'
        },
        {
            coords: [40.5442858, 39.4029794], // Karaca Mağarası Koordinatları
            title: 'Karaca Mağarası',
            description: 'Karaca Mağarası, Gümüşhane\'nin ünlü doğal güzelliklerinden biridir.',
            images: ['./resimler/karaca3.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5442858,39.4029794'
        },
        {
            coords: [40.293066, 38.9325587], // Tomara Şelalesi Yeni Konum
            title: 'Tomara Şelalesi',
            description: 'Gümüşhane’nin meşhur Tomara Şelalesi.',
            images: ['./resimler/tomara.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.293066,38.9325587'
        },
        {
            coords: [40.5602163, 39.7043196], // Santa Harabeleri Yeni Konum
            title: 'Santa Harabeleri',
            description: 'Gümüşhane’nin tarihi Santa Harabeleri.',
            images: ['./resimler/santa.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5602163,39.7043196'
        },
        {
            coords: [40.5354274, 39.5842902], // Imera Manastırı Konum
            title: 'Imera Manastırı',
            description: 'Gümüşhane’deki tarihi Imera Manastırı.',
            images: ['./resimler/imera.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.5354274,39.5842902'
        },
        {
            coords: [40.722166, 39.3285732], // Kadırga Yaylası Konumu
            title: 'Kadırga Yaylası Tarihi Üstü Açık Cami',
            description: 'Gümüşhane’deki Kadırga Yaylası Tarihi Üstü Açık Cami.',
            images: ['./resimler/camii.jpg'], // Görsel eklenebilir
            navigationUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.722166,39.3285732'
        }
    ];

    // Marker'ları Ekleyin
    locations.forEach(location => {
        const marker = L.marker(location.coords).addTo(map);

        // Popup içeriği oluştur
        const popupContent = `
            <div>
                <h3>${location.title}</h3>
                <p>${location.description}</p>
                <div>
                    ${location.images.map(img => `<img src="${img}" alt="${location.title}" style="width:100px; margin-right:5px;">`).join('')}
                </div>
                <button onclick="window.open('${location.navigationUrl}', '_blank')" style="margin-top:10px; padding:5px 10px; background:#007BFF; color:#fff; border:none; border-radius:5px; cursor:pointer;">Yol Tarifi Al</button>
            </div>
        `;

        // Popup'ı Marker'a bağlayın
        marker.bindPopup(popupContent);
    });

    // Kullanıcı Konumunu Göster
    map.locate({ setView: true, maxZoom: 16 });

    map.on('locationfound', function (e) {
        const radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("Siz buradasınız!")
            .openPopup();
        L.circle(e.latlng, radius).addTo(map);
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu'); // Hamburger menü
    const navMenu = document.querySelector('.nav-menu'); // Menü öğeleri

    // Tıklama olayını dinle
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('show'); // Menü görünürlüğünü değiştir
        mobileMenu.classList.toggle('open'); // Hamburger ve çarpı simgesi arasında geçiş yap
    });
});



let slideIndex = 1;

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // İlk başta tüm slaytları gizle
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].style.opacity = "0"; // Opaklığı sıfırla
    }

    // Tüm noktaları temizle
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Şu anki slaytı göster
    slides[slideIndex - 1].style.display = "block";  
    slides[slideIndex - 1].style.opacity = "1"; // Opaklık 1 yap
    dots[slideIndex - 1].className += " active";
}

// Önceki ve sonraki buton işlevi
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Noktaya tıklandığında geçiş yap
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// İlk başta slider'ı başlat
showSlides(slideIndex);

// Otomatik geçiş için 3 saniyede bir kaydırıcıyı değiştir
setInterval(function() {
    plusSlides(1);
}, 3000);




document.addEventListener('DOMContentLoaded', function () {
    const eventsContainer = document.querySelector('.events-container');

    // Etkinlikler verisi
    const events = [
        {
            title: "Gümüşhane Doğa Yürüyüşü",
            date: "15 Aralık 2024",
            location: "Gümüşhane, Limni Gölü Tabiat Parkı",
            image: "./resimler/limnigölü.jpg", // Resim yolu
            description: "Gümüşhane'nin eşsiz doğasında keyifli bir yürüyüş yapalım!"
        },
        {
            title: "Gümüşhane Tarih Turu",
            date: "25 Aralık 2024",
            location: "Gümüşhane, Şehir Merkezi",
            image: "./resimler/gümüş.jpeg", // Resim yolu
            description: "Şehrin tarihi yerlerini keşfetmek için birlikte bir tur yapıyoruz."
        },
        {
            title: "Yeni Yıl Konseri",
            date: "31 Aralık 2024",
            location: "Gümüşhane, Kültür Merkezi",
            image: "./resimler/konser.webp", // Resim yolu
            description: "Yılbaşı gecesini müzikle karşılamak için harika bir etkinlik!"
        },
        {
            title: "Gümüşhane Kış Festivali",
            date: "10 Ocak 2025",
            location: "Gümüşhane, Zigana Dağı",
            image: "./resimler/zigana.jpg", // Resim yolu
            description: "Karla kaplanmış Gümüşhane'nin güzelliklerini keşfedin ve kış festivaliyle eğlenin!"
        }
    ];

    // Etkinlikleri sayfada göstermek
    events.forEach(function (event) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-date">${event.date}</div>
            <div class="event-location">${event.location}</div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
});






// "Yukarı Git" butonunu al
const backToTopButton = document.getElementById("back-to-top");

// Sayfa kaydırıldığında butonu kontrol et
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block"; // Butonu göster
    } else {
        backToTopButton.style.display = "none"; // Butonu gizle
    }
};

// Butona tıklandığında sayfayı yukarı kaydır
backToTopButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo');

    // Logo'ya tıklama olayı
    logo.addEventListener('click', function () {
        window.location.reload();  // Sayfayı yeniler
    });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Varsayılan davranışı durdur
        
        const targetID = this.getAttribute('href'); // Hedef ID'yi al
        const targetElement = document.querySelector(targetID);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop; // Hedefin üst pozisyonu
            
            // Özel animasyonlu kaydırma
            window.scrollTo({
                top: offsetTop, // Kaydırılacak mesafe
                behavior: 'smooth' // Yumuşak kaydırma davranışı
            });
        }
    });
});



