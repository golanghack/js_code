<script>

let funcDomReady = '';

function onDomReady(func) { // функция добавления события
        let oldOnload = funcDomReady;
        if (typeof funcDomReady != 'function')
                funcDomReady = func;
        else {
                funcDomReady = function() {
                        oldOnload();
                        func();
                }
            }

// добавляем функцию, которую нужно вызвать после загрузки DOM
onDomReady(alert("DOM загружен! Обработчик 1"));
onDomReady(alert("DOM загружен! Обработчик 2"));

function init() {
    // выходим, если функция уже выполнялась
    if (arguments.callee.done) return;

    // устанавливаем флаг, чтобы функция не исполнялась дважды
    arguments.callee.done = true;

    if(funcDomReady)funcDomReady();
};

/* для Mozilla/Firefox */
if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", init, false);

/* для Safari */
if (/WebKit/i.test(navigator.userAgent)) { // условие для Safari
    let _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
        clearInterval(_timer);
        init(); // вызываем обработчик для onload
    }
    }, 10);
}

/* для остальных браузеров */
window.onload = init;

</script>