import { throwStatement } from "@babel/types";

export default (function(url){
    this.ws = new WebSocket(url); 
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
                let data = event.data;
                try {
                    data = JSON.parse(data);
                } catch {}
                this.onmsg(data);
            }
        }
        ws.onerror = (event) => {
            if(typeof this.onclose === "function"){
                this.onerror(event?.message);
            }
        };

    /**
     * Отправка сообщения
     */
    this.sendMsg = (nick, room, msg) => {
        this.directSend('msg', [nick, room, msg]);
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

    this.createRoom = () => {
        this.directSend('createRoom')
    }

    this.joinRoom = (nick, room) => {
        this.directSend('joinToRoom', [nick, room]);
    }

    this.directSend = (type, data = []) => {
        this.ws.send(JSON.stringify({
            type,
            args: data
        }))
    }
});