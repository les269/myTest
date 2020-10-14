import { MessageType } from './messageType';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})

// https://matthung0807.blogspot.com/2019/04/spring-boot-websocket_27.html
export class MessengerComponent implements OnInit {
  subscription: Subscription = null;
  userId = '';
  message = '';
  messageArray: MessageType[] = [];
  joinFlag = false;
  @ViewChild('messageContent', null) messageContent: ElementRef;
  constructor(@Inject('stompService') private stomp: StompService) {
    this.stomp.configure({ // 配置要连接的服务器地址
      host: 'http://localhost:8080/ws', // 监听的地址
      queue: { init: false },
      debug: true
    });
  }

  ngOnInit() {
    this.stomp.startConnect();
  }
  join() {
    if (!this.userId) {
      alert('請入名稱');
      return;
    }
    const me = this;

    this.stomp.subscribe('/topic/public', (res) => {
      me.onMessageReceived(res);
    });
    this.stomp.send('/app/join', {
      type: 'JOIN',
      sender: this.userId
    }, {});
  }
  onMessageReceived(payload: MessageType) {
    this.messageArray.push(payload);
    if (payload.type === 'JOIN') {
      this.joinFlag = true;
    } else if (payload.type === 'LEAVE') {

    } else {

      setTimeout(() => {
        this.messageContent.nativeElement.scrollTo(0, this.messageContent.nativeElement.scrollHeight);
      }, 0);
    }
  }
  /**
   * 發送訊息
   * @param event 發送訊息事件
   */
  sendMessage() {
    const messageContent = this.message.trim();
    if (messageContent && this.stomp) {
      const chatMessage = {
        sender: this.userId,
        content: messageContent,
        type: 'CHAT'
      };
      // 發送訊息至/app/chat，也就是送到ChatController.sendMessage()
      this.stomp.send('/app/chat', chatMessage, {});
      this.message = '';
    }
  }

}
