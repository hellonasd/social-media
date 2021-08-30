<template>
  <div>
    <app-top-bar></app-top-bar>
    <div class="messenger">
      <div class="messenger__menu">
        <div class="messenger__menu-wrapper">
          <input
            class="messenger__menu-input"
            type="text"
            placeholder="Поиск друзей"
          />

          <app-conversation
            :user="user"
            :conversation="conversation"
            v-for="conversation in conversations"
            :key="conversation._id"
            @click="currentChat = conversation"
          ></app-conversation>
        </div>
      </div>
      <div class="messenger__box">
        <div class="messenger__box-wrapper" v-if="currentChat">
          <div class="messenger__box-top">
            <div ref="x">
              <app-message
                :message="message"
                v-for="message in messages"
                :key="message._id"
                ref="x"
                :own="own(message)"
              ></app-message>
            </div>
          </div>
          <div class="messenger__box-bottom">
            <textarea
              class="messenger__box-input"
              placeholder="Сообщение"
              v-model="newMessage"
            ></textarea>
            <button class="messenger__box-submit" @click="handleSubmit">
              Отправить
            </button>
          </div>
        </div>
        <span class="no-conversation" v-else>Откройте диалог</span>
      </div>
      <div class="messenger__online">
        <div class="messenger__online-wrapper">
          <app-chat-online
            v-if="users.length !== 0"
            :users="users"
            :currentId="user.id"
            :currentChat="currentChat"
            @currentChats='currentChats'
          ></app-chat-online>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appTopBar from "@/components/app-top-bar";
import appConversation from "@/components/app-conversation";
import appMessage from "@/components/app-message";
import appChatOnline from "@/components/app-chat-online";
import axios from "axios";
import { io } from "socket.io-client";
export default {
  components: { appTopBar, appConversation, appMessage, appChatOnline },
  data() {
    return {
      conversations: [],
      user: this.$store.state.users,
      currentChat: null,
      messages: [],
      newMessage: "",
      socket: io("ws://localhost:8800"),
      arrivalMessage: null,
      users: [],
    };
  },
  async created() {
    await this.getConversation();
    await this.getMessages();
    this.socket.emit("addUser", this.user.id);
    this.socket.on("getUsers", (users) => {
      this.users = this.user.followings.filter((f) => {
        return users.some((u) => {
          console.log('u', u)
          return u.userId === f
        })
      }
      );
    });
    this.socket.on("getMessage", (data) => {
      this.arrivalMessage = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };
    });
  },
  methods: {
    async getConversation() {
      try {
        const res = await axios.get(
          "/conversations/" + this.$store.state.users.id
        );
        this.conversations = res.data;
      } catch (e) {
        console.log("e", e);
      }
    },
    async handleSubmit() {
      const message = {
        sender: this.user.id,
        text: this.newMessage,
        conversationId: this.currentChat._id,
      };
      const receivedId = this.currentChat.members.find(
        (member) => member !== this.user.id
      );
      this.socket.emit("sendMessage", {
        senderId: this.user.id,
        receivedId,
        text: this.newMessage,
      });
      try {
        const res = await axios.post("/messages", message);
        this.messages.push(res.data);
        this.newMessage = "";
      } catch (error) {
        console.log(e);
      }
    },
    own(m) {
      return m.sender === this.user.id;
    },
    async getMessages(currentChat) {
      
      try {
        const res = await axios.get("/messages/" + currentChat);
        this.messages = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async currentChats(chat){
      await this.getConversation();
    }
  },
  watch: {
    async currentChat(val) {
      await this.getMessages(val._id);
    },
    messages: {
      handler() {
        this.$nextTick(() =>
          this.$refs.x?.scrollIntoView({ behavior: "smooth", block: "end" })
        );
      },
      deep: true,
    },

    arrivalMessage(newMessage) {
      this.arrivalMessage &&
        this.currentChat.members.includes(this.arrivalMessage.sender) &&
        this.messages.push(newMessage);
    },
  },
};
</script>

<style lang='scss' scoped>
.messenger {
  height: calc(100vh - 70px);
  display: flex;
  &__menu {
    flex: 3.5;
  }
  &__box {
    flex: 5.5;
    position: relative;
  }
  &__online {
    flex: 3;
  }
  &__box-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__box-top {
    height: 100%;
    overflow-y: scroll;
    padding-right: 10px;
  }
  &__menu-wrapper,
  &__box-wrapper,
  &__online-wrapper {
    padding: 10px;
    height: 100%;
  }
  &__menu-input {
    padding: 10px 0;
    width: 90%;
    border: none;
    border-bottom: 1px solid gray;
  }
  &__box-bottom {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__box-input {
    width: 80%;
    height: 90px;
    padding: 10px;
  }
  &__box-submit {
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
  }
}
.no-conversation {
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(190, 189, 189);
  text-align: center;
  cursor: default;
}
</style>