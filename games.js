document.addEventListener('DOMContentLoaded', () => {
    
    // ================== GAME SERVICES DATA PANEL ==================
    // This is your new control panel specifically for games.
    // Fill in the prices and packages here.
    const gamesData = {
        pubg: {
            icon: 'fas fa-parachute-box', iconColor: '#F2A900', title: 'شحن شدات ببجي (UC)',
            description: 'اشحن حسابك مباشرة عبر الـ ID بأمان وسرعة تنفيذ عالية.',
            features: [ "✅ شحن سريع ومباشر عبر ID اللاعب", "✅ أسعار تنافسية ومضمونة", "✅ آمن 100% وبدون الحاجة لكلمة المرور" ],
            plans: [ { duration: '60 UC', price: 'XXX دج' }, { duration: '325 UC', price: 'XXX دج' }, { duration: '660 UC', price: 'XXX دج' }, { duration: '1800 UC', price: 'XXX دج' } ],
            contactLink: 'https://t.me/astro_qp'
        },
        freefire: {
            icon: 'fas fa-fire', iconColor: '#FF8C00', title: 'شحن جواهر فري فاير',
            description: 'املأ مخزونك بالجواهر الآن لتكون مستعدًا لكل التحديات.',
            features: [ "✅ شحن فوري وآمن عبر ID اللاعب", "✅ لا حاجة لمعلومات تسجيل الدخول" ],
            plans: [ { duration: '110 جواهر', price: 'XXX دج' }, { duration: '583 جوهرة', price: 'XXX دج' }, { duration: '1188 جوهرة', price: 'XXX دج' } ],
            contactLink: 'https://t.me/astro_qp'
        },
        efootball: {
            icon: 'fas fa-futbol', iconColor: '#52B531', title: 'شحن كوينز eFootball',
            description: 'كوّن فريق أحلامك بأقوى اللاعبين من خلال شحن الكوينز.',
            plans: [ { duration: 'قريبًا...', price: '' } ],
            contactLink: 'https://t.me/astro_qp'
        },
        brawlstars: {
            icon: 'fas fa-skull-crossbones', iconColor: '#F7CE39', title: 'شحن جواهر براول ستارز',
            description: 'احصل على الجواهر لشراء الصناديق والمظاهر الحصرية.',
            plans: [ { duration: 'قريبًا...', price: '' } ],
            contactLink: 'https://t.me/astro_qp'
        },
        bloodstrike: {
            icon: 'fas fa-crosshairs', iconColor: '#D72C2C', title: 'شحن ذهب بلود سترايك',
            description: 'سيطر على ساحة المعركة بشحن الذهب وشراء أفضل العتاد.',
            plans: [ { duration: 'قريبًا...', price: '' } ],
            contactLink: 'https://t.me/astro_qp'
        },
        cod: {
            icon: 'fas fa-shield-alt', iconColor: '#B0A16A', title: 'شحن نقاط CoD Mobile',
            description: 'اشحن نقاط (CP) لشراء الباتل باس والحزم المميزة.',
            plans: [ { duration: 'قريبًا...', price: '' } ],
            contactLink: 'https://t.me/astro_qp'
        }
    };

    // ================== MODAL LOGIC (Same as the main page) ==================
    const modalOverlay = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const gameCards = document.querySelectorAll('.game-card-v2'); // Select game cards on this page

    function openModal(serviceKey) {
        const service = gamesData[serviceKey];
        if (!service) {
            console.error('Game data not found for key:', serviceKey);
            return;
        }

        let featuresHTML = '';
        if (service.features && service.features.length > 0) {
            featuresHTML = `<h4 class="modal-section-title">الميزات الأساسية</h4><div class="feature-list-pro">` +
                           service.features.map(feature => `<div class="feature-item-pro">${feature}</div>`).join('') +
                           `</div>`;
        }

        let plansHTML = '';
        if (service.plans && service.plans.length > 0) {
            const planTitle = service.features ? 'خطط الشحن' : 'التفاصيل والأسعار';
            plansHTML = `<h4 class="modal-section-title">${planTitle}</h4><div class="price-plans-pro">` +
                        service.plans.map((plan, index) => {
                            return `<div class="price-plan-pro plan-c-${index + 1}">
                                        <div class="plan-duration">${plan.duration}</div>
                                        <strong>${plan.price}</strong>
                                    </div>`;
                        }).join('') +
                        `</div>`;
        }
        
        // This icon color logic is specifically for the games page
        const iconColor = service.iconColor === '#FFFC00' || service.iconColor === '#F7CE39' ? '#111827' : 'white';

        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon" style="background-color: ${service.iconColor}; color: ${iconColor};"><i class="${service.icon}"></i></div>
                <h2 class="modal-title">${service.title}</h2>
                <p class="modal-description">${service.description}</p>
            </div>
            <div class="modal-details-content">
                ${featuresHTML}
                ${plansHTML}
            </div>
            <div class="alert-pro">لا تتواصل معي الا اذا كنت متاكد انك رح تشتري!</div>
            <a href="${service.contactLink}" target="_blank" class="modal-cta-button">
                <i class="fab fa-telegram"></i> تواصل معنا للشحن
            </a>
        `;

        modalOverlay.classList.add('show-modal');
    }

    function closeModal() {
        modalOverlay.classList.remove('show-modal');
    }

    // Add event listeners to all game cards
    gameCards.forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.service));
    });
    
    // Event listeners to close the modal
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show-modal')) closeModal();
    });
});