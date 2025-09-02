document.addEventListener('DOMContentLoaded', () => {
    
    // ================== FAQ Accordion Logic ==================
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

    // ================== Main Service Data Panel ==================
    const servicesData = {
        telegram: { icon: 'fab fa-telegram-plane', iconColor: '#2AABEE', title: 'تليجرام بريميوم', description: 'احصل على جميع الميزات الحصرية لتطبيق تليجرام واستمتع بتجربة فريدة.', features: [ "رفع ملفات حتى 4 جيجابايت", "سرعة تحميل أسرع", "الانضمام لـ 1000 قناة ومجموعة", "تفاعلات مخصصة وملصقات حصرية", "تحويل الرسائل الصوتية إلى نص", "ملصقات متحركة حصرية" ], plans: [ { duration: 'شهر واحد (عرض حصري)', price: '1200 دج', isExclusive: true }, { duration: '3 أشهر', price: '3100 دج' }, { duration: '6 أشهر', price: '4000 دج' }, { duration: '1 سنة', price: '7500 دج' } ], contactLink: 'https://t.me/astro_qp' },
        card: { icon: 'fas fa-credit-card', iconColor: '#F9A825', title: 'بطاقة افتراضية', description: 'بطاقة Visa آمنة للتسوق عبر الإنترنت وتفعيل اشتراكاتك بسهولة.', features: [ "نوع البطاقة: Visa", "عمر البطاقة: 5 سنوات", "مقبولة في أغلب المواقع العالمية", "مثالية لتفعيل الإعلانات والاشتراكات" ], plans: [ { duration: 'بطاقة مشحونة :', price: '1500 دج' } ], contactLink: 'https://t.me/astro_qp' },
        netflix: { icon: 'fas fa-tv', iconColor: '#E50914', title: 'اشتراك Netflix', description: 'استمتع بمشاهدة غير محدودة لأشهر الأفلام والمسلسلات بأعلى جودة.', plans: [ { duration: 'شهر واحد', price: '650 دج' }, { duration: '3 أشهر', price: '1500 دج' }, { duration: '1 سنة', price: '5000 دج' } ], contactLink: 'https://t.me/astro_qp' },
        spotify: { icon: 'fab fa-spotify', iconColor: '#1DB954', title: 'اشتراك Spotify', description: 'ملايين الأغاني والبودكاست بين يديك، بدون إعلانات وبجودة صوت عالية.', plans: [ { duration: 'شهر واحد', price: '700 دج' }, { duration: '3 أشهر', price: '1800 دج' }, { duration: '1 سنة', price: '5000 دج' } ], contactLink: 'https://t.me/astro_qp' },
        youtube: { icon: 'fab fa-youtube', iconColor: '#FF0000', title: 'يوتيوب بريميوم', description: 'احصل على أفضل تجربة مشاهدة واستماع مع يوتيوب ويوتيوب ميوزك بريميوم.', features: [ "✅ مشاهدة بدون أي إعلانات مزعجة", "✅ تشغيل الفيديوهات في الخلفية (والشاشة مغلقة)", "✅ تنزيل الفيديوهات لمشاهدتها بدون إنترنت", "✅ وصول كامل لتطبيق YouTube Music Premium" ], plans: [ { duration: 'شهر (بريميوم + ميوزك)', price: '750 دج' }, { duration: 'سنة (بريميوم + ميوزك)', price: '5000 دج' } ], contactLink: 'https://t.me/astro_qp' },
        chatgpt: { icon: 'fas fa-brain', iconColor: '#10A37F', title: 'اشتراك ChatGPT Plus', description: 'أطلق العنان لقوة الذكاء الاصطناعي مع وصول أسرع وميزات حصرية.', plans: [ { duration: 'اشتراك شهري مشترك', price: '1500 دج' }, { duration: 'اشتراك شهري منفرد', price: '2500 دج' } ], contactLink: 'https://t.me/astro_qp' },
        snapchat: { icon: 'fab fa-snapchat', iconColor: '#FFFC00', title: 'اشتراك سناب شات بلس', description: 'اطلق العنان لإمكانيات سناب شات الكاملة مع ميزات حصرية ومميزة.', features: [ "رؤية من أعاد مشاهدة قصتك", "مؤشر إعادة المشاهدة", "أيقونات تطبيق حصرية", "مسارات الشبح على الخريطة", "شارة نجمة سناب شات بلس" ], plans: [ { duration: 'شهر واحد <span class="plan-gift-text">+ هدية 🎁</span>', price: '500 دج' }, { duration: '3 أشهر <span class="plan-gift-text">+ هدية 🎁</span>', price: '1200 دج' }, { duration: '1 سنة <span class="plan-gift-text exclusive">+ هدية حصرية ✨</span>', price: '2500 دج' } ], contactLink: 'https://t.me/astro_qp' },
        crunchyroll: { icon: 'fas fa-bolt', iconColor: '#F47521', title: 'اشتراك كرانشي رول', description: 'شاهد أحدث حلقات الأنمي بعد ساعة من عرضها في اليابان وبأعلى جودة.', features: [ "✅ مشاهدة بدون إعلانات", "✅ وصول غير محدود لمكتبة الأنمي", "✅ جودة عالية HD", "✅ مشاهدة على أجهزة متعددة" ], plans: [ { duration: 'اشتراك معجب (شهري)', price: '1250 دج' }, { duration: 'اشتراك ميجا فان (شهري)', price: '1750 دج' } ], contactLink: 'https://t.me/astro_qp' },
        canva: { icon: 'fas fa-palette', iconColor: '#8d47fb', title: 'اشتراك Canva Pro', description: 'أطلق العنان لإبداعك مع وصول كامل لكل أدوات وميزات كانفا برو.', features: [ "✅ إزالة خلفية الصور بنقرة واحدة", "✅ آلاف القوالب والصور المدفوعة", "✅ تغيير حجم التصاميم بسهولة", "✅ تخزين سحابي كبير" ], plans: [ { duration: 'اشتراك لمدة 3 سنوات', price: '1000 دج' } ], contactLink: 'https://t.me/astro_qp' },
        shahid: { icon: 'fas fa-tv-alt', iconColor: '#00A89D', title: 'اشتراك شاهد VIP', description: 'أكبر مكتبة للمحتوى العربي، أعمال شاهد الأصلية، وبث مباشر للقنوات.', plans: [ { duration: 'باقة VIP', price: '1250 دج' }, { duration: 'باقة Big Time', price: '2500 دج' }, { duration: 'باقة VIP + رياضة', price: '2500 دج' }, { duration: 'باقة الشامل', price: '4000 دج' } ], contactLink: 'https://t.me/astro_qp' },
        discord: { icon: 'fab fa-discord', iconColor: '#5865F2', title: 'اشتراك ديسكورد نيترو', description: 'عزز تجربتك في ديسكورد وارفع مستوى حسابك بميزات فريدة.', features: [ "✅ استخدام الإيموجيات المخصصة في أي مكان", "✅ صور بروفيل متحركة وبانر", "✅ جودة بث أعلى (HD)", "✅ تعزيز 2 للخوادم (للباقة الكاملة)" ], plans: [ { duration: 'Nitro Basic (شهري)', price: '1000 دج' }, { duration: 'Nitro Full (شهري)', price: '2650 دج' } ], contactLink: 'https://t.me/astro_qp' }
    };

    // ================== Main Modal & Exclusive Offer Logic ==================
    const modalOverlay = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const serviceCards = document.querySelectorAll('.service-card-pro');
    const exclusiveOfferBtn = document.getElementById('exclusive-offer-btn');

    function openModal(serviceKey) {
        const service = servicesData[serviceKey];
        if (!service) return;
        let featuresHTML = '';
        if (service.features && service.features.length > 0) {
            featuresHTML = `<h4 class="modal-section-title">الميزات الأساسية</h4><div class="feature-list-pro">` + service.features.map(feature => `<div class="feature-item-pro">${feature}</div>`).join('') + `</div>`;
        }
        let plansHTML = '';
        if (service.plans && service.plans.length > 0) {
            const planTitle = service.features ? 'خطط الأسعار' : 'التفاصيل والأسعار';
            plansHTML = `<h4 class="modal-section-title">${planTitle}</h4><div class="price-plans-pro">` + service.plans.map((plan, index) => {
                const exclusiveClass = plan.isExclusive ? 'plan-exclusive' : '';
                return `<div class="price-plan-pro ${exclusiveClass} plan-c-${index + 1}">
                            <div class="plan-duration">${plan.duration}</div>
                            <strong>${plan.price}</strong>
                        </div>`;
            }).join('') + `</div>`;
        }
        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon" style="background-color: ${service.iconColor}; color: ${service.iconColor === '#FFFC00' ? '#111827' : 'white'};"><i class="${service.icon}"></i></div>
                <h2 class="modal-title">${service.title}</h2>
                <p class="modal-description">${service.description}</p>
            </div>
            <div class="modal-details-content">${featuresHTML}${plansHTML}</div>
            <div class="alert-pro">لا تتواصل معي الا اذا كنت متاكد انك رح تشتري!</div>
            <a href="${service.contactLink}" target="_blank" class="modal-cta-button"><i class="fab fa-telegram"></i> تواصل معنا للشراء</a>
        `;
        modalOverlay.classList.add('show-modal');
    }

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
            <a href="${service.contactLink}" target="_blank" class="modal-cta-button"><i class="fab fa-telegram"></i> تواصل معنا الآن</a>
        `;
        modalOverlay.classList.add('show-modal');
    }

    function closeModal() { modalOverlay.classList.remove('show-modal'); }
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.service));
    });
    exclusiveOfferBtn.addEventListener('click', openExclusiveOfferModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => { if (event.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modalOverlay.classList.contains('show-modal')) closeModal(); });

    // ================== Weekly Sales Logic (Original Timer) ==================
    const weeklySalesData = [
        { key: 'canva', newPrice: '750 دج' }, { key: 'card', newPrice: '1250 دج' },
        { key: 'netflix', newPrice: '500 دج' }, { key: 'spotify', newPrice: '600 دج' }
    ];
    const salesModalOverlay = document.getElementById('sales-modal');
    const salesModalBody = document.getElementById('sales-modal-body');
    const closeSalesModalBtn = document.getElementById('close-sales-modal');
    const salesOfferBtn = document.getElementById('sales-offer-btn');
    let countdownInterval;

    function startCountdown() {
        let saleEndDate = localStorage.getItem('saleEndDate');
        if (!saleEndDate || new Date().getTime() > saleEndDate) {
            const now = new Date();
            const endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            saleEndDate = endDate.getTime();
            localStorage.setItem('saleEndDate', saleEndDate);
        }
        if(countdownInterval) clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = saleEndDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const countdownContainer = document.getElementById('countdown');
            if(countdownContainer) {
                if (distance < 0) {
                    clearInterval(countdownInterval);
                    countdownContainer.innerHTML = "<h3 style='color: var(--alert-color);'>انتهى العرض!</h3>";
                    return;
                }
                document.getElementById('days').innerText = days;
                document.getElementById('hours').innerText = hours;
                document.getElementById('minutes').innerText = minutes;
                document.getElementById('seconds').innerText = seconds;
            }
        }, 1000);
    }

    function openSalesModal() {
        let salesHTML = '';
        weeklySalesData.forEach(sale => {
            const service = servicesData[sale.key];
            if (service) {
                const oldPrice = service.plans[0].price;
                salesHTML += `
                    <div class="sale-item">
                        <div class="card-icon" style="background-color:${service.iconColor}; color: ${service.iconColor === '#FFFC00' ? '#111827' : 'white'};">
                            <i class="${service.icon}"></i>
                        </div>
                        <h4>${service.title}</h4>
                        <div class="price-wrapper">
                            <span class="old-price">${oldPrice}</span>
                            <span class="new-price">${sale.newPrice}</span>
                        </div>
                    </div>
                `;
            }
        });
        salesModalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon" style="background: linear-gradient(45deg, #e53935, #ff7043);"><i class="fas fa-tags"></i></div>
                <h2 class="modal-title">تخفيضات هذا الأسبوع!</h2>
                <div id="countdown" class="countdown-timer">
                    <div class="time-block"><span id="days">0</span><small>أيام</small></div>
                    <div class="time-block"><span id="hours">0</span><small>ساعات</small></div>
                    <div class="time-block"><span id="minutes">0</span><small>دقائق</small></div>
                    <div class="time-block"><span id="seconds">0</span><small>ثواني</small></div>
                </div>
            </div>
            <div class="sales-grid">${salesHTML}</div>
            <a href="https://t.me/astro_qp" target="_blank" class="modal-cta-button"><i class="fab fa-telegram"></i> استفد من العرض الآن</a>
        `;
        salesModalOverlay.classList.add('show-modal');
        startCountdown();
    }

    function closeSalesModal() {
        salesModalOverlay.classList.remove('show-modal');
        if(countdownInterval) clearInterval(countdownInterval);
    }

    salesOfferBtn.addEventListener('click', openSalesModal);
    closeSalesModalBtn.addEventListener('click', closeSalesModal);
    salesModalOverlay.addEventListener('click', (event) => { if (event.target === salesModalOverlay) closeSalesModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && salesModalOverlay.classList.contains('show-modal')) closeSalesModal(); });
});