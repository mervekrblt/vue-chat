<template>

<div>

    <!--Log in form-->
    <!--Show this form until user login-->
    <div>
      <form v-if="!login" @submit.prevent="logIn">
          <input type="text" v-model="name">
          <button>Log in chat</button>
      </form>
  </div>

    <!--Show chat when user login-->
    <div v-if="login">
        <ul v-for="user in users" :key="user.id">
            <li> {{ user.name }}</li>
        </ul>

        <!--Write message and send-->
        <section>
            <input type="text" v-model="message">
            <button @click="sendMessage">Send Message</button>
        </section>

        <!--Display Messages-->
        <div class="messages" v-for="message in messages" :key="message.id">
            <h3>{{ message.user.toUpperCase() }}:</h3> 
            <h4>{{ message.message }}</h4> 
        </div>
    </div>

    
</div>
  

</template>

<script>
export default {
    data() {
        return {
            users: [],
            login: false,
            name: '',
            message: '',
            messages: []
        }
    },

    sockets: {
        users(data) {
            this.users = data
        },

        messages(data) {
            this.messages = data
        }
    },

    methods: {
        logIn() {
            this.login = true
            this.$socket.emit('new_user', this.name)
        },

        sendMessage() {
            this.$socket.emit('new_message', {
                name: this.name,
                message: this.message
            })
            this.message = ""
        }
    }
}
</script>

<style scoped>

.messages {
    display: flex;
}
h3 {
    margin-right: 2vh;
}
</style>