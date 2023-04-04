# angular-noup3n

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-noup3n)

 
Сделать, форму на Angular, так, чтобы

при открытии из формы отправлялся POST запрос {“action”: “params”}, который вернет JSON, содержащий данные о количестве запросов (count) и задержек (delay) между ними

по нажатии на кнопку Отправить нужно чтобы отправлялось необходимое количество (count) параллельных POST запросов с указанной задержкой (delay) между ними. Формат запроса {“action”: “process”}

вывести в список в этой форме время отправки запроса на бэк и ответы от backend - каждый запрос-ответ, отдельная строка. Нужно учесть, что порядок ответов может не совпадать с порядком запросов



Запускать backend 

java -jar ServerTest.jar <parameters>


parameters:

-h help

-p port

-c count

-d delay ms

-t timeout ms


Например:

java -jar ServerTest.jar -p 4521 -c 10 -d 1000
