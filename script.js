// DOM элементы
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.querySelector('.close-modal');
const galleryItems = document.querySelectorAll('.gallery-item');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-links a');

// Плавная прокрутка для навигации
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Открытие модального окна с изображением
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modalTitle.textContent = imgAlt;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    });
});

// Закрытие модального окна
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
});

// Закрытие модального окна при клике вне изображения
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Закрытие модального окна клавишей ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Обработка формы обратной связи
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Валидация
    if (!formData.name || !formData.email || !formData.message) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Пожалуйста, введите корректный email адрес!');
        return;
    }
    
    // В реальном приложении здесь был бы AJAX запрос на сервер
    console.log('Данные формы:', formData);
    
    // Показываем сообщение об успехе
    alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
    
    // Очищаем форму
    contactForm.reset();
    
    // Анимация успешной отправки
    const submitBtn = this.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправлено!';
    submitBtn.style.background = '#27ae60';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 2000);
});

// Подсветка активного пункта меню при прокрутке
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    
    // Убираем активный класс у всех ссылок
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Проверяем, какая секция сейчас в области видимости
        const sectionId = link.getAttribute('href');
        if (sectionId.startsWith('#')) {
            const section = document.querySelector(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && 
                    scrollPosition < sectionTop + sectionHeight) {
                    link.classList.add('active');
                }
            }
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами, которые должны появляться при прокрутке
const animatedElements = document.querySelectorAll('.hobby-card, .info-item, .gallery-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Инициализация текущего года в футере
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Случайные изображения для галереи (можно заменить на свои)
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        alt: 'Портретная фотография'
    },
    {
        src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        alt: 'Путешествие в горы'
    },
    {
        src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        alt: 'Чтение книги'
    },
    {
        src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        alt: 'Музыка'
    },
    {
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        alt: 'Кофе с друзьями'
    },
    {
        src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        alt: 'Работа за ноутбуком'
    }
];

// Заполняем галерею изображениями
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid && galleryGrid.children.length === 0) {
    galleryImages.forEach((img, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${img.alt}</h4>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
        
        // Добавляем обработчик клика для новых элементов
        galleryItem.addEventListener('click', function() {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalTitle.textContent = img.alt;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Таймер для демонстрации активности
function updateActivityTimer() {
    const startTime = new Date('2024-01-01').getTime();
    const now = new Date().getTime();
    const daysActive = Math.floor((now - startTime) / (1000 * 60 * 60 * 24));
    
    const activityElement = document.getElementById('activityTimer');
    if (activityElement) {
        activityElement.textContent = `Активна уже ${daysActive} дней!`;
    }
}

// Вызываем функцию при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    updateActivityTimer();
    
    // Инициализация анимации при загрузке
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 300);
});

// Добавляем стили для начальной анимации
const style = document.createElement('style');
style.textContent = `
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
`;
document.head.appendChild(style);