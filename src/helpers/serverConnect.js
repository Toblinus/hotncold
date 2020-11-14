export default (new (function(){
    /**
     * Соединение с сервером
     */
    this.connect = function(){
        this.ws = new WebSocket('ws:localhost'); 
        const ws = this.ws;


        this.onconnect = () => console.log("подключение успешно");
        this.onclose = (a) => console.log("соединение закрыто " + (a ? 'чисто' : 'по ошибке'));
        this.onmsg = (data) => console.log(data);
        this.onerror = (er) => console.log(er);
        
        ws.onopen = this.onconnect;
        ws.onclose = (event) => {
            if(typeof this.onclose === "function"){
                this.onclose(event.wasClean);
            }
        }
        ws.onmessage = (event) => {
            if(typeof this.onclose === "function"){
                this.onclose(event.data);
            }
        }
        ws.onerror = (event) => {
            if(typeof this.onclose === "function"){
                this.onerror(event?.message);
            }
        };
    }

    /**
     * Отправка сообщения
     */
    this.sendMsg = function(){

    }

    /**
     * Отправка эмодзи
     */
    this.sendEmoje = function(){

    }

    /**
     * Разрыв соединение с сервером
     */
    this.abort = () => {
        this.ws.close();
    }
})());