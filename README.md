# blog-project

Персональный блог.

Для работы проекта на локальной машине в системе должны быть установлены Node.JS и MySQL.

Развертывание проекта:
1. Клонировать репозиторий git clone https://github.com/Leshii2902/blog-project.
2. Создать базу данных blog-project.
3. Импортировать содержимое базы данных из файла dump_file_utf8.sql.
4. Перейти в папку проекта.
5. В файле db.js ввести логин, пароль и имя базы данных для подключения приложения
6. Установить используемые npm-модули командой npm i.
7. Для запуска проекта сначала следует запустить сервер базы данных а затем в папке проекта выполнить команду node index.
8. Сборку front-end можно произвести командой npm run prod.

Структура проекта:
- models - модели таблиц базы данных
- requests - запросы к базе данных с помощью моделей из папки models
- public - frontend-приложение, собранное с помощью webpack
- routes - обработчики запросов клиента
+ src - исходные файлы frontend-приложения
   + app - js-файлы React-приложения
      - actions - экшены редюсеров, содержащие запросы к серверу
      + components - react-компоненты 
        - Header - компоненты заголовка
        + Content - компоненты основного контента
          - forms - компоненты форм
        - Footer - компоненты футера
      - componentsFunctions - функции, используемые в разных компонентах контента   
      - constants - константы редюсеров
      - layouts - слои React-приложения
      - pages - основные страницы React-приложения
      - reducers - редюсеры React-приложения
      - reducersFunctions - функции, используемые в разных редюсерах
      - store.js - состояние redux React-приложения
   - backgrounds - фоны страниц 
   - fonts - шпифты
   + img - изображения основного содержимого приложения
     - avatars - аватары пользователей
   - styles - стили в формате sass
   - app.jsx - входнрй файл React
   - входной файл frontend-прилолжения
- db.js - подключение к базе данных
- dump_file_utf8.sql - дамп базы данных
- index.js - входная точка node.js-приложения
- package.json - конфигурация npm
- webpack.config.js - конфигурация webpack

Приложене также доступно по адресу: http://personal-blog.ru.
