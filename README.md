# english-less

Установить и запустить MongoDB Community следуя инструкции на сайте :
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

// По умолчанию сервер базы данных доступен по " mongodb://localhost:27017/ "

============ NEXT >

// Установка nodejs и пакетный менеджер npm .
sudo apt install nodejs
sudo apt install npm

// NEXT >

cd english-server
npm install 

// Включаем сайт.

npm start

// По умолчанию работает на порту 3000 , 
// изменить порт: bin/www "строка 15" .
// Что бы сайт работал после выхода из консоли .
sudo npm install forever -g
forever start bin/www
// подробнее об утелите forever : https://github.com/foreversd/forever
