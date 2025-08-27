document.addEventListener('DOMContentLoaded', () => {
    
    // ================== FAQ Accordion Logic (No Changes) ==================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ================== Service Modal (Pop-up) Logic - FINAL VERSION ==================

    // YOUR CONTROL PANEL: All your custom data is saved here.
    const servicesData = {
        telegram: {
            icon: 'fab fa-telegram-plane',
            iconColor: '#2AABEE',
            title: 'تليجرام بريميوم',
            description: 'احصل على جميع الميزات الحصرية لتطبيق تليجرام واستمتع بتجربة فريدة.',
            features: [
                "رفع ملفات حتى 4 جيجابايت",
                "سرعة تحميل أسرع",
                "الانضمام لـ 1000 قناة ومجموعة",
                "تفاعلات مخصصة وملصقات حصرية",
                "تحويل الرسائل الصوتية إلى نص",
                "ملصقات متحركة حصرية"
            ],
            plans: [
                { duration: 'شهر واحد (عرض حصري)', price: '1200 دج', isExclusive: true },
                { duration: '3 أشهر', price: '3100 دج' },
                { duration: '6 أشهر', price: '4000 دج' },
                { duration: '1 سنة', price: '7500 دج' }
            ],
            contactLink: 'https://t.me/astro_qp' 
        },
        card: {
            icon: 'fas fa-credit-card',
            iconColor: '#F9A825',
            title: 'بطاقة افتراضية',
            description: 'بطاقة Visa آمنة للتسوق عبر الإنترنت وتفعيل اشتراكاتك بسهولة.',
            features: [
                "نوع البطاقة: Visa",
                "عمر البطاقة: 5 سنوات",
                "مقبولة في أغلب المواقع العالمية",
                "مثالية لتفعيل الإعلانات والاشتراكات"
            ],
            plans: [
                { duration: 'بطاقة مشحونة :', price: '1500 دج' }
            ],
            contactLink: 'https://t.me/astro_qp' 
        },
        netflix: {
            icon: 'fas fa-tv',
            iconColor: '#E50914',
            title: 'اشتراك Netflix',
            description: 'استمتع بمشاهدة غير محدودة لأشهر الأفلام والمسلسلات بأعلى جودة.',
            plans: [
                { duration: 'شهر واحد', price: '650 دج' },
                { duration: '3 أشهر', price: '1500 دج' },
                { duration: '1 سنة', price: '5000 دج' }
            ],
            contactLink: 'https://t.me/astro_qp' 
        },
        spotify: {
            icon: 'fab fa-spotify',
            iconColor: '#1DB954',
            title: 'اشتراك Spotify',
            description: 'ملايين الأغاني والبودكاست بين يديك، بدون إعلانات وبجودة صوت عالية.',
             plans: [
                { duration: 'شهر واحد', price: '700 دج' },
                { duration: '3 أشهر', price: '1800 دج' },
                { duration: '1 سنة', price: '5000 دج' }
            ],
            contactLink: 'https://t.me/astro_qp' 
        },
        chatgpt: {
            icon: 'fas fa-brain',
            iconColor: '#10A37F',
            title: 'اشتراك ChatGPT Plus',
            description: 'أطلق العنان لقوة الذكاء الاصطناعي مع وصول أسرع وميزات حصرية.',
            plans: [
                { duration: 'اشتراك شهري مشترك', price: '1500 دج' },
                { duration: 'اشتراك شهري منفرد', price: '2500 دج' }
            ],
            contactLink: 'https://t.me/astro_qp' 
        },
        snapchat: {
            icon: 'fab fa-snapchat',
            iconColor: '#FFFC00',
            title: 'اشتراك سناب شات بلس',
            description: 'اطلق العنان لإمكانيات سناب شات الكاملة مع ميزات حصرية ومميزة.',
            features: [
                "رؤية من أعاد مشاهدة قصتك",
                "مؤشر إعادة المشاهدة",
                "أيقونات تطبيق حصرية",
                "مسارات الشبح على الخريطة",
                "شارة نجمة سناب شات بلس"
            ],
            plans: [
                { duration: 'شهر واحد <span class="plan-gift-text">+ هدية 🎁</span>', price: '50 ألف دج' },
                { duration: '3 أشهر <span class="plan-gift-text">+ هدية 🎁</span>', price: '120 ألف دج' },
                { duration: '1 سنة <span class="plan-gift-text exclusive">+ هدية حصرية ✨</span>', price: '250 ألف دج' }
            ],
            contactLink: 'https://t.me/astro_qp' 
        }
    };

    // Get all necessary elements from the HTML
    const modalOverlay = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const serviceButtons = document.querySelectorAll('[data-service]');
    const exclusiveOfferBtn = document.getElementById('exclusive-offer-btn');

    // Main function to open the modal for any service
    function openModal(serviceKey) {
        const service = servicesData[serviceKey];
        if (!service) return;

        let featuresHTML = '';
        if (service.features && service.features.length > 0) {
            featuresHTML = `<h4 class="modal-section-title">الميزات الأساسية</h4><div class="feature-list-pro">` +
                           service.features.map(feature => `<div class="feature-item-pro">${feature}</div>`).join('') +
                           `</div>`;
        }

        let plansHTML = '';
        if (service.plans && service.plans.length > 0) {
            const planTitle = service.features ? 'خطط الأسعار' : 'التفاصيل والأسعار';
            plansHTML = `<h4 class="modal-section-title">${planTitle}</h4><div class="price-plans-pro">` +
                        service.plans.map((plan, index) => {
                            const exclusiveClass = plan.isExclusive ? 'plan-exclusive' : '';
                            return `<div class="price-plan-pro ${exclusiveClass} plan-c-${index + 1}">
                                        <div class="plan-duration">${plan.duration}</div>
                                        <strong>${plan.price}</strong>
                                    </div>`;
                        }).join('') +
                        `</div>`;
        }

        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon" style="background-color: ${service.iconColor}; color: ${service.iconColor === '#FFFC00' ? '#111827' : 'white'};"><i class="${service.icon}"></i></div>
                <h2 class="modal-title">${service.title}</h2>
                <p class="modal-description">${service.description}</p>
            </div>
            <div class="modal-details-content">
                ${featuresHTML}
                ${plansHTML}
            </div>
            <div class="alert-pro">لا تتواصل معي الا اذا كنت متاكد انك رح تشتري!</div>
            <a href="${service.contactLink}" target="_blank" class="modal-cta-button">
                <i class="fab fa-telegram"></i> تواصل معنا للشراء
            </a>
        `;

        modalOverlay.classList.add('show-modal');
    }

    // Function specifically for the exclusive offer modal
    function openExclusiveOfferModal() {
        const service = servicesData.telegram;
        const exclusivePlan = service.plans.find(p => p.isExclusive);
        if (!exclusivePlan) return;

        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon" style="background: linear-gradient(45deg, #FFD700, #F5B300);"><i class="fas fa-star"></i></div>
                <h2 class="modal-title">عرض حصري ولفترة محدودة!</h2>
                <p class="modal-description">لا تفوت فرصة الحصول على اشتراك تليجرام بريميوم بسعر لا يصدق.</p>
            </div>
            <div class="modal-details-content">
                <h4 class="modal-section-title">تفاصيل العرض</h4>
                <div class="price-plans-pro">
                    <div class="price-plan-pro plan-exclusive">
                        <div class="plan-duration">${exclusivePlan.duration}</div>
                        <strong>${exclusivePlan.price}</strong>
                    </div>
                </div>
                <p style="text-align:center; color: var(--text-secondary); margin-top: -1rem;">استمتع بكل الميزات مثل سرعة التحميل الفائقة، رفع ملفات ضخمة، وتحويل الصوت إلى نص وغيرها الكثير!</p>
            </div>
            <div class="alert-pro">لا تتواصل معي الا اذا كنت متاكد انك رح تشتري!</div>
            <a href="${service.contactLink}" target="_blank" class="modal-cta-button">
                <i class="fab fa-telegram"></i> تواصل معنا الآن
            </a>
        `;
        modalOverlay.classList.add('show-modal');
    }

    // Function to close the modal
    function closeModal() {
        modalOverlay.classList.remove('show-modal');
    }

    // Add event listeners
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => openModal(button.dataset.service));
    });
    
    exclusiveOfferBtn.addEventListener('click', openExclusiveOfferModal);
    
    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show-modal')) closeModal();
    });
});