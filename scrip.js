document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы заказа
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Скрываем модальное окно заказа
            const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
            orderModal.hide();
            
            // Показываем модальное окно "Спасибо"
            const thanksModal = new bootstrap.Modal(document.getElementById('thanksModal'));
            thanksModal.show();
            
            // Очищаем форму
            this.reset();
        });
    }
    
    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            this.value = !x[2] ? x[1] : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Закрытие модального окна "Спасибо" через 3 секунды
    const thanksModal = document.getElementById('thanksModal');
    if (thanksModal) {
        thanksModal.addEventListener('shown.bs.modal', function() {
            setTimeout(function() {
                const modal = bootstrap.Modal.getInstance(thanksModal);
                modal.hide();
            }, 3000);
        });
    }
    
    // Анимация при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.model-img, .content-block, .highlight-block');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    window.addEventListener('scroll', animateOnScroll);
    
    // Применяем стили для анимации
    const animatedElements = document.querySelectorAll('.model-img, .content-block, .highlight-block');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запускаем анимацию при загрузке
    animateOnScroll();
});